import jsonp from "./jsonp.js";
import { commonParams, options } from "./config.js";

export function getSongDetail(singerId) {
  const url = "https://u.y.qq.com/cgi-bin/musicu.fcg";

  const data = Object.assign({}, commonParams, {
    "-": "getplaysongvkey5940782283527966",
    data:
      '{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"1353491708","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"1353491708","songmid":["' +
      singerId +
      '"],"songtype":[0],"uin":"362172145","loginflag":1,"platform":"20"}},"comm":{"uin":362172145,"format":"json","ct":24,"cv":0}}',
    page: "list",
    key: "all_all_all",
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    platform: "yqq.json"
  });

  return jsonp(url, data, options);
}

export function getAlbumDetail(albumId) {
  const url = "https://u.y.qq.com/cgi-bin/musicu.fcg";

  const data = Object.assign({}, commonParams, {
    "-": "albumSonglist6453675181080851",
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    platform: "yqq.json",
    data:
      '{"comm":{"ct":24,"cv":10000},"albumSonglist":{"method":"GetAlbumSongList","param":{"albumMid":"' +
      albumId +
      '","albumID":0,"begin":0,"num":10,"order":2},"module":"music.musichallAlbum.AlbumSongList"}}'
  });

  return jsonp(url, data, options);
}
