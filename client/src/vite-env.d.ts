/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_OPENWEATHERMAP_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}