import { fishInterface } from "./fish.interface";

export function FishPost({ name, wymiarochronny, okresrozpoczeciaochrony, okreszakonczeniaochrony, imgpath }: fishInterface) {
    const checkDate = () => {
        const now = Date.now();
        return now >= new Date(okresrozpoczeciaochrony).getTime() && now <= new Date(okreszakonczeniaochrony).getTime();
    };

    return (
        <div className="fishPost bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mb-10 mt-10">
            <h2 className="font-bold text-gray-800 text-2xl text-center mb-4">{name}</h2>
            <div className="text-gray-600">
                <div className="mb-4">
                    <h3 className="font-semibold text-lg text-gray-700">Wymiar ochronny:</h3>
                    <p className="text-sm">{wymiarochronny} cm</p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold text-lg text-gray-700">Okres ochrony:</h3>
                    <p className="text-sm">
                        Od: {new Date(okresrozpoczeciaochrony).toLocaleDateString()} <br />
                        Do: {new Date(okreszakonczeniaochrony).toLocaleDateString()}
                    </p>
                </div>
                <img src={`http://localhost:3000${imgpath}`} alt="Ryba" />
                <div className="mb-4">
                    <h3 className="font-semibold text-lg text-gray-700">Czy można teraz łowić?</h3>
                    <p className={checkDate() ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>
                        {checkDate() ? 'nie' : 'tak'}
                    </p>
                </div>
            </div>
        </div>
    );
}
