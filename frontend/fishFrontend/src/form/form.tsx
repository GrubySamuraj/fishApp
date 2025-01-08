import { useEffect, useState, useRef } from "react";
import { role } from "../enums/roles";
import axios from 'axios';

export function FishForm() {
    const [fishes, setFishes] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [selectedFish, setSelectedFish] = useState<string>("szczupak");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const user = {
        username: "wedkarz1",
        role: role.USER
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/api/getFishes");
                const data = response.data;
                console.log('Lista ryb:', response.data);
                setFishes(response.data);
                setSelectedFish(response.data[0] || "szczupak");
            } catch (err) {
                setFishes(["szczupak"]);
                setSelectedFish("szczupak");
                console.error('Błąd pobierania listy ryb:', err);
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
    }

    const sendToServer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert("Wybierz plik przed wysłaniem!");
            return;
        }

        const formData = new FormData();
        console.log(file)
        console.log(selectedFish)
        formData.append('file', file);
        formData.append('fish', selectedFish);

        try {
            const response = await axios.post('/api/sendData', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadStatus('Plik został przesłany pomyślnie!');
            console.log(response.data);

            // Resetowanie inputa
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setFile(null);
            setSelectedFish(fishes.length > 0 ? fishes[0] : 'szczupak');
        } catch (err) {
            setUploadStatus('Wystąpił błąd podczas przesyłania pliku.');
            console.error('Błąd przesyłania:', err);
        }
    }

    return (
        <form onSubmit={sendToServer} encType="multipart/form-data">
            <label>
                Gatunek ryby:
                <select id="fishes" value={selectedFish} onChange={handleselectedFishChange}>
                    {fishes.length > 0 ? (
                        fishes.map((fish) => (
                            <option value={fish} key={fish}>{fish}</option>
                        ))
                    ) : (
                        <option disabled>Brak dostępnych ryb</option>
                    )}
                </select>
            </label>
            <label>
                <input
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
            </label>
            <button type="submit">Wyślij</button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </form>
    );
}
