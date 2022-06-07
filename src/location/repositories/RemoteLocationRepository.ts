import axios, { AxiosInstance } from "axios";
import { ILocationRepository } from "./LocationRepository";
import { Location } from "../Location";


export class RemoteLocationRepository implements ILocationRepository {
    private axiosInst: AxiosInstance;

    constructor() {
        this.axiosInst = axios.create({
            baseURL: `${process.env.VUE_APP_API_GATEWAY}/api/locations`
        });
    }

    async GetAllLocations(): Promise<Location[]> {
        const { data } = await this.axiosInst.get(`/rooms`);
        return data.map((loc) => new Location(
            loc.id,
            loc.name,
            loc.building.address.city.name,
            loc.building.address.street,
            loc.building.address.number,
            loc.building.address.postalCode
        ));
    }

    async GetLocationByID(id: string): Promise<Location> {
        const room = await this.axiosInst.get(`/rooms/${id}`);

        return new Location(
            room.data.id,
            room.data.name,
            room.data.building.address.city.name,
            room.data.building.address.street,
            room.data.building.address.number,
            room.data.building.address.postalCode
        );
    }

    async CreateLocation(loc: Location): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async UpdateLocation(loc: Location): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async DeleteLocation(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}