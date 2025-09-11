'use server';
/**
 * @fileOverview SOP generation AI agent.
 *
 * - generateSOP - A function that handles the SOP generation process.
 * - GenerateSOPInput - The input type for the generateSOP function.
 * - GenerateSOPOutput - The return type for the generateSOP function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSOPInputSchema = z.object({
  workflowDescription: z
    .string()
    .describe('A description of the existing workflow or process.'),
  recordingsDataUri: z
    .string()
    .optional()
    .describe(
      "Optional: Recordings of the workflow, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateSOPInput = z.infer<typeof GenerateSOPInputSchema>;

const GenerateSOPOutputSchema = z.object({
  sop: z.string().describe('The generated Standard Operating Procedure.'),
  runbook: z.string().describe('The generated runbook.'),
  trainingVideoScript: z.string().describe('The script for a training video.'),
});
export type GenerateSOPOutput = z.infer<typeof GenerateSOPOutputSchema>;

export async function generateSOP(input: GenerateSOPInput): Promise<GenerateSOPOutput> {
  return generateSOPFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSOPPrompt',
  input: {schema: GenerateSOPInputSchema},
  output: {schema: GenerateSOPOutputSchema},
  prompt: `You are an expert at generating documentation for IT processes.

You will take a description of a workflow and, optionally, recordings of the workflow, and generate a Standard Operating Procedure (SOP), a runbook, and a training video script.

Description of the workflow: {{{workflowDescription}}}

{{#if recordingsDataUri}}
Recordings of the workflow: {{media url=recordingsDataUri}}
{{/if}}

SOP:
{{{@sop}}}

Runbook:
{{{@runbook}}}

Training Video Script:
{{{@trainingVideoScript}}}
`,
});

const generateSOPFlow = ai.defineFlow(
  {
    name: 'generateSOPFlow',
    inputSchema: GenerateSOPInputSchema,
    outputSchema: GenerateSOPOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
