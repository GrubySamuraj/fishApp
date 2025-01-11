import { fish } from "./fish.interface";

export function FishPost({ name, wymiarOchronny, okresRozpoczeciaOchrony, okresZakonczeniaOchrony }: fish) {
    const checkDate = () => {
        const now = Date.now();
        return now >= okresRozpoczeciaOchrony.getTime() && now <= okresZakonczeniaOchrony.getTime();
    };

    return (
        <div className="fishPost bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
            <h2 className="font-bold text-gray-800 text-2xl text-center mb-4">{name}</h2>
            <div className="text-gray-600">
                <div className="mb-4">
                    <h3 className="font-semibold text-lg text-gray-700">Wymiar ochronny:</h3>
                    <p className="text-sm">{wymiarOchronny} cm</p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold text-lg text-gray-700">Okres ochrony:</h3>
                    <p className="text-sm">
                        Od: {okresRozpoczeciaOchrony.toLocaleDateString()} <br />
                        Do: {okresZakonczeniaOchrony.toLocaleDateString()}
                    </p>
                </div>
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
