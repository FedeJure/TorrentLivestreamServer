const {TorrentProvider} = require("./torrentProvider")
const {TorrentFetcher} = require("./torrentFetcher")
const {shuffle} = require("lodash");

const ffmpeg = require("ffmpeg-cli");

const cleanUrl = (path, url) => {
    const extension = path.slice(path.length - 4, path.length);
    return url.split(extension)[0].concat(extension);
}

class Streamer {
    constructor(nms, name) {
        this.nms = nms;
        this.name = name;
        this.torrentProvider = new TorrentProvider();
        this.torrentFetcher = new TorrentFetcher();

        nms.on('donePublish', (id, StreamPath, args) => {
            console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
            this.startNewStream();  
        });
    }

    async init() {
        this.torrentFetcher.getTorrentsAndSeeder(this.torrentProvider.getNext().hash)
        .then(torrentData => {
            this.publishVideo(shuffle(torrentData.files.filter(f => f.type.includes("video")))[0].stream, this.name)
        })
    }

    startNewStream() {
        this.init();
    }

    publishVideo(filePath, destinationFile) {
        ffmpeg.run(`-re -i ${filePath} -c copy -f flv rtmp://localhost:1935/stream/${destinationFile}`).then(data => console.log(data)).catch(console.error)
    }
}

exports.Streamer = Streamer;