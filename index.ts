import { Cookie } from './lib/cookie';
import { LocalStorage, SessionStorage } from './lib/storage';

export default class Storage {
  public cookie: Cookie;
  public localStorage: LocalStorage;
  public sessionStorage: SessionStorage;
  private ns: string;
  private encryption: boolean;
  private encryptionType: string;
  private screctKey: string;
  constructor(
    ns: string,
    encryption: boolean = false,
    encryptionType: string = '',
    screctKey: string = ''
  ) {
    this.ns = ns;
    this.encryption = encryption;
    this.encryptionType = encryptionType;
    this.screctKey = screctKey;
    this.cookie = new Cookie(ns, encryption, encryptionType, screctKey);
    this.localStorage = new LocalStorage(
      ns,
      encryption,
      encryptionType,
      screctKey
    );
    this.sessionStorage = new SessionStorage(
      ns,
      encryption,
      encryptionType,
      screctKey
    );
  }
}
