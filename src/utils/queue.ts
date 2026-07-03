import { Queue } from "bullmq";
import { connection, PERSONALTRAINER_ADVISOR_QUEUE_NAME } from "./queue-config.js";

export const personalTrainerAdvisorQueue = new Queue(PERSONALTRAINER_ADVISOR_QUEUE_NAME, { connection });
