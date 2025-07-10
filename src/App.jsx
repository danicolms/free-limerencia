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

      <p className="description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
      <DownloadButton download={downloadBook} isLoading={isBookDownloading}  isDownloadFinished={isBookDownloadFinished} />
    </main>
  )
}

export default App
