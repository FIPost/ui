import axios, { AxiosInstance } from "axios";
import Address from "./Address";
import Building, { BuildingRequest } from "./Building";
import City, { CityRequest } from "./City";
import Room, { RoomRequest } from "./Room";

export interface ILocationRepository {
    GetAllCities(): Promise<Array<City>>;
    GetAllBuildings(): Promise<Array<Building>>;
    GetAllRooms(): Promise<Array<Room>>;

    GetCityByID(id: string): Promise<City>;
    GetBuildingByID(id: string): Promise<Building>;
    GetRoomByID(id: string): Promise<Room>;

    CreateCity(city: CityRequest): Promise<City>;
    CreateBuilding(building: BuildingRequest): Promise<Building>;
    CreateRoom(room: RoomRequest): Promise<Room>;

    UpdateCity(id: string): Promise<City>;
    UpdateBuilding(id: string): Promise<Building>;
    UpdateRoom(id: string): Promise<Room>;

    DeleteCity(id: string): Promise<City>;
    DeleteBuilding(id: string): Promise<Building>;
    DeleteRoom(id: string): Promise<Room>;
}

export class LocalLocationRepository implements ILocationRepository {
    private cities: Array<City> = new Array<City>();
    private buildings: Array<Building> = new Array<Building>();
    private rooms: Array<Room> = new Array<Room>();

    constructor() {
        this.cities.push(
            new City("0", "City_0"),
            new City("1", "City_1")
        );

        this.buildings.push(
            new Building("0", "Building_0", new Address(this.cities[0], "Street_0", "PC_0", 0, "0")),
            new Building("1", "Building_1", new Address(this.cities[1], "Street_1", "PC_1", 1, "1"))
        );

        this.rooms.push(
            new Room("0", "Room_0", this.buildings[0]),
            new Room("1", "Room_1", this.buildings[1])
        );
    }

    async GetAllCities(): Promise<City[]> {
        return this.cities;
    }

    async GetAllBuildings(): Promise<Building[]> {
        return this.buildings;
    }

    async GetAllRooms(): Promise<Room[]> {
        return this.rooms;
    }

    async GetCityByID(id: string): Promise<City> {
        throw new Error("Method not implemented.");
    }

    async GetBuildingByID(id: string): Promise<Building> {
        throw new Error("Method not implemented.");
    }

    async GetRoomByID(id: string): Promise<Room> {
        const res = this.rooms.find(room => room.id == id);
        if (!res)
            throw new Error(`Room not found with id: ${id}`);
        return res;
    }

    CreateCity(city: CityRequest): Promise<City> {
        throw new Error("Method not implemented.");
    }

    CreateBuilding(building: BuildingRequest): Promise<Building> {
        throw new Error("Method not implemented.");
    }

    CreateRoom(room: RoomRequest): Promise<Room> {
        throw new Error("Method not implemented.");
    }

    UpdateCity(id: string): Promise<City> {
        throw new Error("Method not implemented.");
    }

    UpdateBuilding(id: string): Promise<Building> {
        throw new Error("Method not implemented.");
    }

    UpdateRoom(id: string): Promise<Room> {
        throw new Error("Method not implemented.");
    }

    DeleteCity(id: string): Promise<City> {
        throw new Error("Method not implemented.");
    }

    DeleteBuilding(id: string): Promise<Building> {
        throw new Error("Method not implemented.");
    }

    DeleteRoom(id: string): Promise<Room> {
        throw new Error("Method not implemented.");
    }
}

export class RemoteLocationRepository implements ILocationRepository {
    private axiosInst: AxiosInstance;

    constructor() {
        this.axiosInst = axios.create({
            baseURL: `${process.env.VUE_APP_API_GATEWAY}/api/locations`
        })
    }

    async GetAllCities(): Promise<City[]> {
        const { data } = await this.axiosInst.get(`/cities`);
        return data.map((city) => City.deserialize(city));
    }

    async GetAllBuildings(): Promise<Building[]> {
        const { data } = await this.axiosInst.get(`/buildings`);
        return data.map((building) => Building.deserialize(building));
    }

    async GetAllRooms(): Promise<Room[]> {
        const { data } = await this.axiosInst.get(`/rooms`);
        return data.map((room) => Room.deserialize(room));
    }

    async GetCityByID(id: string): Promise<City> {
        const { data } = await this.axiosInst.get(`/cities`);
        return City.deserialize(data);
    }

    async GetBuildingByID(id: string): Promise<Building> {
        const { data } = await this.axiosInst.get(`/buildings`);
        return Building.deserialize(data);
    }

    async GetRoomByID(id: string): Promise<Room> {
        const { data } = await this.axiosInst.get(`/rooms`);
        return Room.deserialize(data);
    }

    CreateCity(city: CityRequest): Promise<City> {
        throw new Error("Method not implemented.");
    }
    CreateBuilding(building: BuildingRequest): Promise<Building> {
        throw new Error("Method not implemented.");
    }
    CreateRoom(room: RoomRequest): Promise<Room> {
        throw new Error("Method not implemented.");
    }
    UpdateCity(id: string): Promise<City> {
        throw new Error("Method not implemented.");
    }
    UpdateBuilding(id: string): Promise<Building> {
        throw new Error("Method not implemented.");
    }
    UpdateRoom(id: string): Promise<Room> {
        throw new Error("Method not implemented.");
    }
    DeleteCity(id: string): Promise<City> {
        throw new Error("Method not implemented.");
    }
    DeleteBuilding(id: string): Promise<Building> {
        throw new Error("Method not implemented.");
    }
    DeleteRoom(id: string): Promise<Room> {
        throw new Error("Method not implemented.");
    }
}