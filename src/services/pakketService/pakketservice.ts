import { Package } from '@/classes/Package';
import http from '@/services/http';
import TicketRequest from '@/classes/requests/TicketRequest';
import axios from 'axios';

export default class PakketService {
    axiosInst = axios.create({
        baseURL: process.env.VUE_APP_API_GATEWAY + `/api/packages`,
        params: {
            // API params go here
        }
    });

    public async getAll(): Promise<Array<Package>> {
        const { data } = await this.axiosInst.get(``);
        const arr = data as Array<Object>;
        const res: Array<Package> = [];
        arr.forEach((pkg) => res.push(new Package().deserialize(pkg)))
        return res;
    }

    public async post(packageModel): Promise<Package> {
        const response = await http.post(`/api/packages`, packageModel);
        return response.data;
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