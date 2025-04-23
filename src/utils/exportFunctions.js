import printJS from 'print-js';

export const Print = (columns, tableData, En) => {
  const printableColumns = columns
    .filter(col => col.key !== 'action')
    .map(col => ({
      field: col.dataIndex,
      displayName: col.title
    }));
  
  printJS({
    printable: tableData,
    properties: printableColumns,
    type: 'json',
    header: `<h3>${En ? 'Reports Table' : 'جدول البلاغات'}</h3>`,
    style: `
      @page { size: auto; margin: 10mm; }
      @media print {
        body {
          direction: ${En ? 'ltr' : 'rtl'};
          text-align: ${En ? 'left' : 'right'};
        }
      }
    `,
    gridStyle: 'border: 1px solid #ddd; text-align: center;',
    documentTitle: En ? 'Reports' : 'البلاغات'
  });
};