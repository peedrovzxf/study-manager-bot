import { Client, GatewayIntentBits, Partials } from "discord.js";
import Config from "./common/config";
import ClientReadyEvent from "./events/impl/client.ready";
import EventInterface from "./events/event.interface";

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

        this.registerEvent(new ClientReadyEvent());

        this.client.login(Config.getBotToken());
    }

    private registerEvent(event: EventInterface): void {
        if (event.once) {
            this.client.once(event.name, (...args) => event.execute(...args));
            return;
        }

        this.client.on(event.name, (...args) => event.execute(...args));
    }
}

export default Bot;
