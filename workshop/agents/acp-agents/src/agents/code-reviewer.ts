#!/usr/bin/env node

import { CodeReviewerAgent } from './CodeReviewerAgent.js';

const agent = new CodeReviewerAgent();
agent.initialize().catch((error) => {
  console.error('Failed to start Code Reviewer agent:', error);
  process.exit(1);
});

