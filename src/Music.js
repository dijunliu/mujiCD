import { ERR_OK } from "./api/config.js";
import { getAlbumDetail, getSingDetail } from "./api/album.js";

const albumIdList = [
  { name: "Anchor", url: "004HqfCZ23fMjq" },
  { name: "认了吧", url: "003yQidc3s7P65" }
];

export class Album {
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

export class AlbumList {
  constructor(albumIdList) {
    this.list = [];
    this.currenAlbumId = 0;
    this.mapIdList(albumIdList);
  }
  mapIdList(albumIdList) {
    albumIdList.map(albumId => {
      this.addAlbum(new Album(albumId.url));
    });
  }
  addAlbum(Album) {
    this.list.push(Album);
  }
}

export const albumList = new AlbumList(albumIdList);
