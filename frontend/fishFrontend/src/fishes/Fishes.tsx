import { useEffect, useState } from "react";
import { MyHeader } from "../header/header";
import { FishPost } from "./fishPost";
import { fishInterface } from "./fish.interface";
import axios from "axios";

export function FishesSite() {
    const [fishes, setFishes] = useState<fishInterface[]>([])
    useEffect(() => {
        getAllFishes();
    }, [])

    const getAllFishes = async () => {
        const fishesFromDB = await axios.get("/api/api/fish/getFishes");
        console.log(fishesFromDB.data)
        setFishes(fishesFromDB.data)
    }
    return (
        <div className="fishSite">
            <MyHeader />
            {fishes.map((fish, i) => {
                return <FishPost
                    key={fish.name + i}
                    name={fish.name}
                    wymiarochronny={fish.wymiarochronny}
                    imgpath={fish.imgpath}
                    okresrozpoczeciaochrony={fish.okresrozpoczeciaochrony}
                    okreszakonczeniaochrony={fish.okreszakonczeniaochrony}
                />
            })}

        </div>)
}
