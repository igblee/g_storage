// tslint:disable-next-line:no-var-requires
const CryptoJS = require('crypto-js');

export class LocalStorage {
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
    const tVal: string | null = localStorage.getItem(sKey) || null;
    res = tVal;
    if (res && this.encryption && this.encryptionType) {
      res =
        this.encryptionType === 'des'
          ? CryptoJS.DES.decrypt(tVal, this.screctKey).toString(
              CryptoJS.enc.Utf8
            )
          : CryptoJS.AES.decrypt(tVal, this.screctKey).toString(
              CryptoJS.enc.Utf8
            );
    }
    return res;
  }
  public setItem(sKey: string, sValue: string = null): boolean {
    let res: string = null;
    res = sValue;
    if (!sKey) {
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
    localStorage.setItem(sKey, res);
    return true;
  }
  public removeItem(sKey: string): boolean {
    if (!sKey) {
      return false;
    }
    if (this.ns.length) {
      sKey = this.ns + '.' + sKey;
    }
    localStorage.removeItem(sKey);
    return true;
  }
  public clear(): void {
    localStorage.clear();
  }
}

export class SessionStorage {
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
      sessionStorage.getItem(sKey) || null;
    res = tVal;
    if ( res && this.encryption && this.encryptionType) {
      res =
        this.encryptionType === 'des'
          ? CryptoJS.DES.decrypt(tVal, this.screctKey).toString(
              CryptoJS.enc.Utf8
            )
          : CryptoJS.AES.decrypt(tVal, this.screctKey).toString(
              CryptoJS.enc.Utf8
            );
    }
    return res;
  }
  public setItem(sKey: string, sValue: string = null): boolean {
    let res: string = null;
    res = sValue;
    if (!sKey) {
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
    sessionStorage.setItem(sKey, res);
    return true;
  }
  public removeItem(sKey: string): boolean {
    if (!sKey) {
      return false;
    }
    if (this.ns.length) {
      sKey = this.ns + '.' + sKey;
    }
    sessionStorage.removeItem(sKey);
    return true;
  }
  public clear(): void {
    sessionStorage.clear();
  }
}
