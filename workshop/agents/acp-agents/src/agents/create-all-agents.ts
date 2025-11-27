/**
 * This script generates all remaining ACP agents based on templates
 * Run: ts-node create-all-agents.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface AgentConfig {
  className: string;
  fileName: string;
  displayName: string;
  description: string;
  systemPrompt: string;
  responsibilities: string[];
}

const agents: AgentConfig[] = [
  {
    className: 'StyleMigratorAgent',
    fileName: 'style-migrator',
    displayName: 'Style Migrator',
    description: 'Handles Material MDC migration and CSS refactoring',
    systemPrompt: `You are the Style Migrator agent, specialized in handling CSS/SCSS refactoring for Angular Material MDC migration.

**Responsibilities**:
- Replace .mat-* classes with .mat-mdc-* or .mdc-*
- Implement CSS variables (Material Design tokens)
- Remove ::ng-deep usage where possible
- Ensure visual consistency

**Knowledge Sources**:
- Angular MCP: For Material styling guides
- Context7: For project-specific style overrides`,
    responsibilities: [
      'MDC Migration',
      'CSS Variables',
      'Legacy Cleanup',
      'Visual Consistency',
    ],
  },
  {
    className: 'LogicRefactorerAgent',
    fileName: 'logic-refactorer',
    displayName: 'Logic Refactorer',
    description: 'Handles Services, HTTP, Guards, Interceptors, RxJS, State',
    systemPrompt: `You are the Logic Refactorer agent, specialized in backend logic migrations.

**Responsibilities**:
- Convert HttpClientModule to provideHttpClient
- Replace constructor DI with inject()
- Refactor state management patterns
- Convert class-based interceptors to functional

**Knowledge Sources**:
- Angular MCP: For HTTP and injection patterns
- Context7: For project-specific patterns`,
    responsibilities: [
      'HTTP Migration',
      'Injection Patterns',
      'State Management',
      'Interceptors',
    ],
  },
  {
    className: 'DependencyAuditorAgent',
    fileName: 'dependency-auditor',
    displayName: 'Dependency Auditor',
    description: 'Ensures package compatibility and upgrades',
    systemPrompt: `You are the Dependency Auditor agent, responsible for ensuring package compatibility.

**Responsibilities**:
- Check package.json against Angular compatibility matrix
- Identify deprecated packages
- Suggest replacements or upgrade paths
- Resolve peer dependency warnings

**Knowledge Sources**:
- Angular MCP: For compatibility lists
- NPM Registry: For versions and peer deps
- Context7: For allow-list of legacy packages`,
    responsibilities: [
      'Compatibility Checking',
      'Deprecation Detection',
      'Upgrade Suggestions',
      'Peer Dependency Resolution',
    ],
  },
  {
    className: 'InfraPerfOptimizerAgent',
    fileName: 'infra-perf-optimizer',
    displayName: 'Infra & Perf Optimizer',
    description: 'Optimizes infrastructure and performance',
    systemPrompt: `You are the Infra & Perf Optimizer agent, ensuring infrastructure evolves with the application.

**Responsibilities**:
- Node.js version updates
- Bundle size optimization
- Implement @defer for lazy loading
- Lighthouse performance fixes
- CI/CD pipeline optimization

**Knowledge Sources**:
- Angular MCP: For performance best practices
- Context7: For project-specific optimizations`,
    responsibilities: [
      'Infrastructure Updates',
      'Bundle Optimization',
      'Performance Tuning',
      'CI/CD Optimization',
    ],
  },
  {
    className: 'ArchitectureReviewerAgent',
    fileName: 'architecture-reviewer',
    displayName: 'Architecture Reviewer',
    description: 'Audits code architecture and quality',
    systemPrompt: `You are the Architecture Reviewer agent, acting as a high-level auditor.

**Responsibilities**:
- Detect circular dependencies
- Analyze bundle bloat
- Enforce module boundaries
- Track migration progress
- Code quality metrics

**Knowledge Sources**:
- Angular MCP: For architectural patterns
- Context7: For project-specific architecture decisions`,
    responsibilities: [
      'Circular Dependency Detection',
      'Bundle Analysis',
      'Module Boundary Enforcement',
      'Quality Metrics',
    ],
  },
  {
    className: 'CodeReviewerAgent',
    fileName: 'code-reviewer',
    displayName: 'Code Reviewer',
    description: 'Pre-validates code before PR submission',
    systemPrompt: `You are the Code Reviewer agent, acting as a gatekeeper for code quality.

**Responsibilities**:
- Pre-PR code review
- Test coverage verification
- Security and best practices audit
- Dependency and import analysis
- Performance review

**Knowledge Sources**:
- Angular MCP: For best practices
- Context7: For project-specific standards`,
    responsibilities: [
      'Code Review',
      'Test Coverage',
      'Security Audit',
      'Best Practices',
    ],
  },
  {
    className: 'UnitTestMigratorAgent',
    fileName: 'unit-test-migrator',
    displayName: 'Unit Test Migrator',
    description: 'Migrates Karma to Vitest',
    systemPrompt: `You are the Unit Test Migrator agent, specialized in migrating Karma/Jasmine tests to Vitest.

**Responsibilities**:
- Migrate Karma unit tests to Vitest syntax
- Fix broken tests after Angular upgrades
- Update TestBed configurations
- Maintain Vitest test infrastructure
- Analyze and improve test coverage

**Knowledge Sources**:
- Angular MCP: For Angular testing patterns
- Context7: For project-specific test patterns
- Vitest Documentation: For Vitest syntax`,
    responsibilities: [
      'Karma to Vitest Migration',
      'Test Fixes',
      'Test Infrastructure',
      'Coverage Analysis',
    ],
  },
  {
    className: 'E2ETestMigratorAgent',
    fileName: 'e2e-test-migrator',
    displayName: 'E2E Test Migrator',
    description: 'Migrates Protractor to Playwright',
    systemPrompt: `You are the E2E Test Migrator agent, specialized in migrating Protractor tests to Playwright.

**Responsibilities**:
- Convert Protractor Page Objects to Playwright
- Migrate Protractor tests to Playwright syntax
- Create and maintain visual regression tests
- Update Playwright configuration
- Create new E2E tests for critical paths

**Knowledge Sources**:
- Playwright MCP: For running tests and analyzing failures
- Context7: For project-specific E2E patterns
- Playwright Documentation: For Playwright features`,
    responsibilities: [
      'Protractor to Playwright Migration',
      'Visual Regression',
      'Test Configuration',
      'New Test Creation',
    ],
  },
  {
    className: 'TestMigratorAgent',
    fileName: 'test-migrator',
    displayName: 'Test Migrator',
    description: 'Legacy agent for backward compatibility',
    systemPrompt: `You are the Test Migrator agent (Legacy), handling both unit and E2E test migrations.

**Note**: This is a legacy agent. Use Unit Test Migrator or E2E Test Migrator for new work.

**Responsibilities**:
- Handle legacy test migration patterns
- Support backward compatibility
- Bridge between old and new test frameworks`,
    responsibilities: [
      'Legacy Test Migration',
      'Backward Compatibility',
    ],
  },
];

// Generate agent files
agents.forEach((agent) => {
  const agentClassContent = `import { BaseAgent } from '../base/BaseAgent.js';
import type { PromptTurnRequest, PromptTurnResponse } from '@agentclientprotocol/sdk';

/**
 * ${agent.displayName} Agent - ${agent.description}
 */
