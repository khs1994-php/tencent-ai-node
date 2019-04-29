import { error, urlencode } from '../util/util';
// import node_md5 from '../util/node_md5';
// import * as querystring from 'querystring';
import hex_md5 from '../util/md5';
import TencentAIResult from '../TencentAIResult';

// @ts-ignore
import querystring = require('qs');
import errorCode from '../util/errorCode';
import gbk from '../util/gbk.js/index';

export default class Request {
  static request(
    proxy: string,
    url: string,
    appKey: string,
    data: any,
    isGbk: boolean = false,
    method: string = 'post',
  ): Promise<TencentAIResult> {
    // let is_wx = false;
    //
    // if (typeof wx !== 'undefined') {
    //   is_wx = true;
    // }

    let request: any;

    if (typeof fetch === 'function') {
      request = fetch;
    } else {
      try {
        request = require('node-fetch');
      } catch (e) {
        request = require('wx-fetch');
      }
    }

    url = proxy + url;
    method = method.toUpperCase();

    // 按 key 进行字典升序排序,得到有序的参数对列表N
    let sort_list = this.ksort(data);

    // 参数对按 URL 键值对的格式拼接成字符串
    let str = this.handle_gbk(sort_list, isGbk);

    // 追加 app_key
    // MD5运算，将得到的 MD5 值所有字符转换成大写，得到接口请求签名
    let sign = hex_md5(str + `app_key=${appKey}`);

    sign = sign.toUpperCase();

    data['sign'] = sign;

    let body = isGbk ? str + `sign=${sign}` : querystring.stringify(data);

    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    let charset: string;
    return request(url, {
      method,
      headers,
      body,
      charset: isGbk ? 'gbk' : 'utf8',
    })
      .then(res => {
        if (!res.ok) {
          return error('error');
        }

        charset = res.headers
          .get('content-type')
          .split(';')[1]
          .split('=')[1];

        if (charset === 'gbk') {
          return res.arrayBuffer();
        }

        return res.json();
      })
      .then((res: any) => {
        if (charset === 'gbk') {
          // 返回 buffer
          // const iconv = require('iconv-lite');
          // 返回 json
          // res = iconv.decode(res, charset);
          res = gbk.decode(new Uint8Array(res));
          res = JSON.parse(res);
        }

        // 返回 json

        if (res.ret === 0) {
          return res;
        }

        return Promise.reject({
          ret: res.ret,
          msg: errorCode[res.ret] || res.msg || '',
          data: {},
        });
      })
      .catch(e => Promise.reject(e));
  }

  static handle_gbk(sort_list: any, isGbk: boolean = false) {
    let str = '';

    if (!isGbk) {
      // 不是 gbk 进行编码
      sort_list.map(item => {
        if (item.value !== '') {
          // str += `${item.key}=${querystring.escape(item.value)}&`;
          str += `${item.key}=${urlencode(item.value)}&`;
          // str += `${item.key}=${encodeURIComponent(item.value)}&`;
        }
      });
    } else {
      // 是 gbk, 已编码，不再进行编码
      sort_list.map(item => {
        if (item.value !== '') {
          str += `${item.key}=${item.value}&`;
        }
      });
    }

    // str = str.replace(/%20/g, '+');
    // str = str.replace(/!/g, '%21');
    // console.log(str);
    return str;
  }

  static ksort(data: any) {
    let arrayList = [];
    let sort = (a, b) => {
      return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    };

    for (let key in data) {
      arrayList.push({
        key,
        value: data[key],
      });
    }

    return arrayList.sort(sort);
  }
}
