# Corporate Operations & Finance Optimization 

## 📋 Project Overview
This project represents a comprehensive MIS analysis workflow designed to optimize a retail logistics company's supply chain and financial health. The project encompasses the full data lifecycle: **extracting data** via SQL, **automating** accounts receivable via Google Apps Script, **visualizing** KPIs in Power BI, and delivering **strategic recommendations**.

## 🛠️ Tools & Technologies
* **Data Analysis:** SQL (Joins, Aggregates, Grouping)
* **Automation:** JavaScript / Google Apps Script
* **Visualization:** Power BI (Data Modeling, Dashboarding)
* **Business Intelligence:** Root Cause Analysis, KPI Tracking

## 📂 Project Components

### 1. Business Insights Dashboard
*Designed a centralized dashboard to track $66.31M in revenue across 4 regions.*

* **Key Metrics:** Total Revenue, Average Fulfillment Days (6.44), Conversion Rate (0.52).
* **Data Modeling:** Established relationships between Sales, Finance, CRM, and Operations tables using Star Schema.
* **Visuals:** Regional heat maps, fulfillment trends by warehouse, and lead conversion funnels.
* *(See `Dashboard_and_Models` folder for full visuals)*

### 2. Finance Automation Script
*Solved the issue of missed invoice deadlines by creating an automated tracking script.*

* **Logic:** The script scans the Finance dataset daily.
    * **Upcoming:** Highlights invoices due within 5 days in **YELLOW**.
    * **Overdue:** Identifies unpaid invoices past their due date and automatically triggers an HTML-formatted email alert to the finance team.
* **Impact:** Reduced manual monitoring time and improved cash flow visibility.
* *(See `Process Automation` for the codebase)*

### 3. SQL Data Extraction
*Authored  queries to investigate performance issues.*

* Identified the **Top 5 Customers** by revenue to drive account management focus.
* Calculated **Overdue Payments by Region** (North Region had the highest overdue count at 53).
* Analyzed the **Lead-to-Sale Funnel**, tracking conversion from "New" to "Closed".
* *(See `SQL Scripts` for the query library)*

### 4. Strategic Root Cause Analysis
*Translated raw data into actionable business strategies.*

* **Finding 1 (Operations):** The **North Region** suffered from a 6.97-day fulfillment delay. The root cause was isolated to **Warehouse WH-4** (7.63-day delay).
* **Finding 2 (Sales):** The **East Region** had the lowest revenue ($7.67M). Analysis linked this directly to it having the lowest inventory levels (475 units), indicating lost sales due to stock-outs.
* *(See `Strategic_Analysis` for the full report)*

---
*This repository demonstrates the ability to not only analyze data but to build systems that improve operational efficiency.*
