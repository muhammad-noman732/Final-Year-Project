"use client"

import { useCallback, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronRight,
} from "lucide-react"
import { useCsvImport } from "@/hooks/admin/useCsvImport"

export default function AdminRegistrationPage() {
  const { isUploading, result, error, upload, reset } = useCsvImport()
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.toLowerCase().endsWith(".csv")) return
      void upload(file)
    },
    [upload],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setDragActive(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-5 lg:p-8 pb-10">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-foreground">Registration Import</h1>
        <p className="text-sm text-muted-foreground/70">
          Upload a CSV file exported from the university&apos;s existing system.
          Each row becomes an applicant record — no manual entry required.
        </p>
      </div>

      {/* CSV Format hint */}
      <div className="rounded-xl border border-slate-200/80 dark:border-white/[0.05] bg-slate-50 dark:bg-[#080c18] px-4 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60 dark:text-muted-foreground/45">
          Required CSV Columns
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["fullName", "email", "program", "department", "session", "matricPercent", "fscPercent"].map((col) => (
            <code
              key={col}
              className="rounded-md bg-violet-50 dark:bg-white/[0.05] border border-violet-200/60 dark:border-transparent px-2 py-0.5 font-mono text-[11px] text-violet-600 dark:text-violet-400"
            >
              {col}
            </code>
          ))}
          <span className="text-[11px] text-muted-foreground/50 self-center">+ optional: phone, gender, city</span>
        </div>
        <p className="mt-2 text-[10.5px] text-muted-foreground/50">
          meritScore is auto-calculated: (matric × 0.4) + (fsc × 0.6)
        </p>
      </div>

      {/* Drop zone */}
      <AnimatePresence mode="wait">
        {!result && (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div
              onDragEnter={(e) => { e.preventDefault(); setDragActive(true) }}
              onDragLeave={() => setDragActive(false)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={[
                "relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-8 py-14 text-center transition-colors duration-200",
                dragActive
                  ? "border-violet-500/40 bg-violet-500/5"
                  : "border-slate-300 dark:border-white/[0.08] bg-white/60 dark:bg-[#080c18] hover:bg-white/80 dark:hover:bg-white/[0.02]",
                isUploading ? "pointer-events-none opacity-60" : "",
              ].join(" ")}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".csv"
                className="sr-only"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
              />

              <motion.div
                animate={isUploading ? { rotate: 360 } : { rotate: 0 }}
                transition={isUploading ? { repeat: Infinity, duration: 1.2, ease: "linear" } : {}}
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10"
              >
                <Upload className="h-6 w-6 text-violet-400" strokeWidth={1.5} />
              </motion.div>

              <p className="text-[14px] font-medium text-[#0F172A] dark:text-foreground/80">
                {isUploading ? "Importing…" : "Drop your CSV here, or click to browse"}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground/60">
                Only .csv files are accepted
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-start gap-2 rounded-lg border border-red-500/15 bg-red-950/20 px-3 py-2.5"
              >
                <AlertCircle className="mt-[1px] h-3.5 w-3.5 shrink-0 text-red-400" strokeWidth={2} />
                <p className="text-[12px] text-red-400">{error}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Result panel */}
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-slate-200/80 dark:border-white/[0.06] bg-white/90 dark:bg-[#080c18] p-6 space-y-5"
          >
            {/* Summary */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-foreground">Import Complete</p>
                  <p className="text-[11px] text-muted-foreground/50">
                    {result.totalImported.toLocaleString()} imported · {result.failed} failed
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-white/[0.07] px-3 py-1.5 text-[11px] text-muted-foreground hover:text-foreground/80 transition-colors"
              >
                <X className="h-3 w-3" /> Import another
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Imported", value: result.totalImported, tone: "text-emerald-400" },
                { label: "Failed rows", value: result.failed, tone: result.failed > 0 ? "text-amber-400" : "text-muted-foreground/40" },
                { label: "Batch ID", value: result.batchId?.slice(-8) ?? "—", tone: "text-muted-foreground/50", mono: true },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-slate-200/80 dark:border-white/[0.05] px-3 py-3">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground/50">{s.label}</p>
                  <p className={`mt-1 text-lg font-bold tabular-nums ${s.tone} ${s.mono ? "font-mono text-sm" : ""}`}>
                    {typeof s.value === "number" ? s.value.toLocaleString() : s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Errors */}
            {result.errors.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-400/70">
                  Row Errors ({result.errors.length})
                </p>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {result.errors.map((e) => (
                    <div
                      key={e.row}
                      className="flex items-start gap-2 rounded-md bg-slate-100/80 dark:bg-white/[0.03] px-3 py-2"
                    >
                      <ChevronRight className="mt-[2px] h-3 w-3 shrink-0 text-amber-500/60" strokeWidth={2.5} />
                      <p className="text-[11.5px] text-muted-foreground/70">
                        <span className="font-mono text-amber-400/70">Row {e.row}</span> — {e.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="rounded-xl border border-slate-200/80 dark:border-white/[0.04] bg-slate-50 dark:bg-[#080c18] p-5 space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50">
          How it works
        </p>
        {[
          "Export applicant data from your existing university system as CSV.",
          "Ensure columns match the required format listed above.",
          "Drop the file here — meritScore is calculated automatically.",
          "All applicants are stored separately from enrolled students.",
          "The VC dashboard Registration tab updates in real-time after upload.",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200/80 dark:bg-white/[0.05] text-[10px] font-bold text-muted-foreground/60">
              {i + 1}
            </div>
            <p className="text-[12px] leading-[1.5] text-muted-foreground/70">{step}</p>
          </div>
        ))}
      </div>

      {/* File format example */}
      <div className="rounded-xl border border-slate-200/80 dark:border-white/[0.04] bg-slate-50 dark:bg-[#080c18] p-4">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-3.5 w-3.5 text-muted-foreground/40" strokeWidth={1.8} />
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">
            Example CSV
          </p>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-slate-100 dark:bg-black/30 p-3 font-mono text-[10.5px] leading-[1.6] text-slate-600 dark:text-muted-foreground/50">
{`fullName,email,program,department,session,matricPercent,fscPercent,gender,city
Ali Hassan,ali@example.com,BSCS,CS,2024-2028,82.4,79.6,Male,Faisalabad
Sara Malik,sara@example.com,BSBio,Biology,2024-2028,91.2,88.0,Female,Lahore`}
        </pre>
      </div>
    </div>
  )
}
