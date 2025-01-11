import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { AddFishMap, MarkerInterface } from "./mapToAdd";

export function FishForm({ username }: { username: string }) {
    const [fishes, setFishes] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [selectedFish, setSelectedFish] = useState<string>("szczupak");
    const [description, setDescription] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [marker, setMarkers] = useState<MarkerInterface>();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/api/api/fish/getFishes");
                setFishes(response.data.map((fish: { name: string }) => {
                    return fish.name;
                }));
                setSelectedFish(response.data[0] || "szczupak");
            } catch (err) {
                setFishes(["szczupak"]);
                setSelectedFish("szczupak");
                console.error("Błąd pobierania listy ryb:", err);
            }
        }
        fetchData();
    }, []);
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
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
        if (!(selectedFish && description && marker?.lng && marker?.lat)) {
            alert("Proszę wypełnić wszystkie dane!")
            throw new Error("One of the attributes undefined");
        }
        else {
            try {
                const data = {
                    fish: selectedFish,
                    description: description,
                    lng: marker.lng,
                    lat: marker.lat,
                    username: username,
                    title: title
                }
                formData.append("file", file);
                formData.append("data", JSON.stringify(data));
                console.log(formData);
                const response = await axios.post("/api/api/posts/sendPost", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setUploadStatus("Plik został przesłany pomyślnie!");
                console.log(response.data);

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                setFile(null);
                setSelectedFish(fishes.length > 0 ? fishes[0] : "szczupak");
            } catch (err) {
                setUploadStatus("Wystąpił błąd podczas przesyłania pliku.");
                console.error("Błąd przesyłania:", err);
            }
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
                <span className="text-gray-700">Tytuł postu</span>
                <input
                    type="text"
                    name="title"
                    placeholder="Wpisz tytuł postu..."
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-700 placeholder-gray-400"
                    onChange={handleTitleChange}
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
            <AddFishMap setMarkers={setMarkers} marker={marker} />
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
