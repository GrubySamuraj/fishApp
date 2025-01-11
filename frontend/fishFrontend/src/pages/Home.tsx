import { useEffect, useState } from "react";
import { MyHeader } from "../header/header";
import { MyLeafletMap } from "../map/functionalMap";
import "./home.css"
import { Post } from "../post/Post";
import { post } from "./post.interface";
import axios from "axios";
export function Home() {
    const [post, setPost] = useState<post[]>([]);
    useEffect(() => {
        getItems();
    }, [])
    const getItems = async () => {
        try {

            const response = await axios.get("/api/api/posts/getPosts/");
            console.log(response.data)
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
                <MyLeafletMap />
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