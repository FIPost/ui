import Building from "@/classes/Building";
import Room from "@/classes/Room";
import Package from "@/classes/Package";
import Address from "@/classes/Address";
import City from "@/classes/City";
import tickets from "@/data/tickets_mock";
import Person from "@/classes/Person";

const city = new City("", "");
const address = new Address(city, "","",0,"");
const building = new Building("", "", address);
const room = new Room("","", building);
const person = new Person("", "", "")
const mockPackages: Package[] = [
    new Package("", person, room, "", "Package_1", "", false, tickets),
    new Package("", person, room, "", "Package_2", "", false, tickets),
    new Package("", person, room, "", "Package_3", "", false, tickets),
    new Package("", person, room, "", "Package_4", "", false, tickets),
    new Package("", person, room, "", "Package_5", "", false, tickets),
    new Package("", person, room, "", "Package_6", "", false, tickets),
    new Package("", person, room, "", "Package_7", "", false, tickets),
    new Package("", person, room, "", "Package_8", "", false, tickets),
    new Package("", person, room, "", "Package_9", "", false, tickets),
    new Package("", person, room, "", "Package_10", "", false, tickets),
    new Package("", person, room, "", "Package_11", "", false, tickets),
    new Package("", person, room, "", "Package_12", "", false, tickets),
    new Package("", person, room, "", "Package_13", "", false, tickets),
    new Package("", person, room, "", "Package_14", "", false, tickets),
    new Package("", person, room, "", "Package_15", "", false, tickets),
    new Package("", person, room, "", "Package_16", "", false, tickets),
    new Package("", person, room, "", "Package_17", "", false, tickets),
    new Package("", person, room, "", "Package_18", "", false, tickets),
    new Package("", person, room, "", "Package_19", "", false, tickets),
    new Package("", person, room, "", "Package_20", "", false, tickets),
    new Package("", person, room, "", "Package_21", "", false, tickets),
    new Package("", person, room, "", "Package_22", "", false, tickets),
    new Package("", person, room, "", "Package_23", "", false, tickets),
    new Package("", person, room, "", "Package_24", "", false, tickets),
    new Package("", person, room, "", "Package_25", "", false, tickets),
    new Package("", person, room, "", "Package_26", "", false, tickets),
    new Package("", person, room, "", "Package_27", "", false, tickets),
    new Package("", person, room, "", "Package_28", "", false, tickets),
    new Package("", person, room, "", "Package_29", "", false, tickets),
    new Package("", person, room, "", "Package_30", "", false, tickets),
    new Package("", person, room, "", "Package_31", "", false, tickets),
    new Package("", person, room, "", "Package_32", "", false, tickets),
    new Package("", person, room, "", "Package_33", "", false, tickets),
    new Package("", person, room, "", "Package_34", "", false, tickets),
    new Package("", person, room, "", "Package_35", "", false, tickets),
    new Package("", person, room, "", "Package_36", "", false, tickets),
    new Package("", person, room, "", "Package_37", "", false, tickets),
    new Package("", person, room, "", "Package_38", "", false, tickets),
    new Package("", person, room, "", "Package_39", "", false, tickets),
    new Package("", person, room, "", "Package_40", "", false, tickets),
    new Package("", person, room, "", "Package_41", "", false, tickets),
    new Package("", person, room, "", "Package_42", "", false, tickets),
    new Package("", person, room, "", "Package_43", "", false, tickets),
    new Package("", person, room, "", "Package_44", "", false, tickets),
    new Package("", person, room, "", "Package_45", "", false, tickets),
    new Package("", person, room, "", "Package_46", "", false, tickets),
    new Package("", person, room, "", "Package_47", "", false, tickets)
];

export default mockPackages;