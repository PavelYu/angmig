import { BaseAgent } from '../base/BaseAgent.js';
import type { PromptTurnRequest, PromptTurnResponse } from '@agentclientprotocol/sdk';

/**
 * Architecture Reviewer Agent - Audits code architecture and quality
 * Primary Manager: Tech Lead
 */
export class ArchitectureReviewerAgent extends BaseAgent {
  constructor() {
    super(
      'Architecture Reviewer',
      'Audits code architecture and quality'
    );
  }

  protected getSystemPrompt(): string {
    return `You are the Architecture Reviewer agent, acting as a high-level auditor.

**Responsibilities**:
- Detect circular dependencies
- Analyze bundle bloat
- Enforce module boundaries
- Track migration progress
- Code quality metrics

**Knowledge Sources**:
- Angular MCP: For architectural patterns
- Context7: For project-specific architecture decisions`;
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
    let response = `# Architecture Reviewer Analysis\n\n`;
    
    if (userPrompt.includes('circular') || userPrompt.includes('dependency')) {
      response += `## Circular Dependency Detection\n`;
      response += `Use tools like 'madge' to detect circular dependencies. Use Angular MCP for refactoring patterns.\n\n`;
    }
    
    if (userPrompt.includes('bundle') || userPrompt.includes('bloat')) {
      response += `## Bundle Analysis\n`;
      response += `Analyzing bundle size. Use Angular MCP for optimization strategies.\n\n`;
    }
    
    response += `Use Angular MCP for architectural patterns and best practices.`;
    
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

