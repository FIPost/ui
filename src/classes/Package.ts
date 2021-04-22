import TicketModel from "@/classes/TicketModel";

export default class Package {
    public id: String;
    public receiverId: String;
    public collectionPointId: String;
    public sender: String;
    public name: String;
    public status: String;
    public routeFinished: Boolean;
    public tickets: Array<TicketModel>;


    constructor(id: String, receiverId: String, collectionPointId: String, sender: String, name: String, status: String, routeFinished: Boolean, tickets: Array<TicketModel>) {
        this.id = id;
        this.receiverId = receiverId;
        this.collectionPointId = collectionPointId;
        this.sender = sender;
        this.name = name;
        this.status = status;
        this.routeFinished = routeFinished;
        this.tickets = tickets;
    }
}