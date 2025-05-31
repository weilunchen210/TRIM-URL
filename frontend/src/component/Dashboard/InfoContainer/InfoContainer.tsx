import "./InfoContainer.css"

interface InfoContainerProps{
    imageLink:string;
    infoHeader:string;
    infoContent:string;
    backgroundColor:string;
}

function InfoContainer({imageLink,infoHeader,infoContent,backgroundColor}:InfoContainerProps){

    return(
        <div className="container info-container">
            <div className="info-icon" style={{backgroundColor: backgroundColor}}>
                <img src={imageLink}>
                </img>
            </div>
            <h2 className="info-header">{infoHeader}</h2>
            <p className="info-content">{infoContent}</p>
        </div>
    )
}

export default InfoContainer