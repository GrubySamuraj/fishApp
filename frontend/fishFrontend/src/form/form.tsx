import { useEffect, useState, useRef } from "react";
import { role } from "../enums/roles";
import axios from "axios";

export function FishForm() {
    const [fishes, setFishes] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [selectedFish, setSelectedFish] = useState<string>("szczupak");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [description, setDescription] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const user = {
        username: "wedkarz1",
        role: role.USER,
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/api/getFishes");
                setFishes(response.data);
                setSelectedFish(response.data[0] || "szczupak");
            } catch (err) {
                setFishes(["szczupak"]);
                setSelectedFish("szczupak");
                console.error("Błąd pobierania listy ryb:", err);
            }
        }
        fetchData();
    }, []);

    const handleselectedFishChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFish(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }
    const sendToServer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert("Wybierz plik przed wysłaniem!");
            return;
        }

        const formData = new FormData();
        console.log(file);
        console.log(selectedFish);
        formData.append("file", file);
        formData.append("fish", selectedFish);

        try {
            const response = await axios.post("/api/sendData", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setUploadStatus("Plik został przesłany pomyślnie!");
            console.log(response.data);

            // Resetowanie inputa
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            setFile(null);
            setSelectedFish(fishes.length > 0 ? fishes[0] : "szczupak");
        } catch (err) {
            setUploadStatus("Wystąpił błąd podczas przesyłania pliku.");
            console.error("Błąd przesyłania:", err);
        }
    };

    return (
        <form
            onSubmit={sendToServer}
            encType="multipart/form-data"
            className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6"
        >
            <h1 className="text-xl font-bold text-gray-700">Prześlij zdjęcie ryby</h1>
            <label className="block">
                <span className="text-gray-700">Gatunek ryby:</span>
                <select
                    id="fishes"
                    value={selectedFish}
                    onChange={handleselectedFishChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-700"
                >
                    {fishes.length > 0 ? (
                        fishes.map((fish) => (
                            <option value={fish} key={fish}>
                                {fish}
                            </option>
                        ))
                    ) : (
                        <option disabled>Brak dostępnych ryb</option>
                    )}
                </select>
                <span className="text-gray-700">Opis podczas połowu</span>
                <input
                    type="text"
                    name="description"
                    placeholder="Wpisz tekst..."
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-700 placeholder-gray-400"
                    onChange={handleDescriptionChange}
                />

            </label>
            <label className="block">
                <span className="text-gray-700">Zdjęcie:</span>
                <input
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="mt-1 block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                />
            </label>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Wyślij
            </button>
            {uploadStatus && (
                <p
                    className={`text-center font-semibold ${uploadStatus.includes("pomyślnie")
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                >
                    {uploadStatus}
                </p>
            )}
        </form>
    );
}
