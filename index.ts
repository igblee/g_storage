import { Cookie } from './src/cookie';
import { LocalStorage, SessionStorage } from './src/storage';
import { IStorage, IStorageItem, ICookie } from './type.d';

class NSStorage implements IStorage {
  public cookie: ICookie;
  public localStorage: IStorageItem;
  public sessionStorage: IStorageItem;
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

module.exports = NSStorage;
