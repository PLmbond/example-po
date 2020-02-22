
function x () {
  this.iAm = function (i) {
    i = i || this.value || this;
    if (i === null) return 'null';
    else if (Array.isArray (i)) return 'array';
    else if (typeof i === 'object') return 'object';
    else if (typeof i !== 'number') return typeof i;
    else if (Number.isNaN (i)) return 'NaN';
    else return 'number';
  };

  this.iNull = function (i) {
    return i === null;
  };
e
  this.iObject = function (i) {
    return typeof i === 'object' && this.iNull (i);
  };

  this.iArray = function (i) {
    return Array.isArray (i);
  };

  this.iNaN = function (i) {
    return Number.isNaN (i);
  };

  this.iColNam = function (tbl) {
    tbl = tbl || 'po_table';
    return pjs.query (
      "SELECT COLUMN_NAME AS `nam` FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'" +
        tbl +
        "'"
    );
  };

  this.iGetTbl = function (tbl) {
    tbl = tbl || 'po_table';
    return pjs.query ('Select * From ' + tbl);
  };

  this.iQuery = function (opt) {
    var s = opt.select || '*';
    var t = opt.table || 'po_table ';
    where = opt.where || '';
    var w = where !== '' ? ' WHERE ' + where : where;
    var d = opt.direction || 'ASC';
    orderBy = opt.orderBy || '';
    var o =
      ' ORDER BY ' +
      (orderBy !== '' ? '`' + orderBy + '` ' + d + ',' : orderBy) +
      (t != 'po_suppliers' ? ' `id` ' + d : ' `rrn` ' + d);
    var l = opt.limit || '';
    return pjs.query ('SELECT ' + s + ' FROM ' + t + w + o + l);
  };

  this.iInsert = function (rec, tbl) {
    tbl = tbl || 'po_table';
    var cols = this.iColNam (tbl);
    // console.log(cols);
    var temp = {};

    cols.forEach (col => {
      if (rec[col.nam]) temp[col.nam] = rec[col.nam];
    });
    // console.log('INSERT INTO ' + tbl + ' SET ?', [temp]);
    pjs.query ('INSERT INTO ' + tbl + ' SET ?', [temp]);
    return this.iGetTbl (tbl);
  };

  this.iUpdate = function (rec, tbl) {
    tbl = tbl || 'po_table';
    pjs.query ('UPDATE po_details SET ? WHERE id = ?', [rec, id]);
    return this.iGetTbl (tbl);
  };

  this.iDelete = function (rec, tbl) {
    tbl = tbl || 'po_table';
    // console.log('DELETE FROM ' + tbl + ' WHERE id = ' + rec.id);
    pjs.query ('DELETE FROM ' + tbl + ' WHERE id = ' + rec.id);
    return this.iGetTbl (tbl);
  };

  this.iDownload = function (rec) {
    // console.log(rec);
    rec = rec || -1;
    // console.log(rec);
    var allRecsOfPO = [];
    this.tableNames.forEach (tbl => {
      let r = this.iQuery ({table: tbl, where: 'id = ' + rec.id});
      r.forEach (r => {
        r.table = tbl;
      });
      allRecsOfPO.push (...r);
    });

    return JSON.stringify (allRecsOfPO);
  };

  this.iCategory = function (opt) {
    opt = opt || {};
    var chart = {};
    var hdrs = Object.getOwnPropertyNames (opt);

    hdrs.forEach (h => {
      let isArray = Array.isArray (chart[h]);
      chart[h] = opt[h];
    });
  };

  this.iDataSet = function (opt) {
    opt = opt || {};
  };

  this.iData = function (opt) {
    opt = opt || {};
    var tmp = {};
    tmp.table = opt.tbl || 'po_table';
    tmp.orderBy = opt.oby || 'order_total';
    tmp.direction = opt.odr || 'DESC';
    var recs = opt.recs || this.iQuery (tmp);
    // console.log(recs);
    var sups = this.iGetTbl ('po_suppliers');
    // console.log(sups);
    var data = [];

    if (opt.dataSet) {
      if (opt.series) {
      }
    }

    if (opt.categories) {
    }

    recs.forEach (rec => {
      let val = rec[opt.value] || rec.order_total;
      let lbl = rec[opt.label] ||
        (sups[rec.supplier_id] && sups[rec.supplier_id].po_supplier)
        ? sups[rec.supplier_id].po_supplier
        : 'No Label';
      let temp = {};

      temp.value = val;
      temp.label = lbl;

      data.push (temp);
    });

    return data.slice (0, 10);
  };

  this.iChart = function (opt) {
    var chartJson = {};

    chartJson.chart = {};
    chartJson.data = opt.dataset || opt.data;

    if (opt.chart) {
      opt.chart.forEach (option => {
        chartJson.chart[option.property] = option.value;
      });
    } else {
      chartJson.chart.caption = 'No caption provided.';
      chartJson.chart.subCaption = 'No subCaption provided.';
      chartJson.chart.showHoverEffect = '1';
      chartJson.chart.theme = 'zune';
    }

    return JSON.stringify (chartJson);
  };
}

module.exports = x;
