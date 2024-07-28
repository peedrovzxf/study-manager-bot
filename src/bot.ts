import {
    Client,
    Collection,
    GatewayIntentBits,
    Partials,
    REST,
    Routes
} from "discord.js";
import Config from "./common/config";
import ClientReadyEvent from "./events/impl/client.ready";
import EventInterface from "./events/event.interface";
import CommandInterface from "./commands/command.interface";
import PingCommand from "./commands/impl/ping.command";
import { string } from "yup";
import InteractionCreateEvent from "./events/impl/interaction.create";

class Bot {
    private static instance: Bot;

    private client: Client;

    private intents: GatewayIntentBits[];
    private partials: Partials[];

    private commands: Collection<string, CommandInterface>;

    public constructor(intents: GatewayIntentBits[], partials: Partials[]) {
        this.intents = intents;
        this.partials = partials;
        Bot.instance = this;
    }

    public start(): void {
        this.client = new Client({
            intents: this.intents,
            partials: this.partials
        });

        this.registerEvent(new ClientReadyEvent());
        this.registerEvent(new InteractionCreateEvent());

        this.commands = new Collection();

        this.registerCommand(new PingCommand());

        this.reloadNativeCommands();

        this.client.login(Config.getBotToken());
    }

    private registerEvent(event: EventInterface): void {
        if (event.once) {
            this.client.once(event.name, (...args) => event.execute(...args));
            return;
        }

        this.client.on(event.name, (...args) => event.execute(...args));
    }

    private registerCommand(command: CommandInterface): void {
        this.commands.set(command.commandData.name, command);
    }

    private async reloadNativeCommands() {
        const rest = new REST().setToken(Config.getBotToken());

        try {
            console.log(
                `Started refreshing ${this.commands.size} application (/) commands.`
            );

            await rest.put(
                Routes.applicationGuildCommands(
                    Config.getClientId(),
                    Config.getGuildId()
                ),
                {
                    body: this.commands.map((command: CommandInterface) => {
                        return command.commandData.toJSON();
                    })
                }
            );

            console.log(
                `Successfully reloaded ${this.commands.size} application (/) commands.`
            );
        } catch (error) {
            console.error(error);
        }
    }

    public getCommand(commandName: string): CommandInterface | undefined {
        return this.commands.get(commandName);
    }

    public static getInstance(): Bot {
        return Bot.instance;
    }
}

export default Bot;
