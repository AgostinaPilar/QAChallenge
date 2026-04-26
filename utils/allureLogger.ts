import { step, attachment } from 'allure-js-commons';

interface SubStepEntry {
  name: string;
  duration: number;
  error?: string;
}

interface AttachmentEntry {
  name: string;
  size: string;
}

declare global {
  var __allureSubSteps: SubStepEntry[];
  var __allureAttachments: AttachmentEntry[];
}

global.__allureSubSteps = [];
global.__allureAttachments = [];

export async function allureStep(name: string, body?: () => Promise<void>) {
  const start = Date.now();
  try {
    if (body) {
      await step(name, async () => { await body(); });
    } else {
      await step(name, async () => {});
    }
    global.__allureSubSteps.push({ name, duration: Date.now() - start });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    global.__allureSubSteps.push({ name, duration: Date.now() - start, error: errorMsg });
    await step(`❌ ERROR: ${errorMsg}`, async () => {});
    throw error;
  }
}

export async function allureAttach(name: string, content: Buffer, type: string) {
  await attachment(name, content, type);
  global.__allureAttachments.push({
    name,
    size: `${(content.length / 1024).toFixed(1)} KB`,
  });
}
