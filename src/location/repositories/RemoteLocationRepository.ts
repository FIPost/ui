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
        return data.map((city) => Location.deserialize(city));
    }

    async GetLocationByID(id: string): Promise<Location> {
        const room = await this.axiosInst.get(`/rooms/${id}`);
        const building = await this.axiosInst.get(`/buildings/${room.data[""]}`)
        const address = building.data["address"];
        const city = await this.axiosInst.get(`/Cities/${address["city"]}`);

        return new Location(
            room.data["id"],
            room.data["name"],
            city.data["name"],
            address["street"],
            address["number"],
            address["postalCode"]
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