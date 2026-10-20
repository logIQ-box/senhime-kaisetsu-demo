const pdfPath = "./assets/documents/kaisetsu.pdf";
const isWaitingPage = window.location.pathname.endsWith("/waiting.html");

async function routeByPdfAvailability() {
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
