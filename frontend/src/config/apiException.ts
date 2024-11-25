export class ApiException extends Error{
    filter(arg0: (categoria: any) => boolean): import("react").SetStateAction<any[]> {
      throw new Error('ERROR: Method not implemented.');
    }
    public readonly message: string;

    constructor(msg: string){
        super()
        this.message = msg
    }
}