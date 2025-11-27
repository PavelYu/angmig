#!/usr/bin/env node

import { E2ETestMigratorAgent } from './E2ETestMigratorAgent.js';

const agent = new E2ETestMigratorAgent();
agent.initialize().catch((error) => {
  console.error('Failed to start E2E Test Migrator agent:', error);
  process.exit(1);
});

