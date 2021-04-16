import Address from "./Address";

export default class Building{
    public Guid: string;
    public Name: string;
    public Address: Address;

    constructor(id: string, name: string, address: Address){
        this.Guid = id;
        this.Name = name;
        this.Address = address;
    }
}