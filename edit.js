
function edit(a, rec, iNew) {

  a = a || pjs.require('a.js');

  pjs.defineDisplay('edit','edit.json');

  while (!iDone) {

    edit.frec.execute();

  }

}

module.exports = edit;