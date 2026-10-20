import * as pdfjsLib from "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.3.289/build/pdf.min.mjs";

const pdfPath = "./assets/documents/kaisetsu.pdf";
const workerPath = "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.3.289/build/pdf.worker.min.mjs";
const mainContent = document.querySelector("main");
const pdfPages = document.querySelector("#pdf-pages");

pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;

async function renderPdf() {
  try {
    const loadingTask = pdfjsLib.getDocument({
      url: `${pdfPath}?check=${Date.now()}`,
    });
    const pdf = await loadingTask.promise;
    const contentWidth = Math.min(mainContent.clientWidth, 900);

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 1 });
      const cssScale = contentWidth / baseViewport.width;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const renderViewport = page.getViewport({ scale: cssScale * pixelRatio });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.className = "pdf-page";
      canvas.width = Math.floor(renderViewport.width);
      canvas.height = Math.floor(renderViewport.height);
      canvas.style.width = `${Math.floor(baseViewport.width * cssScale)}px`;
      canvas.setAttribute("role", "img");
      canvas.setAttribute("aria-label", `解説PDF ${pageNumber}ページ目`);

      await page.render({
        canvasContext: context,
        viewport: renderViewport,
      }).promise;

      pdfPages.append(canvas);
    }
  } catch {
    // 描画できない場合は何も表示しません。
  }
}

renderPdf();
