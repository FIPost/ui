import http from '@/services/http';

export default class BuildingService {
    public async post(buildingModel): Promise<Boolean> {
        const response = await http.post(`/api/building`, buildingModel);
        return response.data;
     }
}

export const buildingService = new BuildingService();