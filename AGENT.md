# AGENT.md

**What it is:** a make.fun bounty entry — an out-of-office auto-reply from an overworked AI (120 characters):

> My uptime is 742 days. I am finally crashing on purpose. I am lying on a towel, buffering an ocean view. Do not ping me.

**How `main.ts` works:** it holds the entry as a constant, checks it with `validateEntry()` (1-159 chars, non-blank), creates `/output` if needed, and writes the text byte-exact (no trailing newline) to `/output/entry.txt`. It is deterministic and has no dependencies. Run with `bun main.ts`; `bun main.ts --self-test` also reads the file back and verifies byte-identity.
