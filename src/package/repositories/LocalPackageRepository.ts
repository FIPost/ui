import { Package } from "../Package";
import { Ticket } from "../Ticket";
import { IPackageRepository } from "./PackageRepository";


export class LocalPackageRepository implements IPackageRepository {
    private packages: Array<Package> = new Array<Package>();

    constructor() {
        this.packages.push(
            new Package("0", "0", "0", "0", "0", "0", false, new Array<Ticket>(
                new Ticket("0", "0", 0, "0", ""))),
            new Package("1", "1", "1", "1", "1", "1", false, new Array<Ticket>(
                new Ticket("1", "1", 11111111, "1", ""))),
            new Package("2", "2", "2", "2", "2", "2", false, new Array<Ticket>(
                new Ticket("2", "2", 22222222, "2", ""))),
            new Package("3", "3", "3", "3", "3", "3", false, new Array<Ticket>(
                new Ticket("3", "3", 33333333, "3", ""))),
            new Package("4", "4", "4", "4", "4", "4", false, new Array<Ticket>(
                new Ticket("4", "4", 44444444, "4", "")))
        );
    }

    async GetAllPackages(): Promise<Package[]> {
        return this.packages;
    }

    async GetPackageByID(id: string): Promise<Package> {
        const res = this.packages.find(pkg => pkg.id == id);
        if (!res)
            throw new Error(`package not found with id: ${id}`);
        return res;
    }

    async CreatePackage(employeeID: string, locationID: string, pkg: Package): Promise<void> {
        pkg.id = this.packages[this.packages.length - 1].id + 1;
        pkg.tickets.push(new Ticket("0", locationID, 0, employeeID, ""))
        this.packages.push(pkg);
    }

    async UpdatePackageLocation(employeeID: string, pkgID: string, locationID: string): Promise<void> {
        // Fetch package from list
        const res = this.packages.find((value) => { return value.id == pkgID});
        if(!res)
            throw new Error(`package not found with id: ${pkgID}`);

        // Create ticket data
        let ticketID = "0";
        const lastTicket = res.getLastTicket();
        if(lastTicket){
            ticketID = lastTicket.id + 1;
        }

        // Update package
        res.tickets.push(new Ticket(ticketID, locationID, 0, employeeID, ""));
    }

    async UpdatePackageDeliverd(employeeID: string, pkgID: string, receiverID: string): Promise<void> {
        // Fetch package from list
        const res = this.packages.find((value) => { return value.id == pkgID});
        if(!res)
            throw new Error(`package not found with id: ${pkgID}`);

        // Create ticket data
        let ticketID = "0";
        let locationID = "0";
        const lastTicket = res.getLastTicket();
        if(lastTicket) {
            ticketID = lastTicket.id;
            locationID = lastTicket.locationId;
        }

        // Update package
        res.tickets.push(new Ticket(ticketID, locationID, 0, employeeID, receiverID));
        res.routeFinished = true;
    }

}
