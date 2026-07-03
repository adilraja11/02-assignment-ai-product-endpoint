import { createCompletion } from "@anvia/core";
import { getClient } from "../../utils/openai-config.js";

export async function generatePerspective(
  context: string,
  instructions: string,
) {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY as string;

  const client = getClient({ 
    baseUrl: 'https://openrouter.ai/api/v1',
    apiKey: OPENROUTER_API_KEY
   });
  const model = client.completionModel("gpt-5.4-mini");
  const response = await createCompletion(model, {
    instructions,
    input: context,
    maxTokens: 3000,
  });

  return response.text;
}
