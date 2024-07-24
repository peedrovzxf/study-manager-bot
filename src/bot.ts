import { Client, Events, GatewayIntentBits, Partials } from "discord.js";
import Config from "./common/config";
import { readdirSync } from "fs";
import path from "path";

class Bot {
    private client: Client;

    private intents: GatewayIntentBits[];
    private partials: Partials[];

    public constructor(intents: GatewayIntentBits[], partials: Partials[]) {
        this.intents = intents;
        this.partials = partials;
    }

    public start(): void {
        this.client = new Client({
            intents: this.intents,
            partials: this.partials
        });

        this.client.login(Config.getBotToken());
    }
}

export default Bot;
