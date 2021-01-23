
const { torrentProviderHost, torrentProviderPort } = require("../config.json");

const baseUrl = `${torrentProviderHost}:${torrentProviderPort}`;
const fetch = require('node-fetch');

const getMagnet = hash => `magnet:?xt=urn:btih:${hash}`;


class TorrentFetcher {
    constructor() {
    }

    async getTorrentsAndSeeder(hash) {
        return new Promise((res, err) => {
            fetch(`${baseUrl}/api/torrents?torrent=${getMagnet(hash.toLowerCase())}`,
            {
                method : 'post',
                body: JSON.stringify({torrent: getMagnet(hash.toLowerCase())}),
                headers: { 'Content-Type': 'application/json' }
            })          
            .then(data => res(data.json()))
            .catch(error => err(error));
        });
    }
}

exports.TorrentFetcher = TorrentFetcher;