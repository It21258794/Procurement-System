declare global {
    namespace NodeJS {
      interface ProcessEnv {
        APP_SECRET: string;
        PORT?: string;
        APP_ACCESS_TOKEN_EXP_SECS: any;
        MONGODB_URI:any
      }
    }
  }

  export {};