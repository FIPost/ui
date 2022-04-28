import Room from "@/location/Room"
import { dateConverter } from "@/classes/helpers/DateConverter"

export default class Ticket {
    public id?: string;
    public locationId?: string;
    public finishedAt?: number;
    public completedByPersonId?: string;
    public receivedByPersonId?: string;

    staic deserialize(data: Object): Ticket {
        this.id = data["id"];
        this.locationId = data["locationId"];
        this.finishedAt = data["finishedAt"];
        this.completedByPersonId = data["completedByPersonId"];
        this.receivedByPersonId = data["recievedByPersonId"];
        return this;
    }

    public getDateString(): string {
        let date = this.finishedAt;
        if (date == undefined) date = 0;
        return dateConverter.getDateString(date);
    }
}