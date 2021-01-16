const torrentConfig = require("../torrentConfig.json");
const {shuffle} = require("lodash");


class TorrentProvider {

    constructor() {
        this.originalList = [...torrentConfig.torrents];
        this.batchLimit = this.originalList.length/5;
        this.resetState()
    }

    resetState() {
        this.mutableList =shuffle([...this.originalList]);
    }

    getNext() {
        if (this.mutableList.length == 0) this.resetState()
        return this.mutableList.pop();
    }

}

exports.TorrentProvider = TorrentProvider;