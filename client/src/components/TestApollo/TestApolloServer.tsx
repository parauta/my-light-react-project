import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from "@apollo/client";
import React from "react";

const client = new ApolloClient({
    uri: "http://localhost:4000", // GraphQL Server URL
    cache: new InMemoryCache(),
});

const GET_WEATHER = gql`
  query GetWeather($city: String!) {
    getWeather(city: $city) {
      name
      main {
        temp
        feels_like
        temp_min
        temp_max
        humidity
      }
      weather {
        main
        description
      }
      wind {
        speed
        deg
      }
    }
  }
`;

const Weather: React.FC = () => {
    const { loading, error, data } = useQuery(GET_WEATHER, {
        variables: { city: "London,uk" },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const weather = data.getWeather;

    return (
        <div>
            <h1>Weather in {weather.name}</h1>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Thermal sensation: {weather.main.feels_like}°C</p>
            <p>Description: {weather.weather[0].description}</p>
            <p>Wind speed: {weather.wind.speed} km/h</p>
        </div>
    );
};

const TestApolloServer: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <Weather />
        </ApolloProvider>
    );
};

export default TestApolloServer;
