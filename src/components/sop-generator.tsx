'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';

const formSchema = z.object({
  workflowDescription: z.string().min(20, 'Please provide a more detailed description (at least 20 characters).'),
  recordingsDataUri: z.string().optional(),
});

export default function SopGenerator() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workflowDescription: '',
      recordingsDataUri: '',
    },
  });
  
  const { setValue, formState } = form;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUri = e.target?.result as string;
        setValue('recordingsDataUri', dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setError('Document generation is disabled for this static demo. This feature requires a server.');
    console.log('SOP Generation is disabled for static sites', values);
    setTimeout(() => {
        setIsSubmitting(false);
    }, 1000);
  };


  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">SOP Generator</CardTitle>
        <CardDescription>Describe a workflow to generate documentation.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="workflowDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workflow Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'To provision a new user in our system, first log in to the admin dashboard...'"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recordingsDataUri"
              render={() => (
                <FormItem>
                  <FormLabel>Workflow Recording (Optional)</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={handleFileChange} accept="video/*,audio/*" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Documents
                </>
              )}
            </Button>
          </form>
        </Form>

        {error && (
          <Alert variant="destructive" className="mt-8">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* The result display is removed as the action is disabled */}
      </CardContent>
    </Card>
  );
}
