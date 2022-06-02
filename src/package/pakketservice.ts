/* THIS CLASS IS DEPRICATED, please use the dedicated repository interface */

import { Package, PackageRequest } from '@/package/Package';
import TicketRequest from '@/classes/requests/TicketRequest';
import axios from 'axios';

export class PakketService {
    axiosInst = axios.create({
        baseURL: `${process.env.VUE_APP_API_GATEWAY}/api/packages`
    });

    public async getAll(): Promise<Array<Package>> {
        const { data } = await this.axiosInst.get(``);
        return data.map((pkg) => Package.deserialize(pkg));
    }

    public async post(packageModel: PackageRequest): Promise<Package> {
        const response = await this.axiosInst.post(``, packageModel);
        return Package.deserialize(response.data);
    }

    public async get(id): Promise<Package> {
        const response = await this.axiosInst.get(`/${id}`);
        return response.data;
    }

    public async createTicket(request: TicketRequest): Promise<Package> {
        const response = await this.axiosInst.post(`/tickets`, request);
        return response.data;
    }
}

// A singleton instance
export const pakketService = new PakketService();