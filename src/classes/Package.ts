import ISerializable from "@/classes/helpers/ISerializable"
import Ticket from "@/classes/Ticket";
import { Person } from "@/classes/Person";
import { personeelService } from "@/services/personeelService/personeelService"

export class Package implements ISerializable<Package> {
    id?: string;
    receiverId?: string;
    collectionPointId?: string;
    sender?: string;
    name?: string;
    status?: string;
    routeFinished?: boolean;
    tickets?: Array<Ticket>;

    deserialize(data: Object): Package {
        this.id = data["id"];
        this.receiverId = data["receiverId"];
        this.collectionPointId = data["collectionPointId"];
        this.sender = data["sender"];
        this.status = data["status"];
        this.routeFinished = data["routeFinished"];
        this.tickets = data["tickets"];
        this.name = data["name"];
        return this;
    }

    async getReceiver() {
        if (this.receiverId)
        return await personeelService.get(this.receiverId);
    }
}