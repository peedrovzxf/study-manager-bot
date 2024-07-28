import { Events } from "discord.js";
import EventInterface from "../event.interface";

class ClientReadyEvent implements EventInterface {
    public name: string = Events.ClientReady;
    public once: boolean = true;

    public execute: Function = (): void => {
        console.log(`Study manager bot was turned on, be happy with it!`);
    };
}

export default ClientReadyEvent;
