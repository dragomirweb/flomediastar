import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";

export const pdf = function(data) {
  var doc = new jsPDF("p", "pt");
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
    productRows.push([el.descriere, um, 'RON ' + el.pret.toFixed(2), el.cantitatea, 'RON ' + el.valoarea.toFixed(2)]);
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
      ["Seria : FMO"],
      ["Furnizor : SC FLO MEDIA STAR SRL"],
      ["Nr. R.C /Aut. : J40/ 14517/15.12.2014"],
      ["C.I.F : 33900793"],
      ["Cap. Soc : 200 RON"],
      ["Sediul : Str. Buhusi Nr. 63, Bucuresti Sector 3"],
      ["Cont : RO29BTRLRONCRT0280854002"],
      ["Banca : Transilvania"]
    ],
    {
      theme: "plain",
      styles: {
        cellPadding: 1,
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
      ["Firma: " + inv.firma.toUpperCase()],
      ["Nr. Reg. Com. :" + inv.nrRegCom],
      ["C.I.F. :" + inv.cif],
      ["Sediul :" + inv.sediul],
      ["Cont bancar :" + inv.contBancar],
      ["Banca :" + inv.banca],
      ["Sucursala :" + inv.sucursala]
    ],
    {
      theme: "plain",
      styles: {
        cellPadding: 1
      },
      margin: { top: 198 },
      showHeader: false,
      tableWidth: 250
    }
  );
  doc.autoTable(
    [[""]],
    [
      ["Factura Nr : " + inv.factura.split("-").pop()],
      ["Data : " + moment(inv.data).format("D-M-YYYY")],
      ["Total : " + inv.totalFactura]
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
    styles: { fillColor: [0, 0, 0] },
    columnStyles: {
      id: { fillColor: 255 }
    },
    margin: { top: 350 }
  });
  doc.autoTable(
    [[""]],
    [
      ["TVA 19%:  " + 'RON ' + inv.totalFacturaTva],
      ["Total:  " + inv.totalFactura],
      ["Platit:  RON 0,00"],
      ["Total + TVA:  " + 'RON ' + inv.totalFacturaPlusTva]
    ],
    {
      theme: "striped",
      styles: {
        cellPadding: 1,
        fontSize: 10
      },
      margin: { left: 405, top: 550 },
      showHeader: false,
      tableWidth: 150
    }
  );
  doc.save(
    inv.factura.toUpperCase() +
      "-" +
      moment(inv.data).format("D-M-YYYY") +
      ".pdf"
  );
};
