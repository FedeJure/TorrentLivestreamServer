var express = require('express');
const fs = require("fs");
const {Streamer} = require("./src/streamer")
const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};

var nms = new NodeMediaServer(config)
nms.run();

const channel1 = new Streamer(nms, "channel01");
const channel2 = new Streamer(nms, "channel02");
const channel3 = new Streamer(nms, "channel03");
const channel4 = new Streamer(nms, "channel04");

setTimeout(() => {
  channel1.startNewStream();
  channel2.startNewStream();
  channel3.startNewStream();
  channel4.startNewStream();
},500);