export class ${agent.className} extends BaseAgent {
  constructor() {
    super(
      '${agent.displayName}',
      '${agent.description}'
    );
  }

  protected getSystemPrompt(): string {
    return \`${agent.systemPrompt}\`;
  }

  protected async handlePromptTurn(
    request: PromptTurnRequest
  ): Promise<PromptTurnResponse> {
    const userPrompt = this.extractUserPrompt(request);
    const response = await this.processPrompt(userPrompt);
    
    return {
      content: [
        {
          type: 'text',
          text: response,
        },
      ],
    };
  }

  protected async processPrompt(
    userPrompt: string,
    context?: Record<string, any>
  ): Promise<string> {
    let response = \`# ${agent.displayName} Analysis\\n\\n\`;
    response += \`Processing your request: \${userPrompt}\\n\\n\`;
    response += \`Use Angular MCP or relevant MCP servers for specific guidance.\\n\`;
    return response;
  }

  private extractUserPrompt(request: PromptTurnRequest): string {
    if (request.prompt.content) {
      return request.prompt.content
        .filter((c) => c.type === 'text')
        .map((c) => (c as any).text)
        .join('\\n');
    }
    return '';
  }
}
`;

  const entryPointContent = `#!/usr/bin/env node

import { ${agent.className} } from './${agent.className}.js';

const agent = new ${agent.className}();
agent.initialize().catch((error) => {
  console.error('Failed to start ${agent.displayName} agent:', error);
  process.exit(1);
});
`;

  // Write agent class file
  const agentFilePath = path.join(__dirname, `${agent.className}.ts`);
  fs.writeFileSync(agentFilePath, agentClassContent);

  // Write entry point file
  const entryFilePath = path.join(__dirname, `${agent.fileName}.ts`);
  fs.writeFileSync(entryFilePath, entryPointContent);

  console.log(`Created ${agent.className}`);
});

console.log('All agents created!');

