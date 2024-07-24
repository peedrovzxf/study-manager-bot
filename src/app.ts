import { GatewayIntentBits, Partials } from "discord.js";

import Config from "./common/config";
import Bot from "./bot";

Config.load();

const bot = new Bot(
    [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent
    ],
    [Partials.Message, Partials.Channel, Partials.Reaction]
);

bot.start();
