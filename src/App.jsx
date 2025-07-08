import logo from '/logo.jpeg'
import butterfly from '/butterfly.gif'
import { useBook } from './useBook';
import { useCountryWhitelist } from './useCountryWhitelist';
import DownloadButton from './DownloadButton';
import './App.css'


function App() {

  const { downloadBook, isLoading: isBookLoading, isDownloading: isBookDownloading } = useBook()
  const { isLoading: isCountryWhitelistLoading, error: countryWhitelistError } = useCountryWhitelist()

  if (isBookLoading || isCountryWhitelistLoading) return <img className="loader" src={butterfly} alt="Butterfly flapping it's wings" />
  if (countryWhitelistError) return <h3> {countryWhitelistError} </h3>

  return (
    <>
      <a className="logo__link">
        <img src={logo} className="logo__img" alt="Limerencia: La lucha por conquistar el amor propio" />
      </a>

      <p> Te regalo mi libro porque soy muy pana</p>


      <DownloadButton isLoading={isBookDownloading} download={downloadBook} />
{/*       <section>
        <a> Me invitas un café? </a>
      </section> */}
    </>
  )
}

export default App
