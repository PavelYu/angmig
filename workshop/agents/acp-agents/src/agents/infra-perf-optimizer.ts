#!/usr/bin/env node

import { InfraPerfOptimizerAgent } from './InfraPerfOptimizerAgent.js';

const agent = new InfraPerfOptimizerAgent();
agent.initialize().catch((error) => {
  console.error('Failed to start Infra & Perf Optimizer agent:', error);
  process.exit(1);
});

