'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';
import type { GenerateSOPOutput } from '@/ai/flows/generate-sop-from-workflow';

const formSchema = z.object({
  workflowDescription: z.string().min(20, 'Please provide a more detailed description (at least 20 characters).'),
  recordingsDataUri: z.string().optional(),
});

const sampleData: GenerateSOPOutput = {
    sop: `
### **Standard Operating Procedure: User Provisioning**

**1.0 Purpose**
To outline the standard procedure for provisioning a new user account in the system to ensure consistency and security.

**2.0 Scope**
This procedure applies to all IT administrators responsible for user account management.

**3.0 Procedure**
1.  Log in to the Admin Dashboard.
2.  Navigate to the 'User Management' section.
3.  Click on 'Create New User'.
4.  Fill in the required user details: Full Name, Email, and Role.
5.  Assign the user to the appropriate user group.
6.  Generate a temporary password and select 'Require password change on first login'.
7.  Click 'Create User'.
8.  Communicate the new credentials to the user via a secure channel.
    `,
    runbook: `
### **Runbook: New User Provisioning**

-   **Objective:** Create a new user account.
-   **Trigger:** Service request ticket from HR or a manager.
-   **Steps:**
    1.  Verify requestor identity and approval.
    2.  Execute SOP-USER-PROV-001.
    3.  Confirm account creation in the admin log.
    4.  Update the service ticket with the username.
    5.  Close the ticket.
    `,
    trainingVideoScript: `
### **Training Video Script: How to Add a New User**

**(Scene: Screen recording of the admin dashboard)**

**Narrator:** "Welcome! In this short video, we'll show you how to provision a new user. First, log in to the admin dashboard. On the left-hand menu, click on 'User Management'. Now, click the 'Create New User' button. You'll see a form. Fill in the user's full name, their email address, and select their role from the dropdown. Once that's done, click 'Create User'. The system will generate a temporary password. Make sure to share this securely with the new user. And that's it! You've successfully created a new user account."
    `,
};


export default function SopGenerator() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateSOPOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workflowDescription: '',
      recordingsDataUri: '',
    },
  });
  
  const { setValue } = form;

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
    setError(null);
    setResult(null);

    // Simulate server-side action for static deployment
    console.log('Simulating SOP Generation for static site with values:', values);
    setTimeout(() => {
        setResult(sampleData);
        setIsSubmitting(false);
    }, 1500);
  };


  return (
    <Card className="w-full shadow-lg border-primary/20">
      <CardHeader className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Wand2 className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="font-headline text-3xl mt-4">Try Prodory DocsAI</CardTitle>
        <CardDescription className="text-muted-foreground text-lg">
          Instantly generate documentation from a simple description of your process.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                   <p className="text-xs text-muted-foreground mt-1">Upload a screen recording of the process for more accurate results.</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={isSubmitting} size="lg" className="w-full font-semibold">
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

        {result && (
          <div className="mt-8">
            <Tabs defaultValue="sop" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="sop">SOP</TabsTrigger>
                <TabsTrigger value="runbook">Runbook</TabsTrigger>
                <TabsTrigger value="training">Training Script</TabsTrigger>
              </TabsList>
              <TabsContent value="sop">
                <Card className="mt-2">
                  <CardContent className="p-6">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{result.sop}</pre>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="runbook">
                <Card className="mt-2">
                  <CardContent className="p-6">
                     <pre className="whitespace-pre-wrap font-sans text-sm">{result.runbook}</pre>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="training">
                <Card className="mt-2">
                  <CardContent className="p-6">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{result.trainingVideoScript}</pre>
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
