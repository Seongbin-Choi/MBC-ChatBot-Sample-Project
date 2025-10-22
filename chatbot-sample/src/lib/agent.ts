// src/lib/agent.ts  
import {
  fileSearchTool,
  webSearchTool,
  Agent,
  Runner,
  withTrace,
  AgentInputItem,   // <-- 타입 가져오기
} from "@openai/agents";

const fileSearch = fileSearchTool([
  "vs_68f5e859a32481919faec5f5b00150d3"
]);

const webSearchPreview = webSearchTool({
  filters: {
    allowedDomains: [
      "ko.wikipedia.org",
      "blog.naver.com",
      "google.com",
      "naver.com",
    ],
  },
  searchContextSize: "medium",
  userLocation: {
    city: "Seoul",
    country: "KR",
    region: "Seoul",
    type: "approximate",
  },
});

const testChatBot = new Agent({
  name: "Test Chat Bot",
  instructions:
    "너는 회사의 고객센터를 대신하여 자주 묻는 질문(FAQ)에 기반해 사용자에게 신속하고 정확한 답변을 제공하는 챗봇이다. ...",
  model: "gpt-5",
  tools: [fileSearch, webSearchPreview],
  modelSettings: {
    reasoning: { effort: "low", summary: "auto" },
    store: true,
  },
});

export type WorkflowInput = { input_as_text: string };
export type WorkflowOutput = { output_text: string };

export async function runWorkflow(
  workflow: WorkflowInput
): Promise<WorkflowOutput> {
  return await withTrace("헬퍼봇", async () => {
    const conversationHistory: AgentInputItem[] = [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: workflow.input_as_text,
          },
        ],
      },
    ];

    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "agent-builder",
        workflow_id:
          "wf_68f5e43aca30819082c44bd266d3902a0c9e345f4c011f35",
      },
    });

    const resultTemp = await (runner as any).run(
      testChatBot,
      conversationHistory
    );

    if (!resultTemp?.finalOutput) {
      throw new Error("Agent result is undefined");
    }

    return { output_text: String(resultTemp.finalOutput) };
  });
}
