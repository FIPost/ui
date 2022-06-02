import { ILocationRepository } from "./LocationRepository";
import { Location } from "@/location/Location";


export class LocalLocationRepository implements ILocationRepository {
    private locations: Array<Location> = new Array<Location>();

    constructor() {
        this.locations.push(
            new Location("0", "Location_0", "City_0", "Street_0", "House_0", "PostalCode_0"),
            new Location("1", "Location_1", "City_1", "Street_1", "House_1", "PostalCode_1"),
            new Location("2", "Location_2", "City_2", "Street_2", "House_2", "PostalCode_2"),
            new Location("3", "Location_3", "City_3", "Street_3", "House_3", "PostalCode_3"),
            new Location("4", "Location_4", "City_4", "Street_4", "House_4", "PostalCode_4")
        );
    }

    async GetAllLocations(): Promise<Location[]> {
        return this.locations;
    }

    async GetLocationByID(id: string): Promise<Location> {
        const res = this.locations.find(loc => loc.id == id);
        if (!res)
            throw new Error(`Room not found with id: ${id}`);
        return res;
    }

    async CreateLocation(loc: Location): Promise<void> {
        loc.id = this.locations[this.locations.length - 1].id + 1;
        this.locations.push(loc)
    }

    async UpdateLocation(loc: Location): Promise<void> {
        // Fetch location from list
        let res = this.locations.find((value) => {return value.id == loc.id});
        if(!res)
            throw new Error(`package not found with id: ${loc.id}`);
        
        res = loc;
    }

    async DeleteLocation(id: string): Promise<void> {
        this.locations = this.locations.filter((value) => {return value.id !== id});
    }
}