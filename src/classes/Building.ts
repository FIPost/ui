import Address from "@/classes/Address";

export default class Building{
    public id: string;
    public name: string;
    public address: Address;

    constructor(id: string, name: string, address: Address){
        this.id = id;
        this.name = name;
        this.address = address;
    }

    static deserialize(data: Object): Building {
        return new Building(
            data["id"],
            data["name"],
            Address.deserialize(data["address"])
        );
    }
}