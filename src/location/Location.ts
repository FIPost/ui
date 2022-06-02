export class Location {
    id: string;
    name: string;
    city: string;
    street: string;
    house: string;
    postalCode: string;

    constructor(id: string, name: string, city: string, street: string, house: string, postalCode: string){
        this.id = id;
        this.name = name;
        this.city = city;
        this.street = street;
        this.house = house;
        this.postalCode = postalCode;
    }

    static deserialize(data: Object) : Location {
        return new Location(
            data["id"],
            data["name"],
            data["city"],
            data["street"],
            data["house"],
            data["postalCode"]
        );
    }
}