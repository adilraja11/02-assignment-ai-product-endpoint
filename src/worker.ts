import { Worker } from "bullmq";
import { connection, PERSONALTRAINER_ADVISOR_QUEUE_NAME } from "./utils/queue-config.js";
import { generatePerspective } from "./modules/research/services.js";
import "dotenv/config";
import { mkdir } from "node:fs/promises";
import { writeMarkdownPdf } from "./utils/markdown-pdf.js";
import { getBaseFitnessAdvisorPrompt, getBaselineAnalysisPrompt, getNutritionBlueprintPrompt, getTrainingStrategyPrompt } from "./modules/research/prompts.js";

export const worker = new Worker(
PERSONALTRAINER_ADVISOR_QUEUE_NAME,
  async (job) => {
    const context = `
        Biometrics: ${job.data.gender}, ${job.data.age} years, ${job.data.height} cm, ${job.data.weight} kg
        Health Constraints: allergies: ${job.data.allergies}, chronic diseases: ${job.data.chronicDiseases ? job.data.chronicDiseases : "NONE"}
        Lifestyle: ${job.data.dailyActivityLevel}, past injuries: ${job.data.pastInjuries ? job.data.pastInjuries : "NONE"}
        Objective: ${job.data.mainGoal}
    `;

    const currentDate = new Date().toISOString();
    const prompts = [
      getBaseFitnessAdvisorPrompt(currentDate),
      getBaselineAnalysisPrompt(currentDate),
      getTrainingStrategyPrompt(currentDate),
      getNutritionBlueprintPrompt(currentDate),
    ];

    let finalVerdicts = "";

    for (const prompt of prompts) {
      console.log("generating for ", prompt.slice(0, 100));
      const response = await generatePerspective(context, prompt);
      finalVerdicts += response + "\n\n";
    }

    console.log("final verdicts");
    console.log(finalVerdicts);

    await mkdir("reports", { recursive: true });

    const filePath = `reports/${job.data.id}.pdf`;

    try {
      await writeMarkdownPdf(finalVerdicts, filePath);
      console.log(`Report generated at ${filePath}`);
    } catch (error) {
      console.error(`Failed to generate report at ${filePath}`, error);
      throw error;
    }
  },
  {
    connection,
  },
);
