'use server';

import { z } from 'zod';

export interface FormState {
  message: string;
  success: boolean;
}

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  company: z.string().min(2, 'Company name must be at least 2 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export async function contactFormAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const validatedFields = formSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
    });

    if (!validatedFields.success) {
      const errorMessages = validatedFields.error.issues.map(issue => issue.message).join(' ');
      return {
        message: `Invalid input: ${errorMessages}`,
        success: false,
      };
    }
    
    // In a real application, you would do the following:
    // 1. Save the data to Firestore
    // await db.collection('contacts').add(validatedFields.data);

    // 2. Trigger an email via a Firebase Function or a third-party service
    // await sendEmail(validatedFields.data);

    console.log('Contact form submitted:', validatedFields.data);
    
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));


    return {
      message: 'Your message has been sent successfully!',
      success: true,
    };
  } catch (e: any) {
    return {
      message: `An unexpected error occurred: ${e.message}`,
      success: false,
    };
  }
}
