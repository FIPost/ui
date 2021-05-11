import http from '@/services/http';
import Room from "@/classes/Room";

export default class RoomService {
   public async post(roomModel): Promise<Room> {
      const response = await http.post(`/api/locations/rooms`, roomModel);
      return response.data;
   }

   public async getAll(): Promise<Array<Room>> {
      const response = await http.get(`/api/locations/rooms`);
      return response.data;
   }

}

export const roomService = new RoomService();