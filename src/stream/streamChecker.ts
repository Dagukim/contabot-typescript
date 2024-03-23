import fetch from "node-fetch";
import { Client } from "discord.js";
import { sendLiveNoti } from "../discord/liveNotification.js";
import StreamData from "../types/api.js";

const CHZZK_API_URL: string = `https://api.chzzk.naver.com/service/v2/channels/${process.env.CHZZK_CHANNEL_ID}/live-detail`;

let streamStatus: boolean = false;

async function checkStreamStatus(client: Client) {
    try {
        const res = await fetch(CHZZK_API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "User-Agent":
                    "Mozilla/5.0 (Platform; Encryption; OS) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/Version Safari/537.36",
            },
        });
        if (!res.ok) throw new Error(`HTTP error status: ${res.status}`);
        const data: StreamData = (await res.json()) as StreamData;

        const isCurrentLive = data.content && data.content.status === "OPEN";
        if (isCurrentLive && !streamStatus) {
            streamStatus = true;
            sendLiveNoti(client, data);
        }
        if (!isCurrentLive && streamStatus) {
            streamStatus = false;
        }
    } catch (err) {
        console.error("스트림 상태를 확인하지 못했습니다: ", err);
    }
}

export { checkStreamStatus };
