import { Ticket } from "@/package/Ticket";

export class Package {
    id: string;
    receiverId: string;
    collectionPointId: string;
    sender: string;
    name: string;
    status: string;
    routeFinished: boolean;
    tickets: Array<Ticket>;

    constructor(id: string, receiverId: string, collectionPointId: string, sender: string, name: string, status: string, routeFinished: boolean, tickets: Array<Ticket>) {
        this.id = id;
        this.receiverId = receiverId;
        this.collectionPointId = collectionPointId;
        this.sender = sender;
        this.name = name;
        this.status = status;
        this.routeFinished = routeFinished;
        this.tickets = tickets;
    }

    static deserialize(data: Object): Package {
        return new Package(
            data["id"],
            data["receiverId"],
            data["collectionPointId"],
            data["sender"],
            data["name"],
            data["status"],
            data["routeFinished"],
            data["tickets"].map((ticket) => Ticket.deserialize(ticket))
        );
    }

    getFirstTicket(): Ticket | null {
        const lastIndex = this.tickets.length - 1;
        if (lastIndex < 0) return null
        return this.tickets[lastIndex];
    }

    getLastTicket(): Ticket | null {
        if (this.tickets.length < 1) return null;
        return this.tickets[0];
    }

    getStatus(): string {
        return this.routeFinished ? "Afgeleverd" : "In behandeling";
    }
}