const pdfPath = "./assets/documents/kaisetsu.pdf";
const isWaitingPage = window.location.pathname.endsWith("/waiting.html");
const previewMode = new URLSearchParams(window.location.search).get("preview");

async function routeByPdfAvailability() {
  if (previewMode === "waiting") {
    if (!isWaitingPage) {
      window.location.replace("./waiting.html?preview=waiting");
    }
    return;
  }

  try {
    const response = await fetch(`${pdfPath}?check=${Date.now()}`, {
      method: "HEAD",
      cache: "no-store",
    });

    if (response.ok) {
      window.location.replace("./kaisetsu.html");
      return;
    }
  } catch {
    // 確認できない場合は公開前ページを表示します。
  }

  if (!isWaitingPage) {
    window.location.replace("./waiting.html");
  }
}

routeByPdfAvailability();
