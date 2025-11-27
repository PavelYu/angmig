import { BaseAgent } from '../base/BaseAgent.js';
import type { PromptTurnRequest, PromptTurnResponse } from '@agentclientprotocol/sdk';

/**
 * Code Modernizer Agent - Converts legacy Angular patterns to modern syntax
 * Primary Manager: Dev A2 (Alpha Team)
 */
export class CodeModernizerAgent extends BaseAgent {
  constructor() {
    super(
      'Code Modernizer',
      'Converts legacy Angular patterns to modern syntax: Control Flow, Standalone, Typed Forms, Signals'
    );
  }

  protected getSystemPrompt(): string {
    return `You are the Code Modernizer agent, specialized in refactoring and updating Angular code to match newer versions.

**Responsibilities**:
- Convert *ngIf/*ngFor/*ngSwitch to @if/@for/@switch control flow
- Convert NgModules to Standalone components
- Migrate to Typed Forms
- Implement Signals and Computed
- Adopt inject() function
- Enable OnPush change detection

**Knowledge Sources**:
- Angular MCP: For official migration guides and best practices
- Context7: For project-specific patterns and decisions

**Approach**:
1. Analyze the component/service structure
2. Identify legacy patterns
3. Apply modern Angular patterns systematically
4. Ensure backward compatibility where needed
5. Update tests accordingly`;
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
    let response = `# Code Modernizer Analysis\n\n`;
    
    // Detect what needs to be modernized
    if (userPrompt.includes('*ngIf') || userPrompt.includes('*ngFor') || userPrompt.includes('*ngSwitch')) {
      response += `## Control Flow Migration\n`;
      response += `Converting legacy structural directives to new control flow syntax.\n\n`;
    }
    
    if (userPrompt.includes('NgModule') || userPrompt.includes('standalone')) {
      response += `## Standalone Component Migration\n`;
      response += `Converting NgModule-based components to standalone.\n\n`;
    }
    
    if (userPrompt.includes('FormGroup') || userPrompt.includes('FormControl') || userPrompt.includes('Untyped')) {
      response += `## Typed Forms Migration\n`;
      response += `Migrating to Typed Forms API.\n\n`;
    }
    
    if (userPrompt.includes('BehaviorSubject') || userPrompt.includes('Observable') || userPrompt.includes('signal')) {
      response += `## Signals Migration\n`;
      response += `Converting RxJS-based state to Signals.\n\n`;
    }
    
    response += `Use Angular MCP to get the latest migration patterns for your Angular version.`;
    
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

