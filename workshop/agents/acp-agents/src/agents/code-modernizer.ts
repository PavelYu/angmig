#!/usr/bin/env node

import { CodeModernizerAgent } from './CodeModernizerAgent.js';

const agent = new CodeModernizerAgent();
agent.initialize().catch((error) => {
  console.error('Failed to start Code Modernizer agent:', error);
  process.exit(1);
});

