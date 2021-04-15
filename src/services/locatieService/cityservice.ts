import http from '@/services/http';

export default class CityService {
    public async post(cityModel): Promise<Boolean> {
        console.log(process.env.VUE_APP_APIGATEWAY);
        const response = await http.post(`http://localhost:1434/api/city`, cityModel);
        return response.data;
     }
}

export const cityService = new CityService();