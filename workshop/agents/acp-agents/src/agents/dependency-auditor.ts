#!/usr/bin/env node

import { DependencyAuditorAgent } from './DependencyAuditorAgent.js';

const agent = new DependencyAuditorAgent();
agent.initialize().catch((error) => {
  console.error('Failed to start Dependency Auditor agent:', error);
  process.exit(1);
});

