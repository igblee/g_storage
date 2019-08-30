// tslint:disable-next-line:no-var-requires
const CryptoJS = require('crypto-js');

export class Cookie {
  private ns: string;
  private encryption: boolean;
  private encryptionType: string;
  private screctKey: string;
  constructor(
    ns: string,
    encryption: boolean,
    encryptionType: string,
    screctKey: string
  ) {
    this.ns = ns;
    this.encryption = encryption;
    this.encryptionType = encryptionType;
    this.screctKey = screctKey;
  }
  public getItem(sKey: string): string | null {
    let res: string | null = null;
    if (this.ns.length) {
      sKey = this.ns + '.' + sKey;
    }
    const tVal: string | null =
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            '(?:(?:^|.*;)\\s*' +
              encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') +
              '\\s*\\=\\s*([^;]*).*$)|^.*$'
          ),
          '$1'
        )
      ) || null;
    res = tVal;
    if (res && this.encryption && this.encryptionType) {
      res =
        this.encryptionType === 'des'
          ? CryptoJS.DES.decrypt(res, this.screctKey).toString(
              CryptoJS.enc.Utf8
            )
          : CryptoJS.AES.decrypt(res, this.screctKey).toString(
              CryptoJS.enc.Utf8
            );
    }
    return res;
  }
  public setItem(
    sKey: string,
    sValue: string,
    vEnd: any,
    sPath: string,
    sDomain: string,
    bSecure: boolean
  ): boolean {
    let res: string = null;
    res = sValue;
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    if (this.ns.length) {
      sKey = this.ns + '.' + sKey;
    }
    if (this.encryption && this.encryptionType) {
      res =
        this.encryptionType === 'des'
          ? CryptoJS.DES.encrypt(res, this.screctKey).toString()
          : CryptoJS.AES.encrypt(res, this.screctKey).toString();
    }
    let sExpires: string = '';
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires =
            vEnd === Infinity
              ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
              : '; max-age=' + vEnd;
          break;
        case String:
          sExpires = '; expires=' + vEnd;
          break;
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString();
          break;
      }
    }
    document.cookie =
      encodeURIComponent(sKey) +
      '=' +
      encodeURIComponent(res) +
      sExpires +
      (sDomain ? '; domain=' + sDomain : '') +
      (sPath ? '; path=' + sPath : '') +
      (bSecure ? '; secure' : '');
    return true;
  }
  public removeItem(sKey: string, sPath: string, sDomain: string): boolean {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }
    if (this.ns.length) {
      sKey = this.ns + '.' + sKey;
    }
    document.cookie =
      encodeURIComponent(sKey) +
      '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
      (sDomain ? '; domain=' + sDomain : '') +
      (sPath ? '; path=' + sPath : '');
    return true;
  }
  public hasItem(sKey: string): boolean {
    if (this.ns.length) {
      sKey = this.ns + '.' + sKey;
    }
    return new RegExp(
      '(?:^|;\\s*)' +
        encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') +
        '\\s*\\='
    ).test(document.cookie);
  }
  public keys(): string[] {
    const aKeys: string[] = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
      .split(/\s*(?:\=[^;]*)?;\s*/);
    for (let nIdx: number = 0; nIdx < aKeys.length; nIdx++) {
      let tVal: string = decodeURIComponent(aKeys[nIdx]);
      if (this.ns.length) {
        const idx: number = aKeys[nIdx].indexOf('.');
        tVal = aKeys[nIdx].slice(idx + 1);
      }
      aKeys[nIdx] = tVal;
    }
    return aKeys;
  }
}
