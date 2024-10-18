declare namespace NodeJS {
  interface ProcessEnv {
    HOST: number;
    PORT: number;
    USERDB: string;
    PASSWORD: string;
    DATABASE: string;
    JWT_SECRET: string;
    BCRYPT_JUMPS: number;
    API_PORT: number;
  }
}

declare namespace Express {
  interface Request {
    idUser: number;
    username: string;
  }
}
