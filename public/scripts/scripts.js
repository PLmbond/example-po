function fallbackToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";  //avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function toClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function () {
    console.log('Async: Copying to clipboard was successful!');
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
}

function arrayToCSV(objArray) {
  console.log('hi');
  objArray = Array.isArray(objArray) ? objArray : typeof objArray == 'string' ? JSON.parse(objArray) : [objArray];
  var array = objArray;
  var str = '';

  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ','

      line += array[i][index];
    }

    str += line + '\r\n';
  }
  console.log(str);
  return str;
}

function arrayToFile(headers, items, fileTitle) {
  var csv = headers.toString() + ',\r\n' + this.arrayToCSV(items);

  var exportedFileName = fileTitle + '.csv' || 'export.csv';

  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, exportedFileName);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function toDownload(toDL, fileName, ext, type) {
  ext = ext || 'csv';
  type = type || 'text/csv;charset=utf-8;';
  var blob = new Blob([toDL], { type: type });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, fileName);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName + '.' + ext);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function downloadRecordCSV(dlRec) {
  var csv = '';
  dlRec = dlRec || getObj('allOfPoRecord').innerHTML;
  var r;
  if (typeof dlRec == 'string') { r = JSON.parse(dlRec) }
  else if (typeof dlRec == 'object' && !dlRec.innerHTML) { r = dlRec }
  else r = (dlRec && dlRec.innerHTML && dlRec.innerHTML !== null && dlRec.innerHTML !== '') ? JSON.parse(dlRec) : false;

  var prevTbl = '';
  if (r && r != false) r.forEach(o => {

    if (o.notes) o.notes = '"' + o.notes + '"';
    if (o.poSupplierID) o.poSupplierID = '"' + o.poSupplierID + '"';

    csv += ((o.table != prevTbl) ? Object.getOwnPropertyNames(o).toString() + ',\r\n' : '') + arrayToCSV(o);
    console.log(csv)
    prevTbl = o.table;

  });
  console.log(r);
  toDownload(csv, 'poID-' + r[0].id, 'csv');
}

function viewInOut(s, b) {

  b = b || getObj('poRecord');
  s = s || false;
  var box = (typeof b === 'object') ? b : (typeof b === 'string') ? getObj(b) : false,
    state = (typeof s !== 'boolean') ? false : s,
    wih = window.innerHeight,
    wiw = window.innerWidth,
    mX = getMouseX(event),
    mY = getMouseY(event),
    bow = box.offsetWidth,
    boh = box.offsetHeight,
    bowf = Math.floor(bow / 2),
    bowc = Math.ceil(bow / 2),
    bohf = Math.floor(boh / 2),
    bohc = Math.ceil(boh / 2),
    px = 'px';

  if (box === false) return console.log('Could not find element passed to viewInOut(). Please pass the element id or object.');

  if (state) {
    box.style.width = 'fit-content';
    box.style.height = 'fit-content';
    box.style.opacity = '1';
    console.log([box])
    // console.log(mX - bowc, mX - bowc < 0);
    // console.log(mY + boh + 25 > wih);

    if (mY + boh + 25 > wih || mX + bow + 25 > wiw) {
      box.style.left = (mX - bow < 0) ? (0 + px) : (mX - bow - 25 + px);
    } else {
      box.style.left = (mX - bowc < 0) ? (0 + px) : (mX - bowc + 25 + px);
    }

    box.style.top = (mY + boh + 25 > wih) ? (wih - boh + px) : (mY - 25 + px);

  } else {
    box.style.width = '0';
    box.style.height = '0';
    box.style.opacity = '0';
  }
}

function handleIconTabs(currTab) {

  var tabs = document.querySelectorAll('.icon-tab');

  tabs.forEach(tab => {
    tab.classList.remove('icon-tab--selected');
  })

  currTab.classList.add('icon-tab--selected');

  var chart = FusionCharts('dataChart_Chart');
  console.log(chart);
  chart.chartType(currTab.id);

}

function gridSetNRows(gridID) {
  gridID = gridID || 'poGrid';
  var x = getObj(gridID);
  var nrows = Math.floor((x.parentElement.offsetHeight - x.pui.properties['header height']) / x.pui.properties['row height']);
  var nheight = nrows * parseInt(x.pui.properties['row height']) + parseInt(x.pui.properties['header height']) + 2;
  x.grid.setNumberOfRows(nrows + 1);
  x.style.height = nheight + 'px';
  x.grid.render();
}