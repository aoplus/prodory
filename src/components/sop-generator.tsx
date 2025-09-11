'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateSopAction, type FormState } from '@/app/products/docsai/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useEffect } from 'react';

const formSchema = z.object({
  workflowDescription: z.string().min(20, 'Please provide a more detailed description (at least 20 characters).'),
  recordingsDataUri: z.string().optional(),
});

export default function SopGenerator() {
  const initialState: FormState = { message: '', sop: '', runbook: '', trainingVideoScript: '' };
  const [state, formAction] = useFormState(generateSopAction, initialState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workflowDescription: '',
      recordingsDataUri: '',
    },
  });
  
  const { formState, setValue } = form;

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

  useEffect(() => {
    if (state.message) {
      // Potentially show a toast notification for errors
    }
  }, [state.message]);


  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">SOP Generator</CardTitle>
        <CardDescription>Describe a workflow to generate documentation.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-8">
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
            
            <Button type="submit" disabled={formState.isSubmitting}>
              {formState.isSubmitting ? (
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

        {state.message && (
          <Alert variant="destructive" className="mt-8">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {formState.isSubmitSuccessful && state.sop && (
          <div className="mt-8">
            <h3 className="font-headline text-xl font-semibold">Generated Documents</h3>
            <Tabs defaultValue="sop" className="mt-4 w-full">
              <TabsList>
                <TabsTrigger value="sop">SOP</TabsTrigger>
                <TabsTrigger value="runbook">Runbook</TabsTrigger>
                <TabsTrigger value="script">Training Video Script</TabsTrigger>
              </TabsList>
              <TabsContent value="sop">
                <Card className="max-h-[500px] overflow-y-auto">
                  <CardContent className="p-6">
                    <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: state.sop.replace(/\n/g, '<br />') }} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="runbook">
                <Card className="max-h-[500px] overflow-y-auto">
                  <CardContent className="p-6">
                    <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: state.runbook.replace(/\n/g, '<br />') }} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="script">
                 <Card className="max-h-[500px] overflow-y-auto">
                  <CardContent className="p-6">
                    <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: state.trainingVideoScript.replace(/\n/g, '<br />') }} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
