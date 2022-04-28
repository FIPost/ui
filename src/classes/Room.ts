import Building from "@/classes/Building";
import City from "@/classes/City";
import Address from "@/classes/Address";

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

class RoomHelper {
    getLocationString(room: Room): string {
        return room ? `${room.building.address.city.name}, ${room.building.name}, ${room.name}` : "er ging iets mis";
    }

    getEmptyRoom(): Room {
        return new Room("", "", new Building("", "", new Address(new City("", ""), "", "", 0, "")));
    }
}
export const roomHelper = new RoomHelper();