'use server';

import { generateSOP } from '@/ai/flows/generate-sop-from-workflow';
import { z } from 'zod';

export interface FormState {
  message: string;
  sop: string;
  runbook: string;
  trainingVideoScript: string;
}

const formSchema = z.object({
  workflowDescription: z.string().min(20),
  recordingsDataUri: z.string().optional(),
});

export async function generateSopAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const validatedFields = formSchema.safeParse({
      workflowDescription: formData.get('workflowDescription'),
      recordingsDataUri: formData.get('recordingsDataUri'),
    });

    if (!validatedFields.success) {
      return {
        ...prevState,
        message: 'Invalid form data. Please check your inputs.',
      };
    }
    
    const result = await generateSOP(validatedFields.data);

    if (!result.sop || !result.runbook || !result.trainingVideoScript) {
        return {
            ...prevState,
            message: 'AI failed to generate documents. Please try again with a more descriptive prompt.',
        }
    }

    return {
      message: 'success',
      sop: result.sop,
      runbook: result.runbook,
      trainingVideoScript: result.trainingVideoScript,
    };
  } catch (e: any) {
    return {
      ...prevState,
      message: `An unexpected error occurred: ${e.message}`,
    };
  }
}
