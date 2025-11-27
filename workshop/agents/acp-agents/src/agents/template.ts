import { BaseAgent } from '../base/BaseAgent.js';
import type { PromptTurnRequest, PromptTurnResponse } from '@agentclientprotocol/sdk';

/**
 * Template for creating new ACP agents
 * Copy this file and modify for each agent
 */
export class TemplateAgent extends BaseAgent {
  constructor(
    agentName: string,
    agentDescription: string,
    systemPrompt: string
  ) {
    super(agentName, agentDescription);
    this.systemPrompt = systemPrompt;
  }

  private systemPrompt: string;

  protected getSystemPrompt(): string {
    return this.systemPrompt;
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
    // Implement agent-specific logic here
    return `# ${this.agentName} Response\n\nProcessing: ${userPrompt}`;
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

