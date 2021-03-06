import Package from '@/classes/Package';
import http from '@/services/http';
import TicketRequest from '@/classes/requests/TicketRequest';

export default class PakketService {

  public async getAll(): Promise<Array<Package>> {
    const response = await http.get(`/api/packages`);
    return response.data;
  }
  public async post(packageModel): Promise<Package> {
    const response = await http.post(`/api/packages`, packageModel);
    return response.data;
  }

  public async get(id): Promise<Package> {
    const response = await http.get(`/api/packages/${id}`);
    return response.data;
  }

  public async createTicket(request: TicketRequest ) : Promise<Package> {
    const response = await http.post(`/api/packages/tickets`, request);
    return response.data;
  }
}

// A singleton instance
export const pakketService = new PakketService();