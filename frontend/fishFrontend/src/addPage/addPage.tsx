import { FishForm } from "../form/form";
import { MyHeader } from "../header/header";
import { AddFishForm } from "../form/form2";
import "./addPage.css"
export function AddPage() {
    //dodaj rybę
    //dodaj swoją znalezisko i co myślisz
    return (
        <div>
            <MyHeader />
            <div className="pageContent">
                <div className="form1Containter"><FishForm /></div>
                <div className="form2Containter"><AddFishForm /></div>
            </div>
        </div>
    )
}