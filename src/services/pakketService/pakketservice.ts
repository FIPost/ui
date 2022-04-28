import { Package } from '@/classes/Package';
import http from '@/services/http';
import TicketRequest from '@/classes/requests/TicketRequest';
import axios, { AxiosInstance } from 'axios';

/*
interface IPackageRepository {
    getAll(): Promise<Array<Package>>;
    getById(): Package;
    addPackage(pkg: Package): void;
}

export class RemotePackageRepo implements IPackageRepository {
    private axiosInst: AxiosInstance;

    constructor() {
        this.axiosInst = axios.create({
            baseURL: `${process.env.VUE_APP_API_GATEWAY}/api/packages`
        });
    }

    async getAll(): Promise<Package[]> {
        const { data } = await this.axiosInst.get(``);
        const packages: Array<Package> = data.map((pkg) => new Package().deserialize(pkg)) as Package[];
        return packages;
    }

    getById(): Package {
        throw new Error('Method not implemented.');
    }

    addPackage(pkg: Package): void {
        throw new Error('Method not implemented.');
    }

}
*/

export class PakketService {
    axiosInst = axios.create({
        baseURL: `${process.env.VUE_APP_API_GATEWAY}/api/packages`
    });

    public async getAll(): Promise<Array<Package>> {
        const { data } = await this.axiosInst.get(``);
        return data.map((pkg) => Package.deserialize(pkg));
    }

    public async post(packageModel): Promise<Package> {
        const response = await http.post(`/api/packages`, packageModel);
        return Package.deserialize(response.data);
    }

    public async get(id): Promise<Package> {
        const response = await http.get(`/api/packages/${id}`);
        return response.data;
    }

    public async createTicket(request: TicketRequest): Promise<Package> {
        const response = await http.post(`/api/packages/tickets`, request);
        return response.data;
    }
}

// A singleton instance
export const pakketService = new PakketService();