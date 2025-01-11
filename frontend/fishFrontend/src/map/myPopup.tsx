export function MyPopup({ imgStr, desc }: { imgStr: string, desc: string }) {
    return (
        <div className="popup">
            <div className="popup-content">
                <h3>{desc}</h3>
                <img src={imgStr} alt="Popup image" className="popup-image" />
            </div>
        </div>
    );
}
