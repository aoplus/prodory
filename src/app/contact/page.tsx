'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { contactFormAction, type FormState } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Mail, Building, Phone } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  company: z.string().min(2, 'Company name must be at least 2 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export default function ContactPage() {
  const initialState: FormState = { message: '', success: false };
  const [state, formAction] = useFormState(contactFormAction, initialState);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Message Sent!',
        description: 'Thank you for reaching out. We will get back to you shortly.',
      });
      form.reset();
    } else if (state.message) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, form, toast]);

  return (
    <div className="bg-muted/50">
        <div className="container mx-auto px-4 py-16 sm:py-24">
            <div className="mx-auto max-w-3xl text-center">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Get in Touch
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                    Whether you have a question, want a demo, or need a free assessment, we're ready to help.
                </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
                            <CardDescription>Fill out the form and we'll be in touch.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form action={formAction} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="john@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Company</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Company Inc." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="How can we help you?" className="min-h-[150px]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                                    ) : (
                                        'Send Message'
                                    )}
                                </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                    <h3 className="font-headline text-2xl font-semibold">Contact Information</h3>
                    <div className="flex items-start gap-4">
                        <Mail className="mt-1 h-6 w-6 text-primary"/>
                        <div>
                            <h4 className="font-semibold">Email</h4>
                            <a href="mailto:contact@aoplus.in" className="text-muted-foreground hover:text-primary">contact@aoplus.in</a>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Phone className="mt-1 h-6 w-6 text-primary"/>
                        <div>
                            <h4 className="font-semibold">Phone</h4>
                            <p className="text-muted-foreground">+91 7977875818</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Building className="mt-1 h-6 w-6 text-primary"/>
                        <div>
                            <h4 className="font-semibold">Office</h4>
                            <p className="text-muted-foreground">123 Tech Park, Bangalore, India</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
