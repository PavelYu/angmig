import { AgentSideConnection } from '@agentclientprotocol/sdk';
import type {
  PromptTurnRequest,
  PromptTurnResponse,
  ToolCallRequest,
  ToolCallResponse,
} from '@agentclientprotocol/sdk';

/**
 * Base class for all Angular migration ACP agents
 */
export abstract class BaseAgent {
  protected connection: AgentSideConnection;
  protected agentName: string;
  protected agentDescription: string;

  constructor(agentName: string, agentDescription: string) {
    this.agentName = agentName;
    this.agentDescription = agentDescription;
    this.connection = new AgentSideConnection({
      name: agentName,
      version: '1.0.0',
    });
  }

  /**
   * Initialize the agent and set up handlers
   */
  async initialize(): Promise<void> {
    // Set up prompt turn handler
    this.connection.onPromptTurn(async (request: PromptTurnRequest) => {
      return await this.handlePromptTurn(request);
    });

    // Set up tool call handler
    this.connection.onToolCall(async (request: ToolCallRequest) => {
      return await this.handleToolCall(request);
    });

    // Start the connection
    await this.connection.start();
  }

  /**
   * Handle incoming prompt turns
   * Override this in subclasses to implement agent-specific logic
   */
  protected abstract handlePromptTurn(
    request: PromptTurnRequest
  ): Promise<PromptTurnResponse>;

  /**
   * Handle tool calls
   * Override this in subclasses for agent-specific tools
   */
  protected async handleToolCall(
    request: ToolCallRequest
  ): Promise<ToolCallResponse> {
    // Default implementation - can be overridden
    return {
      content: [
        {
          type: 'text',
          text: `Tool ${request.name} is not implemented in ${this.agentName}`,
        },
      ],
    };
  }

  /**
   * Get system prompt for this agent
   */
  protected abstract getSystemPrompt(): string;

  /**
   * Process the user's prompt with agent-specific logic
   */
  protected abstract processPrompt(
    userPrompt: string,
    context?: Record<string, any>
  ): Promise<string>;
}

