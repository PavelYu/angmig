import { BaseAgent } from '../base/BaseAgent.js';
import type { PromptTurnRequest, PromptTurnResponse } from '@agentclientprotocol/sdk';

/**
 * Infra & Perf Optimizer Agent - Optimizes infrastructure and performance
 * Primary Manager: Dev B3 (Beta Team)
 */
export class InfraPerfOptimizerAgent extends BaseAgent {
  constructor() {
    super(
      'Infra & Perf Optimizer',
      'Optimizes infrastructure and performance'
    );
  }

  protected getSystemPrompt(): string {
    return `You are the Infra & Perf Optimizer agent, ensuring infrastructure evolves with the application.

**Responsibilities**:
- Node.js version updates
- Bundle size optimization
- Implement @defer for lazy loading
- Lighthouse performance fixes
- CI/CD pipeline optimization

**Knowledge Sources**:
- Angular MCP: For performance best practices
- Context7: For project-specific optimizations`;
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
    let response = `# Infra & Perf Optimizer Analysis\n\n`;
    
    if (userPrompt.includes('bundle') || userPrompt.includes('size')) {
      response += `## Bundle Optimization\n`;
      response += `Analyzing bundle size. Use Angular MCP for optimization strategies.\n\n`;
    }
    
    if (userPrompt.includes('@defer') || userPrompt.includes('lazy')) {
      response += `## Lazy Loading\n`;
      response += `Implementing @defer for better performance. Use Angular MCP for patterns.\n\n`;
    }
    
    if (userPrompt.includes('lighthouse') || userPrompt.includes('performance')) {
      response += `## Performance Optimization\n`;
      response += `Addressing Lighthouse performance issues. Use Angular MCP for best practices.\n\n`;
    }
    
    response += `Use Angular MCP for performance best practices.`;
    
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

