import axios, { AxiosInstance } from "axios";
import { Package, PackageRequest } from "./Package";
import { Ticket } from "./Ticket";

export interface IPackageRepository {
    GetAllPackages(): Promise<Array<Package>>;
    GetPackageByID(id: string): Promise<Package>;
    CreatePackage(pkg: Package): Promise<void>;
    UpdatePackage(pkg: Package): Promise<void>;
    // DeletePackage(id: string): void;
}

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
        return res
    }

    async CreatePackage(pkg: PackageRequest): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async UpdatePackage(pkg: PackageRequest): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export class RemotePackageRepo implements IPackageRepository {
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

    async CreatePackage(pkg: Package): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async UpdatePackage(pkg: Package): Promise<void> {
        throw new Error("Method not implemented.");
    }
}