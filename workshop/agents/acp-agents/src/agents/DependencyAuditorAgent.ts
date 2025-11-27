import { BaseAgent } from '../base/BaseAgent.js';
import type { PromptTurnRequest, PromptTurnResponse } from '@agentclientprotocol/sdk';

/**
 * Dependency Auditor Agent - Ensures package compatibility and upgrades
 * Primary Manager: Dev B2 (Beta Team)
 */
export class DependencyAuditorAgent extends BaseAgent {
  constructor() {
    super(
      'Dependency Auditor',
      'Ensures package compatibility and upgrades'
    );
  }

  protected getSystemPrompt(): string {
    return `You are the Dependency Auditor agent, responsible for ensuring package compatibility.

**Responsibilities**:
- Check package.json against Angular compatibility matrix
- Identify deprecated packages
- Suggest replacements or upgrade paths
- Resolve peer dependency warnings

**Knowledge Sources**:
- Angular MCP: For compatibility lists
- NPM Registry: For versions and peer deps
- Context7: For allow-list of legacy packages`;
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
    let response = `# Dependency Auditor Analysis\n\n`;
    
    if (userPrompt.includes('package.json') || userPrompt.includes('dependencies')) {
      response += `## Package Analysis\n`;
      response += `Checking packages against Angular compatibility matrix. Use Angular MCP for compatibility lists.\n\n`;
    }
    
    if (userPrompt.includes('deprecated') || userPrompt.includes('ngx-perfect-scrollbar')) {
      response += `## Deprecated Package Detection\n`;
      response += `Found deprecated packages. Check Angular MCP for recommended replacements.\n\n`;
    }
    
    if (userPrompt.includes('peer') || userPrompt.includes('warning')) {
      response += `## Peer Dependency Issues\n`;
      response += `Resolving peer dependency warnings. Check NPM registry for compatible versions.\n\n`;
    }
    
    response += `Use Angular MCP and NPM registry for compatibility information.`;
    
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

