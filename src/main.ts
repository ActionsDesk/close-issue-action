import * as core from "@actions/core";
import * as github from "@actions/github";
import { WebhookPayload } from "@actions/github/lib/interfaces";

async function run(): Promise<void> {
  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
    if (GITHUB_TOKEN) {
      const octokit: github.GitHub = new github.GitHub(GITHUB_TOKEN);
      const payload: WebhookPayload = github.context.payload;
      const issueNumber: number = payload.issue.number;
      const owner: string = payload.repository.owner.login;
      const repo: string = payload.repository.name;

      await octokit.issues.update({
        owner,
        repo,
        issue_number: issueNumber,
        state: "closed"
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

if (!module.parent) {
  run();
}

export { run };
