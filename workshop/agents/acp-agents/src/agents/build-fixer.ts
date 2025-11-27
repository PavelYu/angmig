#!/usr/bin/env node

import { BuildFixerAgent } from './BuildFixerAgent.js';

const agent = new BuildFixerAgent();
agent.initialize().catch((error) => {
  console.error('Failed to start Build Fixer agent:', error);
  process.exit(1);
});

