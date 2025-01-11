import axios from "axios";
import { useRef, useState } from "react";

export function AddFishForm() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [fish, setFish] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [wymiarOd, setWymiarOd] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [wymiarDo, setwymiarDo] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleFishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFish(e.target.value);
    };
    const handleWymiarOd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWymiarOd(parseFloat(e.target.value));
    };
    const handleWymiarDo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setwymiarDo(parseFloat(e.target.value));
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const sendToServer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/addFish");
        } catch (err) {
            console.error("Błąd przesyłania:", err);
        }
    };
    return (
        <form
            onSubmit={sendToServer}
            className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6"
        >
            <h1 className="text-xl font-bold text-gray-700">Nie ma ryby? Dodaj informacje o niej</h1>
            <h2 className="text-l text-gray-500">Gatunek ryby</h2>
            <input
                type="text"
                name="description"
                placeholder="gatuek ryby"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-700 placeholder-gray-400"
                onChange={handleFishChange}
            />
            <h2 className="text-l text-gray-500">Wymiar ochronny w cm (od)</h2>
            <input
                type="number"
                name="description"
                placeholder="wymiar ochronny (od) w cm"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-700 placeholder-gray-400"
                onChange={handleWymiarOd}
            />
            <h2 className="text-l text-gray-500">Wymiar ochronny w cm (do)</h2>
            <input
                type="number"
                name="description"
                placeholder="Wymiar ochronny (do) w cm"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-700 placeholder-gray-400"
                onChange={handleWymiarDo}
            />
            <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="mt-1 block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            />
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Wyślij
            </button>
        </form>
    )
}

