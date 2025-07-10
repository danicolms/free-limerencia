export default function DownloadButton({download, isLoading = false, isDownloadFinished = false}){
    let caption;
    let classes = "download__button";

    if(isDownloadFinished) {

        classes += " download__button--downloaded"
        caption = "¡Que lo disfrutes!"
    }

    if(isLoading) {
        classes += " download__button--loading"
        caption = "Descargando..."
    }

    if(!isLoading && !isDownloadFinished) {
        classes += " download__button--regular"
        caption = "~Descargar gratis~"
    }

    return <button className={classes} onClick={download}> {caption} </button>
}