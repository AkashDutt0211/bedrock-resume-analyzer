import PDFParser from "pdf2json";

export function extractText(filePath) {

  return new Promise((resolve, reject) => {

    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", err => reject(err));

    pdfParser.on("pdfParser_dataReady", pdfData => {

      let text = "";

      pdfData.Pages.forEach(page => {
        page.Texts.forEach(t => {
          t.R.forEach(r => {

            let decoded;

            try {
              decoded = decodeURIComponent(r.T);
            } catch {
              decoded = r.T;
            }

            text += decoded + " ";
          });
        });
      });

      resolve(text);

    });

    pdfParser.loadPDF(filePath);

  });

}