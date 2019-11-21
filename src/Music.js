import { ERR_OK } from "./api/config.js";
import { getAlbumDetail, getSingDetail } from "./api/album.js";

class Album {
  constructor(albumId) {
    this.id = albumId;
    this.songUrlList = [];
    this.coverImage =
      "http://y.gtimg.cn/music/photo_new/T002R300x300M000" +
      this.id +
      "_1.jpg?max_age=2592000";
    this.name = "";
    this.singerName = "";
    this.getInfor(albumId);
  }
  getInfor(albumId) {
    getAlbumDetail(albumId).then(res => {
      if (res.code === ERR_OK) {
        let songInforList = res.albumSonglist.data.songList;
        this.name = songInforList ? songInforList[0].songInfo.album.name : "";
        this.singerName = songInforList
          ? songInforList[0].songInfo.singer[0].name
          : "";
        songInforList.map(song => {
          let id = song.songInfo.mid,
            name = song.songInfo.name;
          getSingDetail(id).then(res => {
            this.songUrlList.push({
              name: name,
              url:
                "http://ws.stream.qqmusic.qq.com/" +
                res.req_0.data.midurlinfo[0].purl
            });
          });
        });
      }
    });
  }
}
const album = new Album("003yQidc3s7P65");
