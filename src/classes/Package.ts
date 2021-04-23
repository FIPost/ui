import TicketModel from "@/classes/TicketModel";
import Person from "@/classes/Person";

export default class Package {
    public id: String;
    public person: Person;
    public collectionPointId: String;
    public sender: String;
    public name: String;
    public status: String;
    public routeFinished: Boolean;
    public tickets: Array<TicketModel>;


    constructor(id: String, person: Person, collectionPointId: String, sender: String, name: String, status: String, routeFinished: Boolean, tickets: Array<TicketModel>) {
        this.id = id;
        this.person = person;
        this.collectionPointId = collectionPointId;
        this.sender = sender;
        this.name = name;
        this.status = status;
        this.routeFinished = routeFinished;
        this.tickets = tickets;
    }
}