import City from '@/classes/City';
import http from '@/services/http';

export default class CityService {
    public async post(cityModel): Promise<Boolean> {
        const response = await http.post(`/api/city`, cityModel);
        return response.data;
     }

     public async getAll(): Promise<Array<City>> {
        const response = await http.get(`/api/city`);
        return response.data;
     }
}

export const cityService = new CityService();