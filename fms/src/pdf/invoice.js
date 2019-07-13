import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";

export const pdf = function(data) {
  var doc = new jsPDF("p", "pt");

  let baseNum = num => {
    return parseFloat(num).toFixed(2);
  };

  var productColumns = [
    "Denumirea produselor sau a serviciilor",
    "U.M.",
    "Pretul Unitar",
    "Cantitatea",
    "Valoarea"
  ];
  var productRows = [];
  var inv = data.factura;
  // doc.setFontSize(18);
  // doc.text(inv.factura, 5, this.indent);
  // console.log(inv)
  inv.produse.forEach(el => {
    var um = el.unitate;
    if (um == "") {
      um = "buc";
    }
    productRows.push([el.descriere, um, 'RON ' + el.pret, el.cantitatea, 'RON ' + el.valoarea]);
  });
  doc.autoTable([[""]], [["FACTURA"]], {
    theme: "plain",
    styles: {
      cellPadding: 10,
      fontSize: 20,
      halign: "center",
      valign: "center"
    },
    margin: { top: 5 },
    showHeader: false
  });
  doc.autoTable(
    [[""]],
    [
      ["Seria:  FMI"],
      ["Furnizor:  SC FLO MEDIA STAR SRL"],
      ["Nr. R.C /Aut.:  J40/ 14517/15.12.2014"],
      ["C.I.F:  RO33900793"],
      ["Cap. Soc:  200 RON"],
      ["Sediul:  Str. Buhusi Nr. 63, Bucuresti Sector 3"],
      ["Cont:  RO29BTRLRONCRT0280854002"],
      ["Banca:  Transilvania"]
    ],
    {
      theme: "plain",
      styles: {
        cellPadding: 0,
        fontSize: 8,
      },
      margin: { top: 70 },
      showHeader: false,
      tableWidth: 300
    }
  );
  doc.autoTable(
    [[""]],
    [
      ["SC FLO MEDIA STAR SRL"],
    ],
    {
      theme: "plain",
      styles: {
        cellPadding: 1,
        fontSize: 12,
      },
      margin: { left: 400, top: 80 },
      showHeader: false,
      tableWidth: 300
    }
  );
  doc.autoTable(
    [[""]],
    [
      ["Firma:  " + inv.firma.toUpperCase()],
      ["Nr. Reg. Com.:  " + inv.nrRegCom],
      ["C.I.F.:  " + inv.cif],
      ["Sediul:  " + inv.sediul],
      ["Cont bancar:  " + inv.contBancar],
      ["Banca:  " + inv.banca],
      ["Sucursala:  " + inv.sucursala]
    ],
    {
      theme: "plain",
      styles: {
        cellPadding: 0
      },
      margin: { top: 198 },
      showHeader: false,
      tableWidth: 250
    }
  );
  doc.autoTable(
    [[""]],
    [
      ["Factura Nr:  " + inv.factura.split("-").pop()],
      ["Data:  " + moment(inv.data).format("D-M-YYYY")],
      ["Total:  " + baseNum(inv.totalFactura)]
    ],
    {
      theme: "striped",
      styles: {
        cellPadding: 1,
        halign: "left",
        columnWidth: "auto"
      },
      margin: { top: 250, left: 405 },
      showHeader: false,
      tableWidth: 150
    }
  );
  doc.autoTable(productColumns, productRows, {
    styles: {  },
    columnStyles: {
      id: { fillColor: 255 }
    },
    headerStyles: {
      cellPadding: 3,
      fillColor: [40,40,40]
    },
    margin: { top: 350 }
  });
  doc.autoTable(
    [[""]],
    [
      ["TVA 19%:          " + 'RON ' + inv.totalFacturaTva.toFixed(2)],
      ["Total:                 " + 'RON ' + inv.totalFactura.toFixed(2)],
      ["Platit:                 RON 0,00"],
      ["Total + TVA:      " + 'RON ' + inv.totalFacturaPlusTva.toFixed(2)]
    ],
    {
      theme: "striped",
      styles: {
        cellPadding: 1,
        fontSize: 10
      },
      margin: { left: 380, top: 550 },
      showHeader: false,
      tableWidth: 175
    }
  );
  doc.save(
    inv.factura.toUpperCase() +
      "-" +
      moment(inv.data).format("D-M-YYYY") +
      ".pdf"
  );
};

