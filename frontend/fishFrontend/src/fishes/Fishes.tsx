import { useState } from "react";
import { MyHeader } from "../header/header";
import { FishPost } from "./fishPost";
import { fish } from "./fish.interface";

export function FishesSite() {
    const [fishes, setFishes] = useState<fish[]>([{ name: "szczupak", wymiarOchronny: 45, okresRozpoczeciaOchrony: new Date("2025-03-01"), okresZakonczeniaOchrony: new Date("2025-04-30") }])
    return (
        <div className="fishSite">
            <MyHeader />
            {fishes.map((fish, i) => {
                return <FishPost
                    key={fish.name + i}
                    name={fish.name}
                    wymiarOchronny={fish.wymiarOchronny}
                    okresRozpoczeciaOchrony={fish.okresRozpoczeciaOchrony}
                    okresZakonczeniaOchrony={fish.okresZakonczeniaOchrony}
                />
            })}

        </div>)
}
