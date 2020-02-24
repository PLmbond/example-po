var a = pjs.require('a.js');
var x = pjs.require('x.js');
var iAm = a.iAm;

function app() {

  pjs.defineDisplay('app', 'app.json');
  a.tableNames = ['po_details', 'po_status', 'po_table'];
  console.log('Started: ', new Date);
  poAllOfRecord = '';

  // Main program loop. 
  while (!iExit) {

    a.records = a.iGetTbl();
    a.suppliers = a.iGetTbl('po_suppliers');
    a.statuses = [0, '1 - New', '2 - Submitted', '3 - Approved', '4 - Closed', '5 - Canceled'];
    a.statusIcons = [0, 'material:fiber_new', 'material:publish', 'material:thumb_up', 'material:done_all', 'material:cancel'];
    a.records.forEach(r => {

      if (a.suppliers[r.supplier_id]) r.supplier_id = a.suppliers[r.supplier_id].po_supplier;
      if (a.statusIcons[r.status_id]) r.status_icon = a.statusIcons[r.status_id];
      if (r.payment_amount) r.payment_amount = (r.status_id == 5) ? r.payment_amount *= -1 : r.payment_amount
      r.editable = 1;
      r.iEdit = 0;
      r.iDelete = 0;
      r.iDownload = 0;
      r.canceled = (r.status_id == 5) ? 1 : 0;
      if (a.statusIcons[r.status_id]) r.poStatusText = a.statuses[r.status_id];

    });

    // console.log(iChartJson);
    app.sfrec.replaceRecords(a.records);

    var chartJson = {
      chart: [{
        property: 'caption',
        value: 'Top Ten Suppliers'
      }, {
        property: 'theme',
        value: 'zune'
      }],
      data: a.iData(a)
    };

    iChartJson = JSON.stringify(a.iChart(chartJson));
    poRecords = JSON.stringify(a.records);
    // console.log(poRecords,new Date);
    // console.log(iChartJson,new Date);

    // Display screen.
    app.frec.execute();

    if (iSearch) {
      app.wrec.execute();
      if (poShowAll);
      if (poShowByCriteria);
    }
    // If the user submitted a new record to insert into table.
    var changed = app.sfrec.readChanged();
    // console.log(changed);

    // if (changed && changed.iAdd == true) a.iInsert(changed);

    if (changed && changed.iDelete == true) a.iDelete(changed);

    if (changed && changed.iEdit == true) edit(changed);

    if (changed && changed.iDownload == true) poAllOfRecord = a.iDownload(changed);
    else poAllOfRecord = '';

    console.log('Looped: ', new Date);

  }
  console.log('Exited: ', new Date);
}

module.exports.run = app;