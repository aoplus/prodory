'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from './ui/button';
import Link from 'next/link';

// Assumptions for calculation
const AVG_COST_PER_TB_PER_MONTH_USD = 20; // Average cost for general-purpose SSD storage
const USD_TO_INR_RATE = 83;

export function ROICalculator() {
  const [storage, setStorage] = useState(50); // in TB
  const [overprovisioned, setOverprovisioned] = useState(40); // in %
  const [cloudProvider, setCloudProvider] = useState('aws');

  const estimatedSavings = useMemo(() => {
    const totalCost = storage * AVG_COST_PER_TB_PER_MONTH_USD;
    const wastedCost = totalCost * (overprovisioned / 100);
    const potentialSavings = wastedCost * 0.7; // Assuming Prodory can save up to 70% of the wasted cost
    return {
      monthlyUsd: potentialSavings,
      yearlyUsd: potentialSavings * 12,
      monthlyInr: potentialSavings * USD_TO_INR_RATE,
      yearlyInr: potentialSavings * 12 * USD_TO_INR_RATE,
    };
  }, [storage, overprovisioned]);

  return (
    <Card className="max-w-4xl mx-auto bg-card/50 border-primary/20 shadow-2xl shadow-primary/10">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-center">Estimate Your Cloud Storage Savings</CardTitle>
        <CardDescription className="text-center text-muted-foreground text-lg">
          Use our calculator to estimate how much you could save on block storage costs with Prodory Storage Autoscaler.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Sliders */}
          <div className="space-y-8">
            <div>
              <Label htmlFor="cloud-provider" className="text-lg">Cloud Provider</Label>
              <Select value={cloudProvider} onValueChange={setCloudProvider}>
                <SelectTrigger id="cloud-provider" className="mt-2 text-base">
                  <SelectValue placeholder="Select a provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aws">Amazon Web Services (AWS)</SelectItem>
                  <SelectItem value="gcp">Google Cloud Platform (GCP)</SelectItem>
                  <SelectItem value="azure">Microsoft Azure</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="storage-slider" className="text-lg">Total Provisioned Storage</Label>
                <span className="font-bold text-primary text-xl">{storage} TB</span>
              </div>
              <Slider
                id="storage-slider"
                value={[storage]}
                onValueChange={(value) => setStorage(value[0])}
                min={1}
                max={1000}
                step={1}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="overprovisioned-slider" className="text-lg">Avg. Over-provisioned</Label>
                 <span className="font-bold text-primary text-xl">{overprovisioned}%</span>
              </div>
              <Slider
                id="overprovisioned-slider"
                value={[overprovisioned]}
                onValueChange={(value) => setOverprovisioned(value[0])}
                min={10}
                max={90}
                step={5}
              />
               <p className="text-xs text-muted-foreground mt-2">The percentage of your provisioned storage that is typically unused.</p>
            </div>
          </div>

          {/* Right Side: Results */}
          <div className="rounded-lg bg-background p-8 text-center border border-border">
            <h3 className="text-lg font-semibold text-muted-foreground">Estimated Yearly Savings</h3>
            <p className="font-headline text-5xl font-bold text-primary my-2">
              ₹{Math.round(estimatedSavings.yearlyInr).toLocaleString('en-IN')}
            </p>
             <p className="text-muted-foreground">
              (${Math.round(estimatedSavings.yearlyUsd).toLocaleString('en-US')} / year)
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Savings are estimates. Request a free, detailed assessment for an accurate quote.
            </p>
            <Button size="lg" className="mt-6 w-full font-bold" asChild>
                <Link href="/contact?assessment=storage">Request Free Assessment</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
