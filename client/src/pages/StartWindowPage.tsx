export default function StartWindowPage(): React.JSX.Element {
    return (
        <div className="flex flex-col h-screen w-screen bg-gray-950 gap-5 p-6 md:flex-row">
            {/* Image Section */}
            <div className="flex flex-col flex-1 shrink-0 items-center justify-center bg-gray-900 rounded-2xl">
                <img src="/umbrella_appicon.svg" alt="Umbrella" className="h-48 w-48 object-contain" />
            </div>

            {/* Text Section */}
            <div className="flex flex-col flex-1 shrink-0 text-center justify-center items-center gap-8">
                <img src="/umbrella_appicon.svg" alt="Umbrella" className="h-14 w-14 object-contain" />

                <div>
                    <h1 className="text-4xl font-bold text-white">Should I Bring an Umbrella?</h1>
                    <p className="mt-2 text-lg text-gray-400">Weather App</p>
                </div>

                <button className="px-6 py-3 bg-sibu-primary-color text-white font-semibold rounded-full shadow-lg cursor-pointer hover:bg-sibu-highlight-color">
                    Get started
                </button>
            </div>
        </div>
    );
}