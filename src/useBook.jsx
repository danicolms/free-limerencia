import {useEffect, useState} from "react"
export function useBook() {
  const [loading, setLoading] = useState(true);
  const [bookBlob, setBookBlob] = useState()
  
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

    // NOTE: The book epub file is hashed
    // in base64 data url format in the /public/xxa78hbsja file.
    const bookDataURL = await fetch("xxa78hbsja");
    setBookBlob(createBlobFromDataURL(await bookDataURL.text()))
  }

  async function downloadBook() {
    console.log(bookBlob);
    const url = window.URL.createObjectURL(bookBlob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "Limerencia.epub";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

    
  useEffect(() => {
    prefetchBook()
  }, [])


  useEffect(() => {
    if(!bookBlob){
      setLoading(true)
      return
    }

    setLoading(false)
  }, [bookBlob])

  return {
    bookBlob,
    downloadBook,
    loading
  };
}
