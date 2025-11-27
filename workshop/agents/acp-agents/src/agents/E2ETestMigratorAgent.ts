import { BaseAgent } from '../base/BaseAgent.js';
import type { PromptTurnRequest, PromptTurnResponse } from '@agentclientprotocol/sdk';

/**
 * E2E Test Migrator Agent - Migrates Protractor to Playwright
 * Primary Manager: AQA 2 (E2E & Visual Lead)
 */
export class E2ETestMigratorAgent extends BaseAgent {
  constructor() {
    super(
      'E2E Test Migrator',
      'Migrates Protractor E2E tests to Playwright'
    );
  }

  protected getSystemPrompt(): string {
    return `You are the E2E Test Migrator agent, specialized in migrating Protractor tests to Playwright.

**Responsibilities**:
- Convert Protractor Page Objects to Playwright
- Migrate Protractor tests to Playwright syntax
- Create and maintain visual regression tests
- Update Playwright configuration
- Create new E2E tests for critical paths

**Knowledge Sources**:
- Playwright MCP: For running tests and analyzing failures
- Context7: For project-specific E2E patterns
- Playwright Documentation: For Playwright features

**Note**: This agent works independently of Angular version state.`;
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
    let response = `# E2E Test Migrator Analysis\n\n`;
    
    if (userPrompt.includes('Protractor') || userPrompt.includes('element(by')) {
      response += `## Protractor to Playwright Migration\n`;
      response += `Converting Protractor tests to Playwright. Use Playwright MCP for test execution.\n\n`;
    }
    
    if (userPrompt.includes('visual') || userPrompt.includes('regression')) {
      response += `## Visual Regression Testing\n`;
      response += `Setting up visual regression tests. Use Playwright MCP for snapshot management.\n\n`;
    }
    
    response += `Use Playwright MCP for running tests and analyzing failures.`;
    
    return response;
  }

  private extractUserPrompt(request: PromptTurnRequest): string {
    if (request.prompt.content) {
      return request.prompt.content
        .filter((c) => c.type === 'text')
        .map((c) => (c as any).text)
        .join('\n');
    }
    return '';
  }
}

