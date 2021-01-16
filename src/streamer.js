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
        this.init();
    }

    async init() {
        const torrent = await this.torrentFetcher.getTorrentsAndSeeder(this.torrentProvider.getNext().hash);
        console.log(torrent)
        this.publishVideo("http://backend.seta.fun:3000/play?torrent=2D115F34CB0FC4FD211A172B95FB513145BE7F69&file=Los%20Simpsons%20Audio%20Latino%20Temp%201%20By%20The%20PerzBlazer%2F1x01%20Especial%20de%20Navidad.mp4", "stream")
    }

    publishVideo(filePath, destinationFile) {
        ffmpeg.run(`-re -i ${filePath} -c copy -f flv rtmp://localhost:1935/${destinationFile}`).then(data => console.log(data)).catch(console.error)
    }
}

exports.Streamer = Streamer;