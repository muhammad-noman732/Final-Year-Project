# GCUF Master System - Intelligent FYP Roadmap

This is the complete, start-to-finish master blueprint for the FYP. It covers building two highly advanced, intelligent, and real-time modules within the same project: 
1. **The Intelligent Fee Management System**
2. **The Intelligent Registration System**

**Important Context for Claude:** 
- Registration and Fees are **separate modules** in this system. When a student registers (applies for admission), they are NOT automatically connected to the fee system. Admins will handle moving approved students into the fee system later.
- However, BOTH modules must be Real-Time (using SSE) and Intelligent (using predictive analytics and smart text insights).

Feed this plan to Claude step-by-step.

---

# PART A: The Intelligent Fee System

## 🗄️ Phase 1: Fee Database Intelligence (Schema)
*Goal: Add tables for Live Feeds, Smart Insights, and Student Risk profiles.*
**STATUS: ALREADY COMPLETED (Schema is pushed to Neon DB)**

The `ActivityLog`, `Insight`, and the new risk tracking fields in `Student` have already been pushed to the database.

## ⚙️ Phase 2: Fee Automation & Cron Jobs
*Goal: The system takes action autonomously.*

**Step 2.1: Daily Defaulter Enforcement**
- Create a cron job (`/api/cron/daily-check`).
- Logic: Find `FeeAssignment` where `status = "UNPAID"` AND `dueDate < today`. Mark as `"OVERDUE"`.
- Log: Create an `ActivityLog`: *"System marked 45 students as OVERDUE."*

**Step 2.2: The Risk Calculator & Smart Sentences**
- **Risk Calculator:** If a student has > 1 historical late payment, update `riskLevel` to `"HIGH"`.
- **Insight Generator:** Scan DB and generate sentences for the `Insight` table.
  - *Alert:* 🔴 "CS department is 15% below campus average."
  - *Success:* 🟢 "80% of students paid 5 days before deadline."
  - *Prediction:* 🟡 "At current rate, expect to hit 100M revenue by Friday."

## 👑 Phase 3: The VC Dashboard Upgrade (Fee Side)
*Goal: Convert the dashboard into a live Command Center.*

**Step 3.1: Strict Current Semester Rule**
- Ensure all VC charts and numbers calculate "Paid/Unpaid" strictly based on the student's **Current Semester**. Historical payments do not inflate current metrics.

**Step 3.2: Smart Insights Panel & Live Feed**
- Build the **"Smart Insights Panel"** at the top. Read from the `Insight` table. Show English sentences with clickable action buttons (e.g., 1-Click "Send Reminders").
- Build the **"Live Activity Feed"** sidebar. Read from `ActivityLog`. Tie to SSE so new actions pop in instantly.

---

# PART B: The Intelligent Registration System

*Goal: Build the Admissions/Registration module. It must be just as smart and real-time as the Fee system.*

## 📝 Phase 4: Registration Logic & Real-Time Setup
**Step 4.1: Registration Database Models**
- Instruct Claude to design the schema for Registration (e.g., `Applicant` or `Registration` table) distinct from the `Student` table.
- Fields: Name, Email, Phone, AppliedProgram, Status (PENDING, APPROVED, REJECTED).

**Step 4.2: Registration API & SSE Integration**
- Create the endpoint for new registrations.
- **Crucial Real-Time Link:** The moment a prospect applies, fire `sseBroadcaster.broadcast('NewRegistration')` and log it to `ActivityLog`.

## 🧠 Phase 5: Registration Intelligence & VC View
**Step 5.1: Registration Insights Generator**
- Expand the cron job to analyze registration data and write to the `Insight` table (Module: "REGISTRATION").
  - *Alert:* 🔴 "Registrations for Physics are 20% lower than last year."
  - *Prediction:* 🟡 "Based on daily rate, CS department will exceed capacity by tomorrow."

**Step 5.2: VC Dashboard (Registration Tab)**
- Add a dedicated "Registration Analytics" tab on the VC Dashboard.
- Show Real-Time spinning counters (react-countup) for "Total Applicants Today".
- Show the Registration Smart Insights Panel.
- Show Conversion Funnels (Applied -> Approved).
