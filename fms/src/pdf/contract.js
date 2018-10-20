import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";

export const contract = function(data) {
    var doc = new jsPDF("p", "pt");


    doc.save(
          "contract.pdf"
      );
};