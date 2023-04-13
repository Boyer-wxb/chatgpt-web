/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_GLOB_API_URL: string;
	readonly VITE_GLOB_API_TIMEOUT: string;
	readonly VITE_APP_API_BASE_URL: string;
	readonly VITE_KC_BASE_URL: string;
	readonly VITE_KC_REALM: string;
	readonly VITE_KC_CLIENT_ID: string;
}
