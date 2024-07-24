import { config } from "dotenv";

class Config {
    public static load(): void {
        config();

        console.log("dotenv (.env) file loaded.");
    }

    public static getBotToken(): string {
        return process.env.TOKEN || "";
    }

    public static getClientId(): string {
        return process.env.CLIENT_ID || "";
    }

    public static getClientSecret(): string {
        return process.env.CLIENT_SECRET || "";
    }
}

export default Config;
