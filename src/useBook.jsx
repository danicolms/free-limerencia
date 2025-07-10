import { useEffect, useState } from "react"
export function useBook() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloadFinished, setIsDownloadFinished] = useState(false)
  const [bookBlob, setBookBlob] = useState()

  async function delay(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

  async function prefetchBook() {
    function createBlobFromDataURL(dataURL) {
      const [headers, contentInBase64] = dataURL.split(",");

      const mime = headers.match(/:(.*?);/)[1];

      const content = atob(contentInBase64);
      const contentInUint8Array = new Uint8Array(content.length);

      for (let index = 0; index < content.length; index++) {
        contentInUint8Array[index] = content.charCodeAt(index);
      }

      return new Blob([contentInUint8Array], { type: mime });
    }

    await delay(1500)
    // NOTE: The book epub file is hashed
    // in base64 data url format in the /public/xxa78hbsja file.
    const bookDataURL = await fetch("xxa78hbsja");
    setBookBlob(createBlobFromDataURL(await bookDataURL.text()))
  }

  async function download() {
    try {
      setIsDownloading(true)
      await delay(1000)

      const url = window.URL.createObjectURL(bookBlob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "Limerencia.epub";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error)
    } finally {
      setIsDownloading(false)
      setIsDownloadFinished(true)
    }

  }


  useEffect(() => {
    prefetchBook()
  }, [])


  useEffect(() => {
    if (!bookBlob) {
      setIsLoading(true)
      return
    }

    setIsLoading(false)
  }, [bookBlob])


  return {
    download,
    isLoading,
    isDownloading,
    isDownloadFinished
  };
}
