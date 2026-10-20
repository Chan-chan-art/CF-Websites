// src/actions/index.ts
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema'; // standard Zod validation provided by Astro

export const server = {
  subscribe: defineAction({
    accept: 'form',
    input: z.shape({
      email: z.string().email({ message: "Please enter a valid email address." }),
    }),
    handler: async (input) => {
      const { email } = input;
      
      try {
        // TODO: Insert your email provider logic here (e.g., Resend, ConvertKit, Mailchimp)
        // await myEmailProvider.addSubscriber(email);
        
        return { success: true, message: "Thank you for subscribing!" };
      } catch (error) {
        return { success: false, message: "Something went wrong. Please try again." };
      }
    }
  })
}
