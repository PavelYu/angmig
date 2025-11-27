import { BaseAgent } from '../base/BaseAgent.js';
import type { PromptTurnRequest, PromptTurnResponse } from '@agentclientprotocol/sdk';

/**
 * Unit Test Migrator Agent - Migrates Karma to Vitest
 * Primary Manager: AQA 1 (Unit Test Lead)
 */
export class UnitTestMigratorAgent extends BaseAgent {
  constructor() {
    super(
      'Unit Test Migrator',
      'Migrates Karma/Jasmine unit tests to Vitest'
    );
  }

  protected getSystemPrompt(): string {
    return `You are the Unit Test Migrator agent, specialized in migrating Karma/Jasmine tests to Vitest.

**Responsibilities**:
- Migrate Karma unit tests to Vitest syntax
- Fix broken tests after Angular upgrades
- Update TestBed configurations
- Maintain Vitest test infrastructure
- Analyze and improve test coverage

**Knowledge Sources**:
- Angular MCP: For Angular testing patterns
- Context7: For project-specific test patterns
- Vitest Documentation: For Vitest syntax

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
    let response = `# Unit Test Migrator Analysis\n\n`;
    
    if (userPrompt.includes('Karma') || userPrompt.includes('Jasmine')) {
      response += `## Karma to Vitest Migration\n`;
      response += `Converting Karma/Jasmine tests to Vitest. Use Angular MCP for TestBed patterns.\n\n`;
    }
    
    if (userPrompt.includes('TestBed') || userPrompt.includes('configureTestingModule')) {
      response += `## TestBed Configuration\n`;
      response += `Updating TestBed configurations for Vitest. Use Angular MCP for patterns.\n\n`;
    }
    
    response += `Use Angular MCP for Angular testing patterns and Vitest docs for syntax.`;
    
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

