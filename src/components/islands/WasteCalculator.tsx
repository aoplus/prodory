import { useMemo, useState } from 'react';

// Illustrative model. Every assumption is visible and editable; nothing is sent anywhere.
// The waste percentages are planning ranges, not measured results from any client.
export default function WasteCalculator() {
  const [monthly, setMonthly] = useState(500000);
  const [wastePct, setWastePct] = useState(20);
  const [vms, setVms] = useState(40);
  const [renewalPerCore, setRenewalPerCore] = useState(0);

  const result = useMemo(() => {
    const low = monthly * (wastePct * 0.6) / 100;
    const high = monthly * (wastePct * 1.2) / 100;
    return { low: Math.round(low * 12), high: Math.round(high * 12) };
  }, [monthly, wastePct]);

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <div className="grid gap-6 rounded border border-[#E5E7EB] bg-white p-6 lg:grid-cols-2">
      <div className="grid gap-5">
        <label className="grid gap-1 text-sm font-semibold">
          Current monthly cloud and Kubernetes spend (₹)
          <input type="number" min={0} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="rounded border border-[#D1D5DB] px-3 py-2.5 font-normal" />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Estimated share that is waste (%): {wastePct}
          <input type="range" min={5} max={40} value={wastePct} onChange={(e) => setWastePct(Number(e.target.value))} />
          <span className="text-xs font-normal text-[#4B5563]">Idle resources, oversized nodes, unused storage. Not measured; adjust after a diagnostic.</span>
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Virtual machines on VMware (optional)
          <input type="number" min={0} value={vms} onChange={(e) => setVms(Number(e.target.value))} className="rounded border border-[#D1D5DB] px-3 py-2.5 font-normal" />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Annual VMware renewal (₹, optional)
          <input type="number" min={0} value={renewalPerCore} onChange={(e) => setRenewalPerCore(Number(e.target.value))} className="rounded border border-[#D1D5DB] px-3 py-2.5 font-normal" />
        </label>
      </div>
      <div className="grid content-start gap-4 rounded bg-[#F8F9FA] p-5">
        <p className="text-sm text-[#4B5563]">Estimated annual saving from waste reduction</p>
        <p className="font-mono text-2xl font-semibold text-[#111827]">{fmt(result.low)} – {fmt(result.high)}</p>
        <p className="text-xs text-[#4B5563]">
          Range is 60% to 120% of your stated waste share, annualised. VMware renewal and VM count are recorded for the diagnostic only; this page does not model licence cost.
          {vms > 0 && renewalPerCore > 0 ? ` You entered ${vms} VMs and a renewal of ${fmt(renewalPerCore)}.` : ''}
        </p>
        <a href="/architecture-review/" className="inline-flex min-h-11 items-center justify-center rounded bg-[#1D4ED8] px-4 font-semibold text-white no-underline hover:bg-[#1E40AF]">Get a two-week waste diagnostic</a>
      </div>
    </div>
  );
}
