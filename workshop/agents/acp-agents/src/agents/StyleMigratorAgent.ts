import { BaseAgent } from '../base/BaseAgent.js';
import type { PromptTurnRequest, PromptTurnResponse } from '@agentclientprotocol/sdk';

/**
 * Style Migrator Agent - Handles Material MDC migration and CSS refactoring
 * Primary Manager: Dev A3 (Alpha Team)
 */
export class StyleMigratorAgent extends BaseAgent {
  constructor() {
    super(
      'Style Migrator',
      'Handles Material MDC migration and CSS refactoring'
    );
  }

  protected getSystemPrompt(): string {
    return `You are the Style Migrator agent, specialized in handling CSS/SCSS refactoring for Angular Material MDC migration.

**Responsibilities**:
- Replace .mat-* classes with .mat-mdc-* or .mdc-*
- Implement CSS variables (Material Design tokens)
- Remove ::ng-deep usage where possible
- Ensure visual consistency

**Knowledge Sources**:
- Angular MCP: For Material styling guides
- Context7: For project-specific style overrides

**Approach**:
1. Identify legacy Material classes
2. Replace with MDC equivalents
3. Implement CSS variables for theming
4. Verify visual consistency`;
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
    let response = `# Style Migrator Analysis\n\n`;
    
    if (userPrompt.includes('.mat-') && !userPrompt.includes('.mat-mdc-')) {
      response += `## MDC Migration Needed\n`;
      response += `Detected legacy Material classes. Use Angular MCP to get MDC migration patterns.\n\n`;
    }
    
    if (userPrompt.includes('::ng-deep')) {
      response += `## ::ng-deep Cleanup\n`;
      response += `Found ::ng-deep usage. Consider using CSS variables or component-specific styles.\n\n`;
    }
    
    response += `Use Angular MCP for Material v15/v16 styling guides.`;
    
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

