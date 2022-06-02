import { Location } from "@/location/Location";

export interface ILocationRepository {
    GetAllLocations(): Promise<Array<Location>>
    GetLocationByID(id: string): Promise<Location>
    CreateLocation(loc: Location): Promise<void>
    UpdateLocation(loc: Location): Promise<void>
    DeleteLocation(id: string): Promise<void>
}

