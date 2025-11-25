/*
   Project: Corporate Operations Analysis
   Description: SQL queries used to extract KPIs regarding revenue, 
   payment statuses, conversion funnels, and fulfillment efficiency.
*/

-- 1. Top 5 Customers by Revenue
-- Identifies high-value clients to prioritize relationship management.
SELECT 
    Customer_ID,
    SUM(Amount_Cleaned) AS Total_Revenue
FROM sales
GROUP BY 1
ORDER BY Total_Revenue DESC
LIMIT 5;

-- 2. Overdue Payments By Region
-- Aggregates outstanding debt by geography to target collection efforts.
SELECT 
    s.Region,
    COUNT(f.Invoice_ID) AS Overdue_Invoices_Count,
    SUM(f.Amount) AS Total_Overdue_Amount
FROM finance f
JOIN sales s ON f.Order_ID = s.Order_ID
WHERE f.Payment_Status_Cleaned = 'Overdue'
GROUP BY 1
ORDER BY Total_Overdue_Amount DESC;

-- 3. Lead to Sale Conversion Funnel
-- Tracks the drop-off rate from initial lead to closed sale.
SELECT 
    c.Lead_Status,
    COUNT(s.Order_ID) AS Converted_Sales_Count
FROM crm c
LEFT JOIN sales s ON c.Customer_ID = s.Customer_ID
GROUP BY 1
ORDER BY Converted_Sales_Count DESC;

-- 4. Channel Performance Analysis
-- Compares revenue and average order value between Online and Offline channels.
SELECT 
    Channel,
    SUM(Amount_Cleaned) AS Total_Revenue,
    AVG(Amount_Cleaned) AS Average_Order_Value
FROM sales
GROUP BY 1
ORDER BY Total_Revenue DESC;

-- 5. Average Fulfillment Days by Region
-- specific query used to identify the bottleneck in the North Region.
SELECT 
    s.Region,
    AVG(o.Fullfillment_Day_Cleaned) AS Average_Fulfillment_Days
FROM operations o
JOIN sales s ON o.Order_ID = s.Order_ID
GROUP BY 1
ORDER BY Average_Fulfillment_Days DESC;
