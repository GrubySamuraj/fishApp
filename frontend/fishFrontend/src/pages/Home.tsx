import { MyHeader } from "../header/header";
import { MyLeafletMap } from "../map/functionalMap";
import "./home.css"
export function Home() {
    const getItems = () => {
        return ['Post 1', 'Post 2', 'Post 3'];
    }

    const items = getItems();

    return (
        <div className="homePage">
            <MyHeader />
            <div className="homeMain">
                <MyLeafletMap />
                <div className="Posty">
                    <h2>Nasze posty:</h2>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}