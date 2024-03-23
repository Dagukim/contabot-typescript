import StreamData from "../types/api.js";
import { createEmbed } from "../utils/embeds.js";
import { Channel, Client, TextChannel } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

async function sendLiveNoti(client: Client, streamData: StreamData) {
    try {
        const channelId: string = process.env.DISCORD_CHANNEL_ID as string;
        if (!channelId) {
            console.error("CHANNEL_ID environment variable is not set.");
            process.exit(1); // Exit the process if the channel ID isn't set
        }

        const channel = client.channels.cache.get(channelId) as Channel;
        if (!channel) throw new Error("해당하는 채널이 없습니다.");

        if (channel instanceof TextChannel) {
            const embed = createEmbed(streamData);
            await channel.send({ embeds: [embed] });
            console.log("방송시작 알림을 보냈습니다.");
        } else {
            throw new Error("채널이 텍스트채널이 아닙니다.");
        }
    } catch (err) {
        console.error("방송알림을 보내기에 실패하였습니다: ", err);
    }
}

export { sendLiveNoti };

