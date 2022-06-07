import Building from "@/location/depricated/Building";

export interface RoomRequest {
    name: string;
    buildingId: string;
}

export default class Room {
    public id: string;
    public name: string;
    public building: Building;

    constructor(id: string, name: string, building: Building) {
        this.id = id;
        this.name = name;
        this.building = building;
    }

    static deserialize(data: Object): Room {
        return new Room(
            data["id"],
            data["name"],
            Building.deserialize(data["building"])
        );
    }

    public getLocationString(): string {
        return `${this.building.address.city.name}, ${this.building.name}, ${this.name}`;
    }
}