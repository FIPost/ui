import City from '@/classes/City';
import CityRequest from '@/classes/requests/CityRequest';
import http from '@/services/http';

export default class CityService {
  public async post(cityModel): Promise<City> {
    const response = await http.post(`/api/locations/cities`, cityModel);
    return response.data;
  }

  public async getAll(): Promise<Array<City>> {
    const response = await http.get(`/api/locations/cities`);
    return response.data;
  }

  public async getById(id: string): Promise<City> {
    const response = await http.get(`/api/locations/cities/${id}`);
    return response.data;
  }

  public async updateCity(id: String, cityModel: CityRequest): Promise<City> {
    const response = await http.put(`/api/locations/cities?id=${id}`, cityModel);
    return response.data;
  }

  public async deleteCity(id: String): Promise<City> {
    const response = await http.delete(`/api/locations/cities?id=${id}`);
    return response.data;
  }
}

export const cityService = new CityService();