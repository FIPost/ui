/* THIS CLASS IS DEPRICATED, please use the dedicated repository interface */

import { Person } from '@/employee/Person';
import http from '@/services/http';

export class PersoneelService {

    public async getAll(): Promise<Array<Person>> {
        const response = await http.get(`/api/persons`);
        return response.data;
    }

    public async get(id: string): Promise<Person> {
        if (!id) throw new Error("id null");
        const response = await http.get(`/api/persons/${id}`);
        return response.data;
    }
}

// A singleton instance
export const personeelService = new PersoneelService();