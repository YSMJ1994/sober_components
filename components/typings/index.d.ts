/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: "development" | "production" | "test";
		readonly CRU_PUBLIC_URL: string;
	}
}

declare global {
	
}
