import Room from "@/classes/Room"
import { dateConverter } from "@/classes/helpers/DateConverter"
import ISerializable from "./helpers/ISerializable";

export default class Ticket implements ISerializable<Ticket> {
    public id?: string;
    public locationId?: string;
    public finishedAt?: number;
    public completedByPersonId?: string;
    public receivedByPersonId?: string;

    deserialize(data: Object): Ticket {
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