import http from '@/services/http';
import Room from "@/classes/Room";
import RoomRequest from "@/classes/requests/RoomRequest";

export default class RoomService {
  public async post(roomModel): Promise<Room> {
    const response = await http.post(`/api/locations/rooms`, roomModel);
    return response.data;
  }

  public async getAll(): Promise<Array<Room>> {
    const response = await http.get(`/api/locations/rooms`);
    return response.data;
  }

  public async getById(id: string): Promise<Room> {
    if(!id) {
      throw new Error("");
    }
    const response = await http.get(`/api/locations/rooms/${id}`);
    return response.data;
  }

  public async update(room: RoomRequest, id: string) {
    const response = await http.put(`/api/locations/rooms/${id}`, room);
    return response.data;
  }

  public async delete(id: string) {
    const response = await http.delete(`/api/locations/rooms/${id}`);
    return response.data;
  }
}

export const roomService = new RoomService();