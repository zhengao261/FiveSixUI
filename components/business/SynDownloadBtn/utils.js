const Utils = {};
export default Utils;
// xls
Utils.JSONToExcelConvertor = (JSONData, FileName, ShowLabel, tips) => {
  // 先转化json
  const arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
  let excel = '<table>';
  // 设置说明
  if (tips) {
    let row = '<tr>';
    tips.split(',').map(
      (item) => {
        row += '<td>' + item.split(':')[0] + '</td> <td>' + item.split(':')[1] + '</td>';
        return (row);
      },
    );
    row += '</tr>';
    excel += row;
  }
  // 设置表头
  let row = '<tr>';
  for (let i = 0, l = ShowLabel.length; i < l; i += 1) {
    row += '<td>' + ShowLabel[i].value + '</td>';
  }
  // 换行
  excel += row + '</tr>';
  // 设置数据
  for (let i = 0; i < arrData.length; i += 1) {
    let row = '<tr>';
    for (const index in arrData[i]) {
      const value = arrData[i][index].value === '.' ? '' : arrData[i][index].value;
      row += '<td>' + value + '</td>';
    }
    excel += row + '</tr>';
  }
  excel += '</table>';
  let excelFile = '<html xmlns:o=\'urn:schemas-microsoft-com:office:office\' xmlns:x=\'urn:schemas-microsoft-com:office:excel\' xmlns=\'http://www.w3.org/TR/REC-html40\'>';
  excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
  excelFile += '<head>';
  excelFile += '<!--[if gte mso 9]>';
  excelFile += '<xml>';
  excelFile += '<x:ExcelWorkbook>';
  excelFile += '<x:ExcelWorksheets>';
  excelFile += '<x:ExcelWorksheet>';
  excelFile += '<x:Name>';
  excelFile += FileName;
  excelFile += '</x:Name>';
  excelFile += '<x:WorksheetOptions>';
  excelFile += '<x:DisplayGridlines/>';
  excelFile += '</x:WorksheetOptions>';
  excelFile += '</x:ExcelWorksheet>';
  excelFile += '</x:ExcelWorksheets>';
  excelFile += '</x:ExcelWorkbook>';
  excelFile += '</xml>';
  excelFile += '<![endif]-->';
  excelFile += '</head>';
  excelFile += '<body>';
  excelFile += excel;
  excelFile += '</body>';
  excelFile += '</html>';
  const uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
  const link = document.createElement('a');
  link.href = uri;
  link.style = 'visibility:hidden';
  link.download = FileName + '.xls';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
Utils.JSONToCsvConvertor = (JSONData, FileName, ShowLabel) => {
  // 先转化json
  const arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
  const str = [];
  const tempstr = [];
  for (let i = 0, l = ShowLabel.length; i < l; i += 1) {
    tempstr.push(ShowLabel[i].value);
  }
  str.push(tempstr.join(',') + '\n');
  for (let i = 0; i < arrData.length; i += 1) {
    const temp = [];
    for (const index in arrData[i]) {
      const value = arrData[i][index].value === '.' ? '' : arrData[i][index].value;
      temp.push(value);
    }
    str.push(temp.join(',') + '\n');
  }
  const url = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str.join('').replace(/˙/g, ''));
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.style = 'visibility:hidden';
  downloadLink.download = FileName + '.csv';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
