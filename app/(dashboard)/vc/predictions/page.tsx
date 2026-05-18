"use client"

import { useState, useEffect } from "react"
import { 
  Brain, 
  RefreshCw, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Sparkles,
  Calendar,
  DollarSign,
  ArrowRight,
  Loader2
} from "lucide-react"

interface ForecastPoint {
  date: string
  predictedAmount: number
  mlEstimate: number
  scheduledDue: number
}

interface ForecastResponse {
  status: string
  totalPredicted30Days: number
  currency: string
  forecast: ForecastPoint[]
}

export default function VCAIPredictions() {
  const [forecast, setForecast] = useState<ForecastResponse | null>(null)
  const [loadingForecast, setLoadingForecast] = useState(true)
  const [training, setTraining] = useState(false)
  const [predicting, setPredicting] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null)

  // Fetch forecast data
  const fetchForecast = async () => {
    setLoadingForecast(true)
    try {
      const res = await fetch("/api/ml/forecast")
      const result = await res.json()
      if (result.success && result.data) {
        setForecast(result.data)
      } else {
        throw new Error(result.error?.message || "Failed to load forecast data")
      }
    } catch (err: any) {
      console.error(err)
      setMessage({
        text: err.message || "Model has not been trained yet. Please trigger ML Training below.",
        type: "info"
      })
    } finally {
      setLoadingForecast(false)
    }
  }

  useEffect(() => {
    fetchForecast()
  }, [])

  // Trigger training of both models
  const handleTrainAll = async () => {
    setTraining(true)
    setMessage({ text: "Training Random Forest and Linear Regression models on live database... Please wait.", type: "info" })
    try {
      const res = await fetch("/api/ml/train", { method: "POST" })
      const result = await res.json()
      if (result.success) {
        setMessage({
          text: `Training successful! Defaulter results: ${result.data?.results?.defaulter || "Done"}. Forecast: ${result.data?.results?.forecast || "Done"}.`,
          type: "success"
        })
        fetchForecast()
      } else {
        throw new Error(result.error?.message || "ML Training failed")
      }
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to retrain models", type: "error" })
    } finally {
      setTraining(false)
    }
  }

  // Trigger risk prediction updates
  const handlePredictDefaulters = async () => {
    setPredicting(true)
    setMessage({ text: "Recalculating student risk levels and risk scores in database... Please wait.", type: "info" })
    try {
      const res = await fetch("/api/ml/defaulters", { method: "POST" })
      const result = await res.json()
      if (result.success) {
        setMessage({
          text: result.data?.message || "Risk calculation complete! Student profiles synced in database.",
          type: "success"
        })
      } else {
        throw new Error(result.error?.message || "Prediction execution failed")
      }
    } catch (err: any) {
      setMessage({ text: err.message || "Failed to run predictions", type: "error" })
    } finally {
      setPredicting(false)
    }
  }

  const formatPKR = (num: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0
    }).format(num)
  }

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              AI & Analytics Module
            </span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1 flex items-center gap-2">
            <Brain className="h-6 w-6 text-indigo-500" />
            Intelligent Predictive Engine
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Evaluate financial forecasting and run ML-driven fee defaulter risk profiles locally.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchForecast}
            disabled={loadingForecast}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loadingForecast ? "animate-spin" : ""}`} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* FEEDBACK BANNER */}
      {message && (
        <div className={`p-4 rounded-2xl border flex items-start gap-3 animate-in fade-in duration-200 ${
          message.type === "success" 
            ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
            : message.type === "error"
            ? "bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400"
            : "bg-blue-500/5 border-blue-500/20 text-blue-600 dark:text-blue-400"
        }`}>
          {message.type === "success" && <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />}
          {message.type === "error" && <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />}
          {message.type === "info" && <Sparkles className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider">
              {message.type === "success" ? "Operation Successful" : message.type === "error" ? "Operation Failed" : "System Status"}
            </p>
            <p className="text-xs mt-0.5 opacity-90">{message.text}</p>
          </div>
        </div>
      )}

      {/* TOP ANALYTICS & CONTROLS GRID */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* CONTROL CARD: TRAIN ALL MODELS */}
        <div className="bg-white dark:bg-[#07090f] border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 mb-4">
              <Brain className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">ML Model Retraining</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Triggers sequential training for both the Random Forest Defaulter model and the Linear Regression Revenue Forecast model using live historical records from the database.
            </p>
          </div>
          <button
            onClick={handleTrainAll}
            disabled={training || predicting}
            className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md shadow-indigo-600/15 disabled:opacity-50"
          >
            {training ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Training Engine...
              </>
            ) : (
              <>
                <RefreshCw className="h-3.5 w-3.5" />
                Retrain All Models
              </>
            )}
          </button>
        </div>

        {/* CONTROL CARD: DEFENDER RISK CALCULATOR */}
        <div className="bg-white dark:bg-[#07090f] border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500 mb-4">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Sync Defaulter Profiles</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Calculates fee defaulter risk scores and flags (HIGH, MEDIUM, LOW) for all students using the current trained model and syncs predictions directly back into the SQL Student table.
            </p>
          </div>
          <button
            onClick={handlePredictDefaulters}
            disabled={training || predicting}
            className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white transition-all disabled:opacity-50"
          >
            {predicting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Calculating Risk...
              </>
            ) : (
              <>
                <ArrowRight className="h-3.5 w-3.5" />
                Run Risk Predictions
              </>
            )}
          </button>
        </div>

        {/* SUMMARY STATS CARD */}
        <div className="bg-white dark:bg-[#07090f] border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 mb-4">
              <DollarSign className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">Predicted Revenue (30 Days)</h3>
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2 tracking-tight">
              {loadingForecast ? (
                <span className="inline-block w-36 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
              ) : forecast ? (
                formatPKR(forecast.totalPredicted30Days)
              ) : (
                "PKR 0"
              )}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Blended ML predictions + upcoming due dates
            </p>
          </div>
          <div className="mt-6 border-t border-slate-100 dark:border-slate-800/50 pt-4 flex items-center justify-between text-xs">
            <span className="text-slate-500">Status:</span>
            <span className="font-bold text-emerald-500 flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" />
              Online & Synced
            </span>
          </div>
        </div>
      </div>

      {/* FORECASTING TIMELINE GRAPHIC & DETAILS TABLE */}
      <div className="bg-white dark:bg-[#07090f] border border-slate-200 dark:border-slate-800/60 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <TrendingUp className="h-4.5 w-4.5 text-indigo-500" />
              30-Day Revenue Forecasting Timeline
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Daily collection estimates based on time feature regression overlaid with upcoming due assignments.
            </p>
          </div>
        </div>

        {loadingForecast ? (
          <div className="space-y-4 py-8">
            <div className="h-10 bg-slate-50 dark:bg-slate-900/50 rounded-xl animate-pulse" />
            <div className="h-20 bg-slate-50 dark:bg-slate-900/50 rounded-xl animate-pulse" />
            <div className="h-20 bg-slate-50 dark:bg-slate-900/50 rounded-xl animate-pulse" />
          </div>
        ) : forecast && forecast.forecast && forecast.forecast.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 font-semibold">
                  <th className="pb-3 pl-2">Timeline Date</th>
                  <th className="pb-3">Blended Estimate</th>
                  <th className="pb-3">ML Raw Estimate</th>
                  <th className="pb-3">Upcoming Due Amount</th>
                  <th className="pb-3 pr-2 text-right">Confidence Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/30">
                {forecast.forecast.map((row) => (
                  <tr key={row.date} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-3 pl-2 font-medium text-slate-900 dark:text-slate-200">
                      {new Date(row.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </td>
                    <td className="py-3 font-bold text-slate-900 dark:text-slate-100">
                      {formatPKR(row.predictedAmount)}
                    </td>
                    <td className="py-3 text-slate-500 dark:text-slate-400">
                      {formatPKR(row.mlEstimate)}
                    </td>
                    <td className="py-3 text-slate-500 dark:text-slate-400">
                      {row.scheduledDue > 0 ? (
                        <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium">
                          {formatPKR(row.scheduledDue)}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-3 pr-2 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        row.scheduledDue > 0 
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                          : "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20"
                      }`}>
                        {row.scheduledDue > 0 ? "HIGH (Due Date)" : "MEDIUM (ML)"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <Brain className="h-12 w-12 text-slate-300 dark:text-slate-700 animate-pulse mb-3" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Models Not Yet Loaded</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-sm">
              Please click the **"Retrain All Models"** button above to generate predictions and load this forecasting timeline.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
