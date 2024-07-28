import { SlashCommandBuilder } from "discord.js";

interface CommandInterface {
    commandData: SlashCommandBuilder;
    execute: Function;
}

export default CommandInterface;
