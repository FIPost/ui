export default class Institute {
    public Id: string;
    public Name: string;
    public Addressess: Array<string>;

    constructor(id: string, name: string, addresses: Array<string>){
        this.Id = id;
        this.Name = name;
        this.Addressess = addresses;
    }
}