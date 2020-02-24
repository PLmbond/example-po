var a = {

  iAm: function (i) {
    i = i || this.value || this;
    if (this.iNull(i)) return 'null';
    else if (this.iArray(i)) return 'array';
    else if (this.iObject(i)) return 'object';
    else if (typeof i !== 'number') return typeof i;
    else if (this.iNaN(i)) return 'NaN';
    else return 'number';
  },

  iNull: function (i) {
    return i === null;
  },

  iObject: function (i) {
    return typeof i === 'object' && this.iNull(i);
  },

  iArray: function (i) {
    return Array.isArray(i);
  },

  iNaN: function (i) {
    return Number.isNaN(i);
  },

  iColNam: function (tbl) {
    tbl = tbl || 'po_table';
    return pjs.query("SELECT COLUMN_NAME AS `nam` FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'" + tbl + "'");
  },

  iGetTbl: function (tbl) {
    tbl = tbl || 'po_table';
    return pjs.query('Select * From ' + tbl);
  },

  iQuery: function (opt) {
    var s = opt.select || '*';
    var t = opt.table || 'po_table ';
    where = opt.where || '';
    var w = (where !== '') ? ' WHERE ' + where : where;
    var d = opt.direction || 'ASC'
    orderBy = opt.orderBy || '';
    var o = ' ORDER BY ' + ((orderBy !== '') ? '`' + orderBy + '` ' + d + ',' : orderBy) + ((t != 'po_suppliers') ? ' `id` ' + d : ' `rrn` ' + d);
    var l = opt.limit || '';
    return pjs.query('SELECT ' + s + ' FROM ' + t + w + o + l);
  },
  
  iSearch: function () {

  },

  iInsert: function (rec, tbl) {
    tbl = tbl || 'po_table';
    var cols = this.iColNam(tbl);
    // console.log(cols);
    var temp = {};

    cols.forEach(col => {
      if (rec[col.nam]) temp[col.nam] = rec[col.nam];
    })
    // console.log('INSERT INTO ' + tbl + ' SET ?', [temp]);
    pjs.query('INSERT INTO ' + tbl + ' SET ?', [temp]);
    return this.iGetTbl(tbl);
  },

  iUpdate: function (rec, tbl) {
    tbl = tbl || 'po_table';
    pjs.query('UPDATE po_details SET ? WHERE id = ?', [rec, id]);
    return this.iGetTbl(tbl);
  },

  iDelete: function (rec, tbl) {
    tbl = tbl || 'po_table';
    // console.log('DELETE FROM ' + tbl + ' WHERE id = ' + rec.id);
    pjs.query('DELETE FROM ' + tbl + ' WHERE id = ' + rec.id);
    return this.iGetTbl(tbl);
  },

  iDownload: function (rec) {
    // console.log(rec);
    rec = rec || -1;
    // console.log(rec);
    var allRecsOfPO = [];
    this.tableNames.forEach(tbl => {
      let r = this.iQuery({ table: tbl, where: 'id = ' + rec.id, });
      r.forEach(r => { r.table = tbl })
      allRecsOfPO.push(...r);
    });

    return JSON.stringify(allRecsOfPO);
  },

  iCategory: function (opt) {
    opt = opt || {};
    var chart = {}
    var hdrs = Object.getOwnPropertyNames(opt);

    hdrs.forEach(h => {
      let isArray = Array.isArray(chart[h]);
      chart[h] = opt[h];
    })

  },

  iDataSet: function (opt) {
    opt = opt || {};

  },

  iData: function (opt) {
    opt = opt || {};
    var tmp = {};
    tmp.table = opt.tbl || 'po_table';
    tmp.orderBy = opt.oby || 'order_total';
    tmp.direction = opt.odr || 'DESC'
    var recs = opt.recs || this.iQuery(tmp);
    // console.log(recs);
    var sups = this.iGetTbl('po_suppliers');
    // console.log(sups);
    var data = [];

    if (opt.dataSet) {
      if (opt.series) { }

    }


    if (opt.categories) { }

    recs.forEach(rec => {
      let val = rec[opt.value] || rec.order_total;
      let lbl = rec[opt.label] || (sups[rec.supplier_id] && sups[rec.supplier_id].po_supplier) ? sups[rec.supplier_id].po_supplier : 'No Label';
      let temp = {};

      temp.value = val;
      temp.label = lbl;

      data.push(temp);
    })

    return data.slice(0, 10);
  },

  iChart: function (opt) {
    var chartJson = {};

    chartJson.chart = {};
    chartJson.data = opt.dataset || opt.data;

    if (opt.chart) {

      opt.chart.forEach(option => {
        chartJson.chart[option.property] = option.value;
      });

    } else {
      chartJson.chart.caption = 'No caption provided.';
      chartJson.chart.subCaption = 'No subCaption provided.';
      chartJson.chart.showHoverEffect = '1';
      chartJson.chart.theme = 'zune';
    }

    return JSON.stringify(chartJson);
  },

  testData: {
    "chart": {
      "caption": "Split of Visitors by Age Group",
      "subCaption": "Last year",
      "use3DLighting": "0",
      "showPercentValues": "1",
      "decimals": "1",
      "useDataPlotColorForLabels": "1",
      "theme": "fusion"
    },
    "data": [
      {
        "label": "Teenage",
        "value": "1250400"
      },
      {
        "label": "Adult",
        "value": "1463300"
      },
      {
        "label": "Mid-age",
        "value": "1050700"
      },
      {
        "label": "Senior",
        "value": "491000"
      }
    ]
  }
};

module.exports = a;