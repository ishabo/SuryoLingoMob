export interface IApiInstance {
    api: any;
    call: (method: TMethod, url: string, ...args: any[]) => Promise<any>;
    get: (...args: any[]) => Promise<any>;
    post: (...args: any[]) => Promise<any>;
    put: (...args: any[]) => Promise<any>;
}