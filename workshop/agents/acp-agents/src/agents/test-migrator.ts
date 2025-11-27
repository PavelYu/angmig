#!/usr/bin/env node

import { TestMigratorAgent } from './TestMigratorAgent.js';

const agent = new TestMigratorAgent();
agent.initialize().catch((error) => {
  console.error('Failed to start Test Migrator agent:', error);
  process.exit(1);
});

