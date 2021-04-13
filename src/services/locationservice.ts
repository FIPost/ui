import Location from '@/classes/Location'
import http from './http';

export default class LocationService {
    public async getAll(): Promise<Array<Location>> {
        const response = await http.get('/api/location');
        return response.data;
    }
}

export const locationservice = new LocationService();