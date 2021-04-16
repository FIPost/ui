import http from '@/services/http';

export default class CityService {
    public async post(cityModel): Promise<Boolean> {
        const response = await http.post(`/api/city`, cityModel);
        return response.data;
     }
}

export const cityService = new CityService();