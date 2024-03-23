import { EmbedBuilder } from "discord.js";
import StreamData from "../types/api.js";

function createEmbed(streamData: StreamData) {
    const chzzkId: string = process.env.CHZZK_CHANNEL_ID as string;
    const youtubeId: string = process.env.YOUTUBE_CHANNEL_ID as string;
    const twitterId = "Mihoming_2021";

    const content = streamData.content;

    const imageUrl = content.defaultThumbnailImageUrl
        ? content.defaultThumbnailImageUrl
        : content.liveImageUrl
          ? content.liveImageUrl.replace("{type}", "360")
          : content.channel.channelImageUrl;

    const fields = [
        { name: "🎮 Category", value: content.liveCategory ? content.liveCategory.replace(/_/g, " ") : "none" },
        {
            name: "⚡ CHZZK",
            value: `[link](https://chzzk.naver.com/live/${chzzkId})`,
            inline: true,
        },
    ];
    if (youtubeId) {
        fields.push({
            name: "🔴 YouTube",
            value: `[link](https://www.youtube.com/${youtubeId}/streams)`,
            inline: true,
        });
    }
    if (twitterId) {
        fields.push({
            name: "✖ Twitter",
            value: `[link](https://twitter.com/${twitterId})`,
            inline: true,
        });
    }

    const embed: EmbedBuilder = new EmbedBuilder()
        .setColor("#7a2015")
        .setAuthor({
            name: content.channel.channelName,
            iconURL: content.channel.channelImageUrl,
        })
        .setTitle(content.liveTitle)
        .addFields(fields)
        .setImage(imageUrl)
        .setTimestamp();

    return embed;
}

export { createEmbed };
