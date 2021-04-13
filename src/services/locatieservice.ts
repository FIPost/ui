import http from './http';
import City from '@/classes/City';
import Address from '@/classes/Address';
import Institute from '@/classes/Institute';
import Building from '@/classes/Building';
import Room from '@/classes/Room';

export default class LocatieService{
    public async getAllCities(): Promise<Array<City>>  {
        const respone = await http.get(`api/city`);
        return respone.data;
    }
    public async postCity(city): Promise<City>   {
        const response = await http.post(`api/city`, city);
        return response.data;
    }
    public async getAllAddresses(): Promise<Array<Address>>  {
        const response = await http.post(`api/address`);
        return response.data;
    }
    public async postAddress(address): Promise<Address>   {
        const response =  await http.post(`api/address`, address);
        return response.data;
    }
    public async postInstitution(institute): Promise<Institute>  {
        const response = await http.post(`api/institute`, institute);
        return response.data;
    }
    public async getAllBuildings(): Promise<Array<Building>>    {
        const response = await http.get(`api/building`);
        return response.data;
    }
    public async postBuidling(building): Promise<Building>  {
        const response = await http.post(`api/building`, building);
        return response.data;
    }
    public async postRoom(room): Promise<Room>  {
        const response = await http.post(`api/room`, room);
        return response.data;
    }
}


export const locatieService = new LocatieService();
