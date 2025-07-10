import logo from '/logo.jpeg'
import butterfly from '/butterfly.gif'
import { useBook } from './useBook';
import DownloadButton from './DownloadButton';
import './App.css'


function App() {

  const { download: downloadBook, isLoading: isBookLoading, isDownloading: isBookDownloading, isDownloadFinished: isBookDownloadFinished } = useBook()

  if (isBookLoading) return <img className="loader" src={butterfly} alt="Mariposa volando" />

  return (
    <main>
      <a className="logo__link">
        <img src={logo} className="logo__img" alt="Limerencia: La lucha por conquistar el amor propio" />
      </a>

      <p className="description"> Lorem ipsum dolor si amet, du findest adipiscing este, sed do eiusmod tempor incididunt ut labore et dolore message aliqua. Ut escreve-me ad minim a mes veniam, quis nostrud D M S exercitation pra ullamco laboris nisi ut obtain aliquip ex les ea commodo descargables. Duis aute de irure dolor in reprehenderit minhas in voluptate velit esse cillum exclusive dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt Illustrationen in culpa qui officia deserunt mollit anim id est laborum. Muack, bb.</p>
      <DownloadButton download={downloadBook} isLoading={isBookDownloading}  isDownloadFinished={isBookDownloadFinished} />
    </main>
  )
}

export default App
