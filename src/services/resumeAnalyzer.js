import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { bedrockClient } from "../config/bedrockClient.js";

export async function analyzeResume(resumeText) {

const prompt = `
You are an expert technical recruiter.

Analyze the following resume and provide:

1. Resume Score (1-10)
2. Strengths
3. Weaknesses
4. Suggestions for improvement

Resume:
${resumeText}
`;

const body = JSON.stringify({
  anthropic_version: "bedrock-2023-05-31",
  max_tokens: 500,
  messages: [
    {
      role: "user",
      content: prompt
    }
  ]
});

const command = new InvokeModelCommand({
  modelId: "anthropic.claude-3-haiku-20240307-v1:0",
  body,
  contentType: "application/json"
});

const response = await bedrockClient.send(command);

const result = JSON.parse(
  new TextDecoder().decode(response.body)
);

return result.content[0].text;
}