import { Cookie } from "./util/cookie";
import { LocalStorage, SessionStorage } from './util/storage';

class Storage implements StorageInterface {
  ns: string;
  encryption: boolean;
  encryptionType: string;
  screctKey: string;
  cookie: Cookie;
  localStorage: LocalStorage;
  sessionStorage: SessionStorage;
  constructor(
    ns: string,
    encryption: boolean = false,
    encryptionType: string = "",
    screctKey: string = ""
  ) {
    this.ns = ns;
    this.encryption = encryption;
    this.encryptionType = encryptionType;
    this.screctKey = screctKey;
    this.cookie = new Cookie(ns, encryption, encryptionType, screctKey);
    this.localStorage = new LocalStorage(ns, encryption, encryptionType, screctKey);
    this.sessionStorage = new SessionStorage(ns, encryption, encryptionType, screctKey);
  }
}
