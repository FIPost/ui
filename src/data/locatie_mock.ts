import Room from "@/classes/Room";
import City from "@/classes/City";
import Building from "@/classes/Building";
import Address from "@/classes/Address";

const city = new City("", "")
const address = new Address(city, "", "", 0, "")
const building = new Building("", "", address)
const mockRooms = [
    new Room("","room_1", building),
    new Room("","room_2", building),
    new Room("","room_3", building),
    new Room("","room_4", building),
    new Room("","room_5", building),
    new Room("","room_6", building),
    new Room("","room_7", building),
    new Room("","room_8", building),
    new Room("","room_9", building),
    new Room("","room_10", building),
    new Room("","room_11", building),
    new Room("","room_12", building),
    new Room("","room_13", building),
    new Room("","room_14", building),
    new Room("","room_15", building),
    new Room("","room_16", building),
    new Room("","room_17", building),
    new Room("","room_18", building),
    new Room("","room_19", building),
    new Room("","room_20", building),
    new Room("","room_21", building),
    new Room("","room_22", building),
    new Room("","room_23", building),
    new Room("","room_24", building),
    new Room("","room_25", building),
    new Room("","room_26", building),
    new Room("","room_27", building),
    new Room("","room_28", building),
    new Room("","room_29", building),
    new Room("","room_30", building),
    new Room("","room_31", building),
    new Room("","room_32", building),
    new Room("","room_33", building),
    new Room("","room_34", building),
    new Room("","room_35", building),
    new Room("","room_36", building)
]

export default mockRooms;