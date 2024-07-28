import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import CommandInterface from "../command.interface";

class PingCommand implements CommandInterface {
    public commandData: SlashCommandBuilder = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!");
    public execute: Function = async (
        interaction: CommandInteraction
    ): Promise<void> => {
        await interaction.reply("Pong!");
    };
}

export default PingCommand;
