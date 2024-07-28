import { Events, Interaction } from "discord.js";
import EventInterface from "../event.interface";
import Bot from "../../bot";

class InteractionCreateEvent implements EventInterface {
    public name: string = Events.InteractionCreate;
    public once: boolean = false;
    public execute: Function = async (
        interaction: Interaction
    ): Promise<void> => {
        if (!interaction.isChatInputCommand()) return;

        const command = Bot.getInstance().getCommand(interaction.commandName);

        if (!command) {
            await interaction.reply(
                `No command matching ${interaction.commandName} was found.`
            );
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: "There was an error while executing this command!",
                    ephemeral: true
                });
                return;
            }

            await interaction.reply({
                content: "There was an error while executing this command!",
                ephemeral: true
            });
        }
    };
}

export default InteractionCreateEvent;
