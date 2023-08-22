const NodeMediaServer = require("node-media-server");

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    mediaroot: "./media",
    allow_origin: "*",
  },
  trans: {
    ffmpeg: "C:/Program Files/ffmpeg/bin/ffmpeg.exe",
    tasks: [
      {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=4: hls_playlist_type=event]", // hls_playlist_type=event <= 재생목록 유지 :omit_endlist hls_flags=delete_segments
        hlsKeep: false, // to prevent hls file delete after end the stream
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
        dashKeep: false, // to prevent dash file delete after end the stream
      },
    ],
  },
};

var nms = new NodeMediaServer(config);
nms.run();
