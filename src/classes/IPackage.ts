import Ticket from "@/classes/Ticket"

export default interface IPackage {
    id: string;
    receiverId: string;
    collectionPointId: string;
    sender: string;
    name: string;
    status: string;
    routeFinished: boolean;
    tickets: Array<Ticket>;
}