export const chitanta = function(data) {
  var doc = new jsPDF("p", "pt");
  var inv = data.factura;
  var invNumber = inv.factura.match(/\d+/g).map(Number);
  var bani = inv.totalFacturaPlusTva.toFixed(2).toString().split(".");
  var invBani = '';

  var a = ['','o ','doua ','trei ','patru ', 'cinci ','sase ','sapte ','opt ','noua ','zece ','unsprezece ','doisprezece ','treisprezece ','paisprezece ','cincisprezece ','saisprezece ','saptesprezece ','optsprezece ','nouasprezece '];
  var b = ['', '', 'douazeci','treizeci','patruzeci','cincizeci', 'saizeci','saptezeci','optzeci','nouazeci'];
  var toLitere = function (num) {
    var n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'suta ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'mii ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'sute ' : '';
    str += (n[5] != 0) ? ((str != '') ? '' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
    return str;
  };
  var invLitere = toLitere(inv.totalFacturaPlusTva.toFixed(2).toString().split('.')[0]);
  
  if (bani[1] != '00'){
    invBani = 'lei si ' + toLitere(bani[1]) + 'bani ';
  }
  doc.autoTable([[""]], [["Chitanta"]], {
    theme: "plain",
    styles: {
      cellPadding: 10,
      fontSize: 20,
      halign: "center",
      valign: "center"
    },
    margin: { top: 5 },
    showHeader: false
  });
  doc.autoTable(
    [[""]],
    [
      ["Seria:  FMO"],
      ["Furnizor:  SC FLO MEDIA STAR SRL"],
      ["Nr. R.C /Aut.:  J40/ 14517/15.12.2014"],
      ["C.I.F:  RO33900793"],
      ["Cap. Soc:  200 RON"],
      ["Sediul:  Str. Buhusi Nr. 63, Bucuresti Sector 3"],
      ["Cont:  RO29BTRLRONCRT0280854002"],
      ["Banca:  Transilvania"]
    ],
    {
      theme: "plain",
      styles: {
        cellPadding: 1,
        fontSize: 10,
      },
      margin: { top: 70 },
      showHeader: false,
      tableWidth: 300
    }
  );
  doc.autoTable(
    [[""]],
    [
      ["Chitanta Nr:  " + invNumber],
      ["Data:  " + moment(inv.data).format("D-M-YYYY")]
    ],
    {
      theme: "plain",
      styles: {
        cellPadding: 1,
        fontSize: 10,
        halign: "left",
        columnWidth: "auto"
      },
      margin: { top: 95, left: 445 },
      showHeader: false,
      tableWidth: 150
    }
  );
  doc.autoTable(["Am primit de la:", "Reprezentant:", "Suma:"], 
  [
    [
      inv.firma, 
      "C.V. " + inv.factura + '/' + moment(inv.data).format("D-M-YYYY"),
      inv.totalFacturaPlusTva.toFixed(2) + ' (' + invLitere + invBani + ')'
    ],
    // ["Nr.Reg.Com: " + inv.nrRegCom, "",""],
    // ["C.U.I: " + inv.cif,"",""]
  ], {
    styles: { 
      fontSize: 10,
      overflow: 'linebreak'
     },
     headerStyles: {
      cellPadding: 3,
      fillColor: [40,40,40]
    },
    columnStyles: {
      id: { fillColor: 255 }
    },
    margin: { top: 220 },
  });
  doc.setFontSize(12)
  doc.text('Casier,', 40, 300);
  doc.setFontSize(12)
  doc.text('SARGHE ANA FLORINA', 40, 312);

  doc.autoTable([[""]], [["Chitanta"]], {
    theme: "plain",
    styles: {
      cellPadding: 10,
      fontSize: 20,
      halign: "center",
      valign: "center"
    },
    margin: { top: 350 },
    showHeader: false
  });
  doc.autoTable(
    [[""]],
    [
      ["Seria:  FMO"],
      ["Furnizor:  SC FLO MEDIA STAR SRL"],
      ["Nr. R.C /Aut.:  J40/ 14517/15.12.2014"],
      ["C.I.F:  RO33900793"],
      ["Cap. Soc:  200 RON"],
      ["Sediul:  Str. Buhusi Nr. 63, Bucuresti Sector 3"],
      ["Cont:  RO29BTRLRONCRT0280854002"],
      ["Banca:  Transilvania"]
    ],
    {
      theme: "plain",
      styles: {
        cellPadding: 1,
        fontSize: 10,
      },
      margin: { top: 440 },
      showHeader: false,
      tableWidth: 300
    }
  );
  doc.autoTable(
    [[""]],
    [
      ["Chitanta Nr:  " + invNumber],
      ["Data:  " + moment(inv.data).format("D-M-YYYY")]
    ],
    {
      theme: "plain",
      styles: {
        cellPadding: 1,
        fontSize: 10,
        halign: "left",
        columnWidth: "auto"
      },
      margin: { top: 445, left: 445 },
      showHeader: false,
      tableWidth: 150
    }
  );
  doc.autoTable(["Am primit de la:", "Reprezentant:", "Suma:"], 
  [
    [
      inv.firma, 
      "C.V. " + inv.factura + '/' + moment(inv.data).format("D-M-YYYY"),
      inv.totalFacturaPlusTva.toFixed(2) + ' (' + invLitere + invBani + ')'
    ],
    // ["Nr.Reg.Com: " + inv.nrRegCom, "",""],
    // ["C.U.I: " + inv.cif,"",""]
  ], {
    styles: { 
      fontSize: 10,
      overflow: 'linebreak'
     },
     headerStyles: {
      cellPadding: 3,
      fillColor: [40,40,40]
    },
    columnStyles: {
      id: { fillColor: 255 }
    },
    margin: { top: 595 },
  });
  doc.setFontSize(12)
  doc.text('Casier,', 40, 680);
  doc.setFontSize(12)
  doc.text('SARGHE ANA FLORINA', 40, 692);
  doc.save(
    "Chitanta-" + invNumber + 
      "-" +
      moment(inv.data).format("D-M-YYYY") +
      ".pdf"
  );
};

export const pdfSituations = function(data) {
  var doc = new jsPDF("p", "pt");
  var data = data.situatielucrari;
  var productColumns = [
    "Nr Crt",
    "Operatiune",
    "UM",
    "Cantitate",
    "Pret unitar [RON]",
    "Total [RON]"
  ];
  var productRows = [];
  data.produse.forEach((el, index) => {
    var totalPrice = el.cantitatea * el.pret;
    productRows.push([(index + 1).toString(), el.denumire, el.um , el.cantitatea.toString(), el.pret.toString(), totalPrice.toString()]);
  });
  doc.autoTable([[""]], [[data.situatie]], {
    theme: "plain",
    styles: {
      cellPadding: 10,
      fontSize: 20,
      halign: "center",
      valign: "center",
      textColor: [255,0,0]
    },
    margin: { top: 20 },
    showHeader: false
  });
  doc.autoTable([[""]], [[data.beneficiar]], {
    theme: "plain",
    styles: {
      cellPadding: 10,
      fontSize: 16,
      halign: "center",
      valign: "center"
    },
    margin: { top: 57 },
    showHeader: false
  });
  doc.autoTable(productColumns, productRows, {
    styles: {
      halign: "center"
    },
    headerStyles: {
      fillColor: [40,40,40]
    },
    columnStyles: {
      id: { fillColor: 220 }
    },
    margin: { top: 170 }
  });
  doc.autoTable(["Total cantitate", "Total pret"], [[data.totalCantitate, data.totalPret]], {
    theme: "grid",
    styles: {
      cellPadding: 3,
      halign: "center",
      columnWidth: "auto"
    },
    headerStyles: {
      fillColor: [40,40,40]
    },
    margin: { top: 600, left: 300 }
  });
  doc.autoTable(["Executant,", "Beneficiar,"], [[".........................................", "........................................."]], {
    theme: "striped",
    styles: {
      cellPadding: 10,
      halign: "center"
    },
    headerStyles: {
      cellPadding: 3,
      fillColor: [40,40,40]
    },
    margin: { top: 650, }
  });
  var regex = /(\ )|\./g;
  doc.save(
    data.situatie.replace(regex, '-') +
    ".pdf"
  );
};