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

    public static getGuildId(): string {
        return process.env.GUILD_ID || "";
    }
}

export default Config;
