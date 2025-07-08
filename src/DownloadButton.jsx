export default function DownloadButton({download, isLoading}){
    return <button className="download__button" onClick={download}> {isLoading ? "..." : "Descargar gratis"} </button>
}