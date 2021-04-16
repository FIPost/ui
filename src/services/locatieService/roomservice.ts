import http from '@/services/http';

export default class RoomService {
    public async post(roomModel): Promise<Boolean> {
        const response = await http.post(`/api/room`, roomModel);
        return response.data;
     }
}

export const roomService = new RoomService();