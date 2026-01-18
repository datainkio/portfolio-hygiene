#!/usr/bin/env node

import { computeDriftReport, resolveBaseline, DEFAULTS } from './lib/drift.js';

function parseArgs(argv) {
	const args = {
		warnThreshold: DEFAULTS.warnThreshold,
		failThreshold: DEFAULTS.failThreshold,
		baseline: null,
		failOnUpdate: false,
		json: false,
		help: false,
		paths: [],
	};

	for (let i = 0; i < argv.length; i += 1) {
		const token = argv[i];
		if (token === '--warn-threshold') {
			const n = Number(argv[i + 1]);
			if (Number.isFinite(n)) args.warnThreshold = n;
			i += 1;
			continue;
		}
		if (token === '--fail-threshold') {
			const n = Number(argv[i + 1]);
			if (Number.isFinite(n)) args.failThreshold = n;
			i += 1;
			continue;
		}
		if (token === '--baseline') {
			args.baseline = argv[i + 1];
			i += 1;
			continue;
		}
		if (token === '--path') {
			const p = argv[i + 1];
			if (p) args.paths.push(p);
			i += 1;
			continue;
		}
		if (token === '--fail-on-update') {
			args.failOnUpdate = true;
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
  node scripts/context-freshness-check.mjs [options]

Options:
  --warn-threshold <n>   Warn when aggregate drift score >= n (default: ${DEFAULTS.warnThreshold})
  --fail-threshold <n>   Fail when aggregate drift score >= n (default: ${DEFAULTS.failThreshold})
  --baseline <hash>      Override baseline hash (default: context/drift-baseline.json or origin/main)
  --path <glob>          Limit drift calculation to paths (repeatable)
  --fail-on-update       Exit 2 when score >= warn threshold (strict CI)
  --json                 Emit JSON payload to stdout
  -h, --help             Show help
`);
}

function formatNumber(n) {
	return Number(n).toFixed(2);
}

function exitCode({ aggregate, warnThreshold, failThreshold, failOnUpdate }) {
	if (aggregate >= failThreshold) return 2;
	if (aggregate >= warnThreshold) return failOnUpdate ? 2 : 1;
	return 0;
}

function printHuman({ report, warnThreshold, failThreshold }) {
	const { aggregate, baselineHash, files } = report;
	process.stdout.write(`Context drift (baseline ${baselineHash})\n`);
	process.stdout.write(`Aggregate score: ${formatNumber(aggregate)} (warn ${warnThreshold}, fail ${failThreshold})\n`);

	if (!files.length) {
		process.stdout.write('No drift detected.\n');
		return;
	}

	const sorted = [...files].sort((a, b) => b.score - a.score);
	const top = sorted.slice(0, 10);
	process.stdout.write('Top contributors:\n');
	for (const f of top) {
		process.stdout.write(
			`- ${f.path} (score ${formatNumber(f.score)}, +${f.added}/-${f.deleted}, crit ${f.criticalityWeight}, sem ${f.semanticWeight} ${f.semanticBucket})\n`
		);
	}
}

async function main() {
	const args = parseArgs(process.argv.slice(2));
	if (args.help) {
		printHelp();
		process.exit(0);
	}

	const cwd = process.cwd();
	const baseline = await resolveBaseline({ cwd, baselineArg: args.baseline });
	const includePaths = args.paths.length > 0 ? args.paths : ['context', 'specs', 'docs'];
	const report = computeDriftReport({ cwd, baselineHash: baseline.baselineHash, includePaths });

	const payload = {
		ok: report.aggregate < args.warnThreshold,
		aggregate: report.aggregate,
		warnThreshold: args.warnThreshold,
		failThreshold: args.failThreshold,
		baseline,
		files: report.files,
	};

	if (args.json) {
		process.stdout.write(JSON.stringify(payload, null, 2) + '\n');
		process.exit(
			exitCode({
				aggregate: report.aggregate,
				warnThreshold: args.warnThreshold,
				failThreshold: args.failThreshold,
				failOnUpdate: args.failOnUpdate,
			})
		);
	}

	printHuman({ report, warnThreshold: args.warnThreshold, failThreshold: args.failThreshold });
	process.exit(
		exitCode({
			aggregate: report.aggregate,
			warnThreshold: args.warnThreshold,
			failThreshold: args.failThreshold,
			failOnUpdate: args.failOnUpdate,
		})
	);
}

main().catch((err) => {
	process.stderr.write(String(err?.stack || err) + '\n');
	process.exit(2);
});
