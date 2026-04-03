#!/usr/bin/env node
// pipeline-daily.mjs — Master orchestrator
// Usage: node scripts/pipeline-daily.mjs [--dry-run]
// Runs: demo build → send emails → followups
// Each step is idempotent — safe to re-run

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = import.meta.dirname || import.meta.url.split("/").slice(0, -1).join("/");
const ROOT = path.join(__dirname, "..");
const STATE_FILE = path.join(ROOT, "data", ".pipeline-state.json");

const dryRun = process.argv.includes("--dry-run");

function readState() {
  const today = new Date().toISOString().split("T")[0];
  try {
    const raw = fs.readFileSync(STATE_FILE, "utf-8");
    const state = JSON.parse(raw);
    if (state.date !== today) return { date: today, steps: {} };
    return state;
  } catch { return { date: today, steps: {} }; }
}

function writeState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function runScript(name) {
  const cmd = `node scripts/${name} ${dryRun ? "--dry-run" : ""}`;
  console.log(`\n${"─".repeat(50)}`);
  console.log(`▶ ${name}`);
  console.log(`${"─".repeat(50)}`);
  try {
    execSync(cmd, { cwd: ROOT, stdio: "inherit" });
  } catch (e) {
    console.error(`Script ${name} failed:`, e.message);
    throw e;
  }
}

async function main() {
  console.log(`${dryRun ? "[DRY RUN] " : ""}Pipeline Daily — ${new Date().toISOString().split("T")[0]}`);

  const state = readState();

  if (!state.steps.demos) {
    runScript("build-demos.mjs");
    state.steps.demos = "done";
    writeState(state);
  } else { console.log("SKIPPING: demos already done today"); }

  if (!state.steps.emails) {
    runScript("send-initial-emails.mjs");
    state.steps.emails = "done";
    writeState(state);
  } else { console.log("SKIPPING: emails already sent today"); }

  if (!state.steps.followups) {
    runScript("auto-followups.mjs");
    state.steps.followups = "done";
    writeState(state);
  } else { console.log("SKIPPING: followups already checked today"); }

  console.log("\nPipeline complete ✓");
}

main().catch(() => process.exit(1));
