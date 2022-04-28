import Room from "@/location/Room"

export class Ticket {
    id: string;
    locationId: string;
    finishedAt: number;
    completedByPersonId: string;
    receivedByPersonId: string;

    constructor(id: string, locationId: string, finishedAt: number, completedByPersonId: string, receivedByPersonId: string) {
        this.id = id;
        this.locationId = locationId;
        this.finishedAt = finishedAt;
        this.completedByPersonId = completedByPersonId;
        this.receivedByPersonId = receivedByPersonId;
    }

    static deserialize(data: Object): Ticket {
        return new Ticket(
            data["id"],
            data["locationId"],
            data["finishedAt"],
            data["completedByPersonId"],
            data["recievedByPersonId"]
        );
    }

    getDateString(): string {
        return new Date(this.finishedAt * 1000).toLocaleDateString();
    }
}