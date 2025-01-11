import { useEffect, useState } from "react";
import { MyHeader } from "../header/header";
import { fishMarker, MyLeafletMap } from "../map/functionalMap";
import "./home.css"
import { Post } from "../post/Post";
import { post } from "./post.interface";
import axios from "axios";
export interface returnedData {
    description: string;
    lat: string;
    lng: string;
    name: string;
    photoURL: string;
    photopath: string;
    title: string;
    username: string;
}
export function Home() {
    const [post, setPost] = useState<post[]>([]);
    const [markers, setMarkers] = useState<fishMarker[]>([]);
    useEffect(() => {
        getItems();
    }, [])
    const getItems = async () => {
        try {
            const response = await axios.get("/api/api/posts/getPosts");
            const data: returnedData[] = response.data;
            console.log(response.data)
            const markersToSave: fishMarker[] = data.map((row) => {
                return {
                    position: [parseFloat(row.lat), parseFloat(row.lng)] as L.LatLngExpression,
                    img: row.photoURL,
                    desc: row.description
                }
            });
            setMarkers(markersToSave)
            setPost(response.data)
        } catch (err) {
            console.error(err)
            alert(err)
        }
    }

    return (
        <div className="homePage">
            <MyHeader />
            <div className="homeMain">
                <MyLeafletMap markers={markers} />
                <div className="Posty">
                    <h2>Nasze posty:</h2>
                    <ul>
                        {post.length > 0 ? post.map((item, index) => (
                            <Post imgPhoto={item.photoURL} username={item.username} description={item.description} title={item.title} key={"post" + index} />
                        )) : null}
                    </ul>
                </div>
            </div>
        </div>
    );
}