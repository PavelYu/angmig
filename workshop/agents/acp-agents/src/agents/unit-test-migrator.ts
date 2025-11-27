#!/usr/bin/env node

import { UnitTestMigratorAgent } from './UnitTestMigratorAgent.js';

const agent = new UnitTestMigratorAgent();
agent.initialize().catch((error) => {
  console.error('Failed to start Unit Test Migrator agent:', error);
  process.exit(1);
});

