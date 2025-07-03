import logo from '/logo.jpeg'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIPData = async () => {
      try {
        const response = await fetch('https://free.freeipapi.com/api/json');
        if (!response.ok) {
          throw new Error('Failed to fetch IP data');
        }
        const data = await response.json();
        const countryCode = data.countryCode

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

        <button> Descargar gratis </button>

        <section>
          <a> Me invitas un café? </a>
        </section>
    </>
  )
}

export default App
