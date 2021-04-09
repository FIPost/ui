export default class Building{
    public Guid: string;
    public Name: string;
    public AddressId: string;

    constructor(id: string, name: string, addressId: string){
        this.Guid = id;
        this.Name = name;
        this.AddressId = addressId;
    }
}