const CryptoJS = require("crypto-js");

export class LocalStorage implements SelfStorageInterface {
  ns: string;
  encryption: boolean;
  encryptionType: string;
  screctKey: string;
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
  getItem(sKey: string): string {
    let res: string = null;
    if (this.ns.length) {
      sKey = this.ns + "." + sKey;
    }
    const tVal: string = decodeURIComponent(localStorage.getItem(sKey)) || null;
    res = tVal;
    if (this.encryption && this.encryptionType) {
      res = this.encryptionType === 'des' ? CryptoJS.DES.decrypt(tVal, this.screctKey).toString(CryptoJS.enc.Utf8) : CryptoJS.AES.decrypt(tVal, this.screctKey).toString(CryptoJS.enc.Utf8)
    }
    return res;
  }
  setItem(
    sKey: string,
    sValue: string = null,
  ): boolean {
    let res: string = null;
    res = sValue;
    if (!sKey) {
      return false;
    }
    if (this.ns.length) {
      sKey = this.ns + "." + sKey;
    }
    if (this.encryption && this.encryptionType) {
      res = this.encryptionType === 'des' ? CryptoJS.DES.encrypt(res, this.screctKey).toString() : CryptoJS.AES.encrypt(res, this.screctKey).toString()
    }
    localStorage.setItem(sKey, res)
    return true;
  }
  removeItem(sKey: string): boolean {
    if (!sKey) {
      return false;
    }
    if (this.ns.length) {
      sKey = this.ns + "." + sKey;
    }
    localStorage.removeItem(sKey);
    return true;
  }
  clear():void {
    localStorage.clear()
  }
}


export class SessionStorage implements SelfStorageInterface {
  ns: string;
  encryption: boolean;
  encryptionType: string;
  screctKey: string;
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
  getItem(sKey: string): string {
    let res: string = null;
    if (this.ns.length) {
      sKey = this.ns + "." + sKey;
    }
    const tVal: string = decodeURIComponent(sessionStorage.getItem(sKey)) || null;
    res = tVal;
    if (this.encryption && this.encryptionType) {
      res = this.encryptionType === 'des' ? CryptoJS.DES.decrypt(tVal, this.screctKey).toString(CryptoJS.enc.Utf8) : CryptoJS.AES.decrypt(tVal, this.screctKey).toString(CryptoJS.enc.Utf8)
    }
    return res;
  }
  setItem(
    sKey: string,
    sValue: string = null,
  ): boolean {
    let res: string = null;
    res = sValue;
    if (!sKey) {
      return false;
    }
    if (this.ns.length) {
      sKey = this.ns + "." + sKey;
    }
    if (this.encryption && this.encryptionType) {
      res = this.encryptionType === 'des' ? CryptoJS.DES.encrypt(res, this.screctKey).toString() : CryptoJS.AES.encrypt(res, this.screctKey).toString()
    }
    sessionStorage.setItem(sKey, res)
    return true;
  }
  removeItem(sKey: string): boolean {
    if (!sKey) {
      return false;
    }
    if (this.ns.length) {
      sKey = this.ns + "." + sKey;
    }
    sessionStorage.removeItem(sKey);
    return true;
  }
  clear():void {
    sessionStorage.clear()
  }
}