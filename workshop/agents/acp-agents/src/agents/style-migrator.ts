#!/usr/bin/env node

import { StyleMigratorAgent } from './StyleMigratorAgent.js';

const agent = new StyleMigratorAgent();
agent.initialize().catch((error) => {
  console.error('Failed to start Style Migrator agent:', error);
  process.exit(1);
});

