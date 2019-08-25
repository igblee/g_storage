interface SelfStorageInterface {
  ns: string;
  encryption: boolean;
  encryptionType: string;
  screctKey: string;
  setItem(sKey: string, sValue: string): void;
  getItem(sKey: string): string;
  removeItem(sKey: string): void;
  clear(): void;
}
interface CookieInterface {
  ns: string;
  encryption: boolean;
  encryptionType: string;
  screctKey: string;
  setItem(
    sKey: string,
    sValue: string,
    vEnd: any,
    sPath: string,
    sDomain: string,
    bSecure: boolean
  ): boolean;
  getItem(sKey: string): string;
  removeItem(sKey: string, sPath: string, sDomain: string): void;
  hasItem(sKey: string): boolean;
  keys(): Array;
}

interface StorageInterface {
  ns: string;
  encryption: boolean;
  encryptionType: string;
  screctKey: string;
  cookie: CookieInterface;
  localStorage: SelfStorageInterface;
  sessionStorage: SelfStorageInterface;
}
