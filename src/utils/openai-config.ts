import { OpenAIClient } from "@anvia/openai";

interface ClientConfig {
  baseUrl: string;
  apiKey: string;
}

export function getClient({ baseUrl, apiKey}: ClientConfig) {
    return new OpenAIClient({
        baseUrl,
        apiKey,
    });
}