import "./post.css";

export function Post({ description, imgPhoto, title, username }: { description: string, imgPhoto: string, title: string, username: string }) {
    return (
        <div className="Post">
            <div className="postPhoto">
                <img src={`${imgPhoto}`} alt={title} loading="lazy" />
            </div>
            <div className="description">
                <h2>{title}</h2>
                {username}:<p>{description}</p>
            </div>
        </div>
    );
}
