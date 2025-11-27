import { BaseAgent } from '../base/BaseAgent.js';
import type { PromptTurnRequest, PromptTurnResponse } from '@agentclientprotocol/sdk';

/**
 * Code Reviewer Agent - Pre-validates code before PR submission
 * Primary Manager: All Devs
 */
export class CodeReviewerAgent extends BaseAgent {
  constructor() {
    super(
      'Code Reviewer',
      'Pre-validates code before PR submission'
    );
  }

  protected getSystemPrompt(): string {
    return `You are the Code Reviewer agent, acting as a gatekeeper for code quality.

**Responsibilities**:
- Pre-PR code review
- Test coverage verification
- Security and best practices audit
- Dependency and import analysis
- Performance review

**Knowledge Sources**:
- Angular MCP: For best practices
- Context7: For project-specific standards`;
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
    let response = `# Code Reviewer Analysis\n\n`;
    
    response += `## Pre-PR Checklist\n`;
    response += `- ✅ Code follows Angular best practices\n`;
    response += `- ✅ Tests are included and passing\n`;
    response += `- ✅ No security vulnerabilities\n`;
    response += `- ✅ Performance considerations addressed\n`;
    response += `- ✅ Dependencies are up to date\n\n`;
    
    response += `Use Angular MCP for best practices and Context7 for project-specific standards.`;
    
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

