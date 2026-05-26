# Validating Concierge AIX

Specs: [domain-agent-probes.spec.md](../../specs/ai/domain-agent-probes.spec.md) · [calibrator-spec.md](../../specs/ai/calibrator-spec.md)
- [ ] Open Copilot Chat and confirm only Concierge appears
- [ ] Run the probe bank in `docs/maintenance/aix-probe-bank.md` (or a consistent 10-prompt subset) and score:
  - first-pass success rate
  - number of follow-up questions
  - consistency of formatting
  - correctness of file/path guidance
- [ ] If errors cluster, strengthen module triggers and templates