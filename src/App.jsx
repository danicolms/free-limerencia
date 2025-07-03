import logo from '/logo.jpeg'
import './App.css'
import { useEffect, useState } from 'react'

// NOTE: The book epub file is hashed 
// in base64 data url format in the /public/xxa78hbsja file.

let bookBlob; 
async function prefetchBook(){  
  function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const response = await fetch("xxa78hbsja")
  bookBlob = dataURLtoBlob(await response.text())

}

async function downloadBook(){
  const url = window.URL.createObjectURL(bookBlob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = "Limerencia - La lucha por conquistar el amor propio.epub";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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


  useEffect(() => {
    const fetchIPData = async () => {
      try {
        const response = await fetch('https://free.freeipapi.com/api/json');

        if (!response.ok) {
          throw new Error('No hemos podido localizar el país desde donde intentas acceder');
        }

        const {countryCode} = await response.json();

        if(countryCode !== "ES"){
          throw new Error("Esta página está habilitada solo para España")
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIPData();
  }, []);


  if(loading) return <h1> Cargando ... </h1>
  
  if(error) return <h1> {error} </h1>

  return (
    <>
        <a className="logo__link">
          <img src={logo} className="logo__img" alt="Limerencia: La lucha por conquistar el amor propio" />
        </a>

        <p> Viva Venezuela mi patria querida, que liberto mi hermano fue Simon Bolivar</p>

        <button onClick={downloadBook}> Descargar gratis </button>

        <section>
          <a> Me invitas un café? </a>
        </section>
    </>
  )
}

export default App
