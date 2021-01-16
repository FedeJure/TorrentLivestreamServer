const {TorrentProvider} = require("./torrentProvider")
const {TorrentFetcher} = require("./torrentFetcher")
const {shuffle} = require("lodash");

const ffmpeg = require("ffmpeg-cli");

const cleanUrl = (path, url) => {
    const extension = path.slice(path.length - 4, path.length);
    return url.split(extension)[0].concat(extension);
}

class Streamer {
    constructor(nms) {
        this.nms = nms;
        this.torrentProvider = new TorrentProvider();
        this.torrentFetcher = new TorrentFetcher();
    }

    async init() {
        this.torrentFetcher.getTorrentsAndSeeder(this.torrentProvider.getNext().hash)
        .then(torrentData => {
            this.publishVideo(shuffle(torrentData.files)[0].stream, "stream/stream")
        })
    }

    startNewStream() {
        this.init();
    }

    publishVideo(filePath, destinationFile) {
        ffmpeg.run(`-re -i ${filePath} -c copy -f flv rtmp://localhost:1935/${destinationFile}`).then(data => console.log(data)).catch(console.error)
    }
}

exports.Streamer = Streamer;