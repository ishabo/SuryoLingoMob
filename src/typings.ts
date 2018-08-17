interface IDictionary<T extends number | string> {
  [k: string]: T;
}

interface IIndex<T extends number | string> {
  [k: number]: T;
}

declare interface ObjectConstructor {
  values(target: any, ...sources: any[]): any;
}

type TLangs = string | 'cl-ara' | 'cl-syr' | 'tur-syr';
