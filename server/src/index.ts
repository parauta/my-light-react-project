import { ApolloServer, gql } from 'apollo-server';
import fetch from 'node-fetch';
import 'dotenv-flow/config';

// Schema GraphQL
const typeDefs = gql`
  type Weather {
    id: Int
    main: String
    description: String
    icon: String
  }

  type Main {
    temp: Float
    feels_like: Float
    temp_min: Float
    temp_max: Float
    pressure: Int
    humidity: Int
  }

  type Wind {
    speed: Float
    deg: Int
  }

  type WeatherData {
    coord: Coordinates
    weather: [Weather]
    main: Main
    wind: Wind
    name: String
    timezone: Int
  }

  type Coordinates {
    lon: Float
    lat: Float
  }

  type Query {
    getWeather(city: String!): WeatherData
  }
`;

const resolvers = {
    Query: {
        getWeather: async (_: any, { city }: { city: string }) => {
            const API_KEY = process.env.OPENWEATHERMAP_KEY;
            if (!API_KEY) {
                throw new Error("API Key not valid. First get a key from OpenWeatherMap. Then add it to the .env file.");
            }

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );

            if (!response.ok) {
                throw new Error("Error when getting data.");
            }

            const data = await response.json();
            return data;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀 Servidor GraphQL running in ${url}`);
});
