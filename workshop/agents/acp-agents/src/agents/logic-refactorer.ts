#!/usr/bin/env node

import { LogicRefactorerAgent } from './LogicRefactorerAgent.js';

const agent = new LogicRefactorerAgent();
agent.initialize().catch((error) => {
  console.error('Failed to start Logic Refactorer agent:', error);
  process.exit(1);
});

