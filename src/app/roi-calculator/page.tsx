import { ROICalculator } from '@/components/roi-calculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ROI Calculator | AO+ Cloud Platform',
  description: 'Estimate your potential cloud storage cost savings with the AO+ Solutions ROI Calculator.',
};

export default function ROICalculatorPage() {
  return (
    <div className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <ROICalculator />
      </div>
    </div>
  );
}
