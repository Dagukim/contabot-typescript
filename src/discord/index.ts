import { Client, Events, GatewayIntentBits } from "discord.js";
import { healthCheck } from "../health/healthCheck.js";
import { checkStreamStatus } from "../stream/streamChecker.js";
import { handleGuildMemberAdd } from "./memberHandler.js";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.DISCORD_TOKEN as string;

const client: Client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent],
});

client.once(Events.ClientReady, () => {
    console.log("Discord bot is ready!");
    checkStreamStatus(client);
    setInterval(() => checkStreamStatus(client), 10000);
});

if (process.env.ROLE_NAME as string) {
    client.on(Events.GuildMemberAdd, handleGuildMemberAdd);
}

client.login(token);

healthCheck.listen(3000);

