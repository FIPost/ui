import PackageModel from '@/classes/PackageModel';
import http from './http';

export default class PakketService {

   private baseUrl: String = process.env.VUE_APP_APIGATEWAY;

   public async getAll(): Promise<Array<PackageModel>> {
      const response = await http.get(`${this.baseUrl}/api/packages`);
      return response.data;
   }
   public async post(packageModel): Promise<PackageModel> {
      const response = await http.post(`${this.baseUrl}/api/packages`, packageModel);
      return response.data;
   }
   public async get(id): Promise<PackageModel> {
      const response = await http.get(`${this.baseUrl}/api/packages/${id}`);
      return response.data;
   }
}

// A singleton instance
export const pakketService = new PakketService();