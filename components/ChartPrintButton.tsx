"use client";

// Opens the browser print dialog. On every modern browser the dialog has
// "Save as PDF" as a destination, which produces a one-A4-page PDF with
// the print stylesheet applied. Hence the button label.
export default function ChartPrintButton() {
  return (
    <button
      type="button"
      className="cta-secondary chart-print-btn"
      onClick={() => window.print()}
    >
      Download PDF
    </button>
  );
}
