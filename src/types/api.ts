interface StreamData {
    content: {
        liveTitle: string;
        status: string;
        liveImageUrl: string;
        defaultThumbnailImageUrl: string | null;
        liveCategory: string | null;
        channel: {
            channelName: string;
            channelImageUrl: string;
        };
    };
}

export default StreamData;
