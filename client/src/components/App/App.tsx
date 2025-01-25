import TestApolloServer from "../TestApollo/TestApolloServer";
import "./App.css";

function App(): JSX.Element {

    const weatherApiKey = import.meta.env.VITE_OPENWEATHERMAP_KEY;
    if (!weatherApiKey) {
        return (
            <>
                <h1>Please add a key to the .env file</h1>

                <a href="https://home.openweathermap.org/api_keys" target="_blank" rel="noreferrer">
                    First get a key from OpenWeatherMap. Then add it to the .env file. <br />
                    e.g.: OPENWEATHERMAP_KEY=<i>your_key_here</i>
                </a>
            </>
        );
    }

    return (
        <>
            <TestApolloServer />
        </>
    );
}

export default App;
