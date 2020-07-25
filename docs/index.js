

(function() {

    const getCurrentTimeStr = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        return `${hours}:${minutes}:${seconds}`;
    }

    const saveToFile = (comments, filename) => {
        const blob = new Blob([comments], {type: "application/json"});
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;

        const clickHandler = () => {
            setTimeout(() => {
                URL.revokeObjectURL(blobUrl);
                this.removeEventListener('click', clickHandler);
            }, 150);
        };

        a.addEventListener('click', clickHandler, false);
        a.click();
    };

    const messageElem = document.getElementById("progress-message");
    const progressEventHandler = (turn, status, commentsLength) => {
        let messageStr = "[" + getCurrentTimeStr() + "] ";
        if(status == 200) {
            messageStr += `${commentsLength} chats downloaded so far.`;
        }
        else if(status == 429) {
            messageStr += "429 Too many requests. Retrying in 1 seconds.";
        }
        else {
            messageStr += `Response code ${status} error.`;
        }
        messageElem.textContent = messageStr;
    };

    const button = document.getElementById("download-button");
    button.addEventListener("click", async () => {
        const textElem = document.getElementById("video-id-input");
        const videoId = textElem.value; 

        const comments = await chatdownloader.download(videoId, progressEventHandler);
        
        // Download comments file
        saveToFile(comments, "chat_" + videoId + ".json");
    });
}());