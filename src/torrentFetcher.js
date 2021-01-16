
const baseUrl = "http://backend.seta.fun:3000/";
const fetch = require('node-fetch');


class TorrentFetcher {
    constructor() {
    }

    async getTorrentsAndSeeder(hash) {
        return await fetch(`${baseUrl}/api/torrents/${hash.toLocaleLowerCase()}`);
    }
}

exports.TorrentFetcher = TorrentFetcher;