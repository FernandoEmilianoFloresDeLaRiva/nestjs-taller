export interface TokenRepositoryI {
    sign(payload : any) : Promise<string>;
    decode(token : string): Promise<any>;
}