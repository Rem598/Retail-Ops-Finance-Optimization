/**
 * Script Name: Invoice Automation & Overdue Tracker
 * Purpose: Automates the monitoring of finance sheets to detect overdue payments.
 * Logic:
 * - Checks 'Due_Date' vs Today.
 * - If Overdue (> 0 days late) AND Not Paid -> Sends Email Alert.
 * - If Upcoming (Within 5 days) AND Not Paid -> Highlights Row Yellow.
 */

const RECIPIENT_EMAIL = "finance_team@company.com"; // Placeholder

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Invoice Manager')
    .addItem('Run Invoice Check', 'processInvoices')
    .addToUi();
}

function processInvoices() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert("No data found in the sheet.");
    return;
  }

  // Get all data: Start Row 2, Col 1, to last row, 10 columns wide
  const dataRange = sheet.getRange(2, 1, lastRow - 1, 10);
  const data = dataRange.getValues();

  let overdueInvoices = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const invoiceId = row[0]; // Col A
    const amount = row[3];    // Col D
    const status = row[5];    // Col F
    const dueDateString = row[6]; // Col G

    const dueDate = parseDate(dueDateString);
    if (!dueDate) continue;

    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Define range for highlighting (i + 2 accounts for header and 0-index)
    const currentRowRange = sheet.getRange(i + 2, 1, 1, 10);

    // LOGIC A: Overdue Check (Negative days and not Paid)
    if (diffDays < 0 && status !== "Paid") {
      overdueInvoices.push({
        id: invoiceId,
        amount: amount,
        due: dueDateString,
        daysLate: Math.abs(diffDays)
      });
    }

    // LOGIC B: Upcoming Deadline Check (0 to 5 days and not Paid)
    if (diffDays >= 0 && diffDays <= 5 && status !== "Paid") {
      currentRowRange.setBackground("#fff2cc"); // Highlight Yellow
    } else {
      currentRowRange.setBackground(null); // Reset
    }
  }

  // Trigger Email if overdue items exist
  if (overdueInvoices.length > 0) {
    sendOverdueEmail(overdueInvoices);
    SpreadsheetApp.getUi().alert(`Success: Found ${overdueInvoices.length} overdue invoices. Email sent.`);
  } else {
    SpreadsheetApp.getUi().alert("Success: No overdue invoices found.");
  }
}

// Helper: Convert "DD-MM-YYYY" string to Date Object
function parseDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  // new Date(Year, MonthIndex, Day)
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

// Helper: Format and send email
function sendOverdueEmail(invoices) {
  const subject = "⚠️ ALERT: Overdue Invoices Summary";
  let htmlBody = "<h3>The following invoices are overdue and require attention:</h3>";
  
  htmlBody += "<table border='1' style='border-collapse:collapse; width:100%; border:1px solid #ddd;'>";
  htmlBody += "<tr style='background-color:#f2f2f2'><th>ID</th><th>Amount</th><th>Due Date</th><th>Days Late</th></tr>";

  invoices.forEach(inv => {
    htmlBody += `<tr>
      <td style='padding:8px; text-align:center;'>${inv.id}</td>
      <td style='padding:8px; text-align:right;'>${inv.amount}</td>
      <td style='padding:8px; text-align:center;'>${inv.due}</td>
      <td style='padding:8px; text-align:center; color:red; font-weight:bold;'>${inv.daysLate}</td>
    </tr>`;
  });

  htmlBody += "</table>";
  htmlBody += "<p>Please check the Finance Sheet for more details.</p>";

  MailApp.sendEmail({
    to: RECIPIENT_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}
