import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";

export const contract = function(data) {
    var doc = new jsPDF("p", "pt");

    doc.autoTable(
      [[""]],
      [
        ["1. PARTILE CONTRACTANTE"]
      ],
      {
        theme: "plain",
        styles: {
          cellPadding: 0,
          fontSize: 13,
          columnWidth: "auto",
          fontStyle: 'bold',
          overflow: 'linebreak'
        },
        pageBreak: 'auto', // 'auto', 'avoid' or 'always'
        tableWidth: 'auto', // 'auto', 'wrap' or a number, 
        margin: { top: 10, left: 20 },
        showHeader: false,
        tableWidth: 'auto'
      }
    );
    doc.autoTable(
        [[""]],
        [
          ["1. PARTILE CONTRACTANTE"],
          ["Intre :"],
          ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus et molestie ac feugiat sed. Mauris ultrices eros in cursus turpis massa. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Faucibus a pellentesque sit amet porttitor eget. Faucibus pulvinar elementum integer enim. Pharetra et ultrices neque ornare"],
          ["si"],
        ],
        {
          theme: "plain",
          styles: {
            cellPadding: 0,
            fontSize: 12,
            columnWidth: "auto",
            overflow: 'linebreak'
          },
          pageBreak: 'auto', // 'auto', 'avoid' or 'always'
          tableWidth: 'auto', // 'auto', 'wrap' or a number, 
          margin: { left: 20 },
          showHeader: false,
          tableWidth: 'auto'
        }
      );
    doc.save(
          "contract.pdf"
      );
};