#!/usr/bin/env node

import { ArchitectureReviewerAgent } from './ArchitectureReviewerAgent.js';

const agent = new ArchitectureReviewerAgent();
agent.initialize().catch((error) => {
  console.error('Failed to start Architecture Reviewer agent:', error);
  process.exit(1);
});

