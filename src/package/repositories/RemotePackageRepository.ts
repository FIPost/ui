import PackageRequest from "@/classes/requests/PackageRequest";
import TicketRequest from "@/classes/requests/TicketRequest";
import axios, { AxiosInstance } from "axios";
import { Package } from "../Package";
import { IPackageRepository } from "./PackageRepository";


export class RemotePackageRepository implements IPackageRepository {
    private axiosInst: AxiosInstance;

    constructor() {
        this.axiosInst = axios.create({
            baseURL: `${process.env.VUE_APP_API_GATEWAY}/api/packages`
        });
    }

    async GetAllPackages(): Promise<Array<Package>> {
        const { data } = await this.axiosInst.get(``);
        return data.map((pkg) => Package.deserialize(pkg));
    }

    async GetPackageByID(id: string): Promise<Package> {
        const { data } = await this.axiosInst.get(`/${id}`);
        return Package.deserialize(data);
    }

    async CreatePackage(employeeID: string, locationID: string, pkg: Package): Promise<void> {
        // Create request
        const request: PackageRequest = new PackageRequest;
        request.Sender = pkg.sender;
        request.ReceiverId = pkg.receiverId;
        request.Name = pkg.name;
        request.CollectionPointId = pkg.collectionPointId;
        request.CreatedByPersonId = employeeID;
        request.CreatedAtLocationId = locationID;

        // Send request
        const res = await this.axiosInst.post(``, request);
    }

    async UpdatePackageLocation(employeeID: string, pkgID: string, locationID: string): Promise<void> {
        // Create request
        const request: TicketRequest = new TicketRequest;
        request.locationId = locationID;
        request.packageId = pkgID;
        request.completedByPersonId = employeeID;

        // Send request
        const res = await this.axiosInst.post(`/tickets`, request);
    }

    async UpdatePackageDeliverd(employeeID: string, pkgID: string, receiverID: string): Promise<void> {
        // Create request
        const request: TicketRequest = new TicketRequest;
        request.packageId = pkgID;
        request.completedByPersonId = employeeID;
        request.receivedByPersonId = receiverID;

        // Send request
        const res = await this.axiosInst.post(`/tickets`, request);
    }
}
