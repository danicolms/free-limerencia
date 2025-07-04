import logo from '/logo.jpeg'
import './App.css'
import { useEffect, useState } from 'react'
import { useBook } from './useBook';
import { useCountryWhitelist } from './useCountryWhitelist';


function App() {

  const {loading: isBookLoading, bookBlob, downloadBook} = useBook()
  const {loading: isCountryWhitelistLoading, error: countryWhitelistError} = useCountryWhitelist()

  if(isBookLoading || isCountryWhitelistLoading) return <h1> Cargando ... </h1>
  if(countryWhitelistError) return <h3> {countryWhitelistError} </h3>

  return (
    <>
        <a className="logo__link">
          <img src={logo} className="logo__img" alt="Limerencia: La lucha por conquistar el amor propio" />
        </a>

        <p> Te regalo mi libro porque soy muy pana</p>

        <button onClick={downloadBook}> Descargar gratis </button>

        <section>
          <a> Me invitas un café? </a>
        </section>
    </>
  )
}

export default App
