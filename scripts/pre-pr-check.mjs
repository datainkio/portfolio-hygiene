#!/usr/bin/env node

import path from 'node:path';
import { spawnSync } from 'node:child_process';

function parseArgs(argv) {
	const args = {
		maxAgeDays: 14,
		strictSidecar: false,
		includeGitDirty: true,
		json: false,
		help: false,
	};

	for (let i = 0; i < argv.length; i += 1) {
		const token = argv[i];
		if (token === '--maxAgeDays') {
			const parsed = Number(argv[i + 1]);
			if (Number.isFinite(parsed)) args.maxAgeDays = parsed;
			i += 1;
			continue;
		}
		if (token === '--strict-sidecar') {
			args.strictSidecar = true;
			continue;
		}
		if (token === '--no-include-git-dirty') {
			args.includeGitDirty = false;
			continue;
		}
		if (token === '--json') {
			args.json = true;
			continue;
		}
		if (token === '--help' || token === '-h') {
			args.help = true;
			continue;
		}
	}

	return args;
}

function printHelp() {
	process.stdout.write(`\
Usage:
  node scripts/pre-pr-check.mjs [options]

Options:
  --maxAgeDays <n>        Freshness/goals threshold (default: 14)
  --strict-sidecar        Require context/.freshness.json baseline (no Last updated fallback)
  --no-include-git-dirty  Do not treat git dirty as a recommendation signal
  --json                  Emit JSON summary
  -h, --help              Show help

What it does:
  1) Check Current Goals (CI mode)
  2) Check Context Freshness (CI mode)
	3) Check AIX docs markdown links (local-only)

Exit codes:
  0 = all checks OK
  1 = one or more checks recommend updates
`);
}

function runNodeScript({ scriptRel, args }) {
	const nodeArgs = [scriptRel, ...args];
	const result = spawnSync(process.execPath, nodeArgs, {
		cwd: process.cwd(),
		encoding: 'utf8',
	});

	return {
		scriptRel,
		status: result.status ?? 1,
		stdout: (result.stdout || '').trimEnd(),
		stderr: (result.stderr || '').trimEnd(),
	};
}

function summarizeResults(results) {
	const failed = results.filter((r) => r.status !== 0);
	return {
		ok: failed.length === 0,
		failed: failed.map((r) => ({ script: r.scriptRel, status: r.status })),
	};
}

function printHuman(results, summary) {
	if (summary.ok) {
		process.stdout.write('Pre-PR Check: OK (no updates recommended)\n');
		return;
	}

	process.stdout.write('Pre-PR Check: UPDATE RECOMMENDED\n');
	process.stdout.write('Fix the items below, then re-run this task.\n\n');

	for (const r of results) {
		if (r.status === 0) continue;
		process.stdout.write(`--- ${r.scriptRel} (exit ${r.status}) ---\n`);
		if (r.stdout) process.stdout.write(r.stdout + '\n');
		if (r.stderr) process.stdout.write(r.stderr + '\n');
		process.stdout.write('\n');
	}
}

async function main() {
	const args = parseArgs(process.argv.slice(2));
	if (args.help) {
		printHelp();
		process.exit(0);
	}

	const includeGitDirtyArgs = args.includeGitDirty ? ['--include-git-dirty'] : [];
	const strictSidecarArgs = args.strictSidecar ? ['--require-sidecar'] : [];

	const results = [
		runNodeScript({
			scriptRel: path.join('scripts', 'current-goals-check.mjs'),
			args: ['--fail-on-update', '--maxAgeDays', String(args.maxAgeDays), ...includeGitDirtyArgs],
		}),
		runNodeScript({
			scriptRel: path.join('scripts', 'context-freshness-check.mjs'),
			args: [
				'--fail-on-update',
				'--maxAgeDays',
				String(args.maxAgeDays),
				...includeGitDirtyArgs,
				...strictSidecarArgs,
			],
		}),
		runNodeScript({
			scriptRel: path.join('scripts', 'markdown-link-check-local.mjs'),
			args: ['--root', 'docs', '--max', '50'],
		}),
	];

	const summary = summarizeResults(results);

	if (args.json) {
		process.stdout.write(
			JSON.stringify(
				{
					ok: summary.ok,
					checks: results.map((r) => ({
						script: r.scriptRel,
						exitCode: r.status,
						stdout: r.stdout,
						stderr: r.stderr,
					})),
				},
				null,
				2
			) + '\n'
		);
		process.exit(summary.ok ? 0 : 1);
	}

	printHuman(results, summary);
	process.exit(summary.ok ? 0 : 1);
}

main().catch((err) => {
	process.stderr.write(String(err?.stack || err) + '\n');
	process.exit(1);
});
