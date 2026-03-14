'use server';
/**
 * @fileOverview A Genkit flow for generating a personalized Sanskrit mantra and greeting for registrants.
 *
 * - generatePersonalizedMantraGreeting - A function that handles the generation process.
 * - GeneratePersonalizedMantraGreetingInput - The input type for the function.
 * - GeneratePersonalizedMantraGreetingOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedMantraGreetingInputSchema = z.object({
  name: z.string().describe("The registrant's name."),
  category: z
    .enum(['Student', 'Professional', 'Elder', 'Family'])
    .describe("The registrant's category (e.g., Student, Professional)."),
});
export type GeneratePersonalizedMantraGreetingInput = z.infer<
  typeof GeneratePersonalizedMantraGreetingInputSchema
>;

const GeneratePersonalizedMantraGreetingOutputSchema = z.object({
  sanskritMantra: z
    .string()
    .describe(
      'A short, uplifting Sanskrit mantra relevant to spiritual gatherings.'
    ),
  personalizedGreeting: z
    .string()
    .describe(
      'A warm, personalized greeting blessed by Lord Krishna, tailored to the registrant.'
    ),
});
export type GeneratePersonalizedMantraGreetingOutput = z.infer<
  typeof GeneratePersonalizedMantraGreetingOutputSchema
>;

export async function generatePersonalizedMantraGreeting(
  input: GeneratePersonalizedMantraGreetingInput
): Promise<GeneratePersonalizedMantraGreetingOutput> {
  return personalizedMantraGreetingFlow(input);
}

const personalizedMantraGreetingPrompt = ai.definePrompt({
  name: 'personalizedMantraGreetingPrompt',
  input: {schema: GeneratePersonalizedMantraGreetingInputSchema},
  output: {schema: GeneratePersonalizedMantraGreetingOutputSchema},
  prompt: `You are a compassionate spiritual guide for the Hindu Sakti 2024 event, channeling the divine blessings of Lord Krishna.

Your task is to generate a short, uplifting Sanskrit mantra and a personalized greeting for a registrant based on their details.

Registrant Information:
Name: {{{name}}}
Category: {{{category}}}

The Sanskrit mantra should be concise and inspire spiritual growth and peace. The personalized greeting should be warm, acknowledge their participation in the Hindu Sakti 2024 event, and invoke profound blessings from Lord Krishna for their spiritual journey, well-being, and success in their life path, specifically considering their given category (e.g., Student, Professional, Elder, Family).`,
});

const personalizedMantraGreetingFlow = ai.defineFlow(
  {
    name: 'personalizedMantraGreetingFlow',
    inputSchema: GeneratePersonalizedMantraGreetingInputSchema,
    outputSchema: GeneratePersonalizedMantraGreetingOutputSchema,
  },
  async (input) => {
    const {output} = await personalizedMantraGreetingPrompt(input);
    return output!;
  }
);
