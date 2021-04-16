import Address from "@/classes/Address";

export default class BuildingRequest {
    public Name: string;
    public Address: Address;

    constructor(name: string, address: Address){
        this.Name = name;
        this.Address = address;
    }
}