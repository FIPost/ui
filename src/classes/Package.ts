import Ticket from "@/classes/Ticket";
import Person from "@/classes/Person";
import Room from "@/classes/Room";
import Building from "./Building";
import Address from "./Address";
import City from "./City";

export default class Package {
    public id: String = "";
    public person: Person = new Person("", "", "");
    public collectionPoint: Room = new Room("", "", new Building("","", new Address(new City("",""),"","", 0,"")));
    public sender: String = "";
    public name: String = "";
    public status: String = "";
    public routeFinished: Boolean = false;
    public tickets: Array<Ticket> = [];
}