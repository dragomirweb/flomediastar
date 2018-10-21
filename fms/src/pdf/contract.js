import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";

export const contract = function(data) {
    var doc = new jsPDF("p", "pt");
    
    doc.fromHTML(data, 15, 15,);
    doc.save(
          "contract.pdf"
      );
};