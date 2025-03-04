import '../index.css';

export const APOD = ({title,urlImage}:{title:string,urlImage:string}) => {
    return (
        <div className="apod-card">
            <div className="apod-info">
                 <h2>Title:{title}</h2>
            </div>
            <div className="apod-image">
                <img src={urlImage} alt={title} />
            </div>
        </div>
    );
}