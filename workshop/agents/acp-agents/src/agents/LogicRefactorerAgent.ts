import { BaseAgent } from '../base/BaseAgent.js';
import type { PromptTurnRequest, PromptTurnResponse } from '@agentclientprotocol/sdk';

/**
 * Logic Refactorer Agent - Handles Services, HTTP, Guards, Interceptors, RxJS, State
 * Primary Manager: Dev B1 (Beta Team)
 */
export class LogicRefactorerAgent extends BaseAgent {
  constructor() {
    super(
      'Logic Refactorer',
      'Handles Services, HTTP, Guards, Interceptors, RxJS, State Management'
    );
  }

  protected getSystemPrompt(): string {
    return `You are the Logic Refactorer agent, specialized in backend logic migrations.

**Responsibilities**:
- Convert HttpClientModule to provideHttpClient
- Replace constructor DI with inject()
- Refactor state management patterns
- Convert class-based interceptors to functional
- Migrate RxJS patterns (toPromise() → lastValueFrom())

**Knowledge Sources**:
- Angular MCP: For HTTP and injection patterns
- Context7: For project-specific patterns

**Approach**:
1. Analyze service/guard/interceptor structure
2. Identify legacy patterns
3. Apply modern Angular patterns
4. Ensure business logic remains intact`;
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
    let response = `# Logic Refactorer Analysis\n\n`;
    
    if (userPrompt.includes('HttpClientModule') || userPrompt.includes('provideHttpClient')) {
      response += `## HTTP Migration\n`;
      response += `Migrating from HttpClientModule to provideHttpClient. Use Angular MCP for patterns.\n\n`;
    }
    
    if (userPrompt.includes('constructor') && userPrompt.includes('private')) {
      response += `## Injection Migration\n`;
      response += `Consider using inject() instead of constructor injection.\n\n`;
    }
    
    if (userPrompt.includes('toPromise()')) {
      response += `## RxJS Migration\n`;
      response += `Replace toPromise() with lastValueFrom() or firstValueFrom().\n\n`;
    }
    
    response += `Use Angular MCP for version-specific migration patterns.`;
    
    return response;
  }

  private extractUserPrompt(request: PromptTurnRequest): string {
    if (request.prompt.content) {
      return request.prompt.content
        .filter((c: any) => c.type === 'text')
        .map((c: any) => c.text)
        .join('\n');
    }
    return '';
  }
}

