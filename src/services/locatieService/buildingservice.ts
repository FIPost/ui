import http from '@/services/http';
import Building from "@/classes/Building"

export default class BuildingService {
    public async post(buildingModel): Promise<Boolean> {
        const response = await http.post(`/api/building`, buildingModel);
        return response.data;
     }

     public async getAll(): Promise<Array<Building>> {
        const response = await http.get(`/api/building`);
        return response.data;
     }
}

export const buildingService = new BuildingService();