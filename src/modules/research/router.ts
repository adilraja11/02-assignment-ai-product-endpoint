import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { prisma } from "../../utils/prisma.js";
import { ResearchRequestSchema } from "./schema.js";
import { personalTrainerAdvisorQueue } from "../../utils/queue.js";

export const researchRouter = new Hono()
    .get("/", async (c) => {
        const researchs = await prisma.research.findMany();
        return c.json(researchs);
    })
    .post("/", zValidator("json", ResearchRequestSchema), async (c) => {
        const body = c.req.valid("json");
        const { fullName, gender, age, height, weight, allergies, chronicDiseases, dailyActivityLevel, pastInjuries, mainGoal } = body;

        const newResearch = await prisma.research.create({
        data: {
            fullName,
            gender,
            age,
            height,
            weight,
            allergies,
            chronicDiseases,
            dailyActivityLevel,
            pastInjuries,
            mainGoal
        },
        });

        await personalTrainerAdvisorQueue.add("research", newResearch);

        return c.json({
            message: "Research is on queue",
            researchId: newResearch.id,
        });
    });