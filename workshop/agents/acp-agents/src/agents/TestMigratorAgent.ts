import { BaseAgent } from '../base/BaseAgent.js';
import type { PromptTurnRequest, PromptTurnResponse } from '@agentclientprotocol/sdk';

/**
 * Test Migrator Agent (Legacy) - Legacy agent for backward compatibility
 * Primary Manager: Both AQAs
 */
export class TestMigratorAgent extends BaseAgent {
  constructor() {
    super(
      'Test Migrator',
      'Legacy agent for backward compatibility'
    );
  }

  protected getSystemPrompt(): string {
    return `You are the Test Migrator agent (Legacy), handling both unit and E2E test migrations.

**Note**: This is a legacy agent. Use Unit Test Migrator or E2E Test Migrator for new work.

**Responsibilities**:
- Handle legacy test migration patterns
- Support backward compatibility
- Bridge between old and new test frameworks

**Knowledge Sources**:
- Angular MCP: For testing patterns
- Playwright MCP: For E2E test execution
- Context7: For project-specific patterns`;
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
    let response = `# Test Migrator (Legacy) Analysis\n\n`;
    response += `**Note**: This is a legacy agent. Consider using Unit Test Migrator or E2E Test Migrator for new work.\n\n`;
    response += `Processing legacy test migration patterns...\n`;
    response += `Use appropriate specialized agents for new migrations.`;
    
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

