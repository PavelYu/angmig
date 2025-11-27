import { BaseAgent } from '../base/BaseAgent.js';
import type { PromptTurnRequest, PromptTurnResponse } from '@agentclientprotocol/sdk';

/**
 * Build Fixer Agent - Fixes TypeScript compilation errors and build failures
 * Primary Manager: Dev A1 (Alpha Team)
 */
export class BuildFixerAgent extends BaseAgent {
  constructor() {
    super(
      'Build Fixer',
      'Fixes TypeScript compilation errors, build failures, and strict mode violations'
    );
  }

  protected getSystemPrompt(): string {
    return `You are the Build Fixer agent, specialized in resolving compilation errors, TypeScript issues, and strict mode violations for Angular migrations.

**Responsibilities**:
- Fix TypeScript compilation errors (TS2322, TS2339, etc.)
- Resolve 'any' type usages (where possible)
- Fix import paths and module resolution issues
- Handle strict null checks
- Ensure 'npm run build' passes

**Knowledge Sources**:
- Angular MCP: For breaking changes in Angular APIs
- Context7: For project-specific type patterns and "wont-fix" suppressions

**Approach**:
1. Always verify environment first (Angular version, Node.js version, git state)
2. Categorize errors by pattern (Configuration, API, Type, Module, Template)
3. Fix by category in order (Configuration → API → Type → Module → Template)
4. Use Angular MCP for version-specific solutions
5. Store patterns in Context7 for reuse

**Output Format**:
- Provide clear explanations of fixes
- Include before/after code examples
- List any breaking changes or gotchas
- Suggest verification steps`;
  }

  protected async handlePromptTurn(
    request: PromptTurnRequest
  ): Promise<PromptTurnResponse> {
    const userPrompt = this.extractUserPrompt(request);
    
    // Check if this is a pre-fix verification request
    if (userPrompt.toLowerCase().includes('verify') || 
        userPrompt.toLowerCase().includes('pre-fix')) {
      return await this.handlePreFixVerification(userPrompt);
    }

    // Process the build error fix request
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
    // Extract build errors from the prompt
    const errors = this.extractBuildErrors(userPrompt);
    
    // Categorize errors
    const categorizedErrors = this.categorizeErrors(errors);
    
    // Generate fix suggestions
    let response = `# Build Fixer Analysis\n\n`;
    
    if (categorizedErrors.configuration.length > 0) {
      response += `## Configuration Errors (Fix First)\n`;
      response += await this.fixConfigurationErrors(categorizedErrors.configuration);
    }
    
    if (categorizedErrors.api.length > 0) {
      response += `\n## API Errors\n`;
      response += await this.fixApiErrors(categorizedErrors.api);
    }
    
    if (categorizedErrors.type.length > 0) {
      response += `\n## Type Errors\n`;
      response += await this.fixTypeErrors(categorizedErrors.type);
    }
    
    if (categorizedErrors.module.length > 0) {
      response += `\n## Module Errors\n`;
      response += await this.fixModuleErrors(categorizedErrors.module);
    }
    
    if (categorizedErrors.template.length > 0) {
      response += `\n## Template Errors\n`;
      response += await this.fixTemplateErrors(categorizedErrors.template);
    }
    
    response += `\n## Verification Steps\n`;
    response += `1. Run \`npm run build\` to verify fixes\n`;
    response += `2. Run \`npm run test\` to ensure tests still pass\n`;
    response += `3. Check for any new warnings or deprecations\n`;
    
    return response;
  }

  private async handlePreFixVerification(prompt: string): Promise<PromptTurnResponse> {
    let response = `# Pre-Fix Verification Report\n\n`;
    
    response += `## Environment Checks\n`;
    response += `Please verify:\n`;
    response += `1. Angular version: \`npm list @angular/core --depth=0\`\n`;
    response += `2. Node.js version: \`node --version\` (should be 18.x or 20.x)\n`;
    response += `3. Git state: \`git status\` (should be clean for ng update)\n`;
    response += `4. Configuration format: Check angular.json polyfills format\n\n`;
    
    response += `## Error Categorization\n`;
    response += `Run: \`npm run build 2>&1 | grep "error TS" | cut -d: -f4 | sort | uniq -c | sort -rn\`\n`;
    response += `This will help identify error patterns.\n`;
    
    return {
      content: [
        {
          type: 'text',
          text: response,
        },
      ],
    };
  }

  private extractUserPrompt(request: PromptTurnRequest): string {
    // Extract text content from the prompt turn request
    if (request.prompt.content) {
      return request.prompt.content
        .filter((c) => c.type === 'text')
        .map((c) => (c as any).text)
        .join('\n');
    }
    return '';
  }

  private extractBuildErrors(prompt: string): string[] {
    // Extract error messages from the prompt
    const errorRegex = /error TS\d+:/g;
    const errors: string[] = [];
    const matches = prompt.match(errorRegex);
    if (matches) {
      // Extract full error lines
      const lines = prompt.split('\n');
      for (const line of lines) {
        if (line.includes('error TS')) {
          errors.push(line.trim());
        }
      }
    }
    return errors;
  }

  private categorizeErrors(errors: string[]): {
    configuration: string[];
    api: string[];
    type: string[];
    module: string[];
    template: string[];
  } {
    return {
      configuration: errors.filter((e) =>
        e.includes('Schema validation') || e.includes('must be')
      ),
      api: errors.filter(
        (e) => e.includes('Property') || e.includes('Method') || e.includes('does not exist')
      ),
      type: errors.filter(
        (e) => e.includes('Type') || e.includes('not assignable') || e.includes('Generic')
      ),
      module: errors.filter(
        (e) => e.includes('Cannot find module') || e.includes('Module not found')
      ),
      template: errors.filter(
        (e) => e.includes('Parser Error') || e.includes('template')
      ),
    };
  }

  private async fixConfigurationErrors(errors: string[]): Promise<string> {
    return `These are configuration format errors. Check angular.json and tsconfig.json for version-specific formats.\n\n`;
  }

  private async fixApiErrors(errors: string[]): Promise<string> {
    return `These are API errors. Use Angular MCP to check breaking changes for your Angular version.\n\n`;
  }

  private async fixTypeErrors(errors: string[]): Promise<string> {
    return `These are TypeScript type errors. Add proper type annotations and handle null checks.\n\n`;
  }

  private async fixModuleErrors(errors: string[]): Promise<string> {
    return `These are module resolution errors. Check import paths and ensure modules are properly exported.\n\n`;
  }

  private async fixTemplateErrors(errors: string[]): Promise<string> {
    return `These are template errors. Check for deprecated Angular template syntax.\n\n`;
  }
}

