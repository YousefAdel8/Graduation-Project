export const Print = (columns, tableData, En) => {
    const printableColumns = columns.filter(col => col.key !== 'action');
  
    const tableHtml = `
      <table border="1" style="border-collapse: collapse; width: 100%; text-align: center;">
        <thead>
          <tr>
            ${printableColumns.map(col => `<th>${col.title}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${tableData.map(row => `
            <tr>
              ${printableColumns.map(col => `<td>${row[col.dataIndex] ?? ''}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  
    const style = `
      <style>
        body {
          font-family: Arial;
          padding: 10px;
          direction: ${En ? 'ltr' : 'rtl'};
          text-align: ${En ? 'left' : 'right'};
        }
        table th, table td {
          padding: 8px;
        }
      </style>
    `;
  
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html dir="${En ? 'ltr' : 'rtl'}">
        <head>
          <title>${En ? 'Print Table' : 'طباعة الجدول'}</title>
          ${style}
        </head>
        <body>
          ${tableHtml}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
  
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };
  