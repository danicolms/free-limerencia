export default function DownloadButton({download, isLoading = false, hasDownloaded = false}){
    let caption;
    let classes = "download__button";

    if(hasDownloaded) {
        caption = "¡Que lo disfrutes!"
        classes += " download__button--downloaded"
    }

    if(isLoading) {
        caption = "Descargando..."
        classes += " download__button--loading"
    }

    if(!isLoading && !hasDownloaded) {
        caption = "~ Descargar gratis ~"
    }

    return <button className={classes} onClick={download}> {caption} </button>
}