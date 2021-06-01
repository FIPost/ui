import Building from "./Building";

export default class Room {
    public id: string;
    public name: string;
    public building: Building;

    constructor(id: string, name: string, building: Building){
        this.id = id;
        this.name = name;
        this.building = building;
    }
}

class RoomHelper {
  getLocationString(room: Room): string {
    return `${room.building.address.city.name}, ${room.building.name}, ${room.name}`;
  }
}
export const roomHelper = new RoomHelper();