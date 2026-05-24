"use client";

export default function ChartPrintButton() {
  return (
    <button
      type="button"
      className="cta-secondary chart-print-btn"
      onClick={() => window.print()}
    >
      Print this chart
    </button>
  );
}
