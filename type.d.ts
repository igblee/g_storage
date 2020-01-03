export declare class IStorage {
  constructor(ns: string,
    encryption?: boolean,
    encryptionType?: string,
    screctKey?: string)

  public cookie: ICookie;
  public localStorage: IStorageItem;
  public sessionStorage: IStorageItem;
}

export declare class IStorageItem {
  constructor(
    ns: string,
    encryption: boolean,
    encryptionType: string,
    screctKey: string
  )
  public getItem(sKey: string): string | null
  public setItem(
    sKey: string,
    sValue: string,
    vEnd: any,
    sPath: string,
    sDomain: string,
    bSecure: boolean
  ): boolean
  public removeItem(sKey: string, sPath: string, sDomain: string): boolean
}

export declare class ICookie extends IStorageItem {
  public keys(): string[]
  public hasItem(sKey: string): boolean
}