import axios, { AxiosInstance } from "axios";
import { Person } from "../Person";
import { IEmployeeRepository } from "./EmployeeRepository";

export class RemoteEmployeeRepository implements IEmployeeRepository{
    private axiosInst: AxiosInstance;

    constructor() {
        this.axiosInst = axios.create({
            baseURL: `${process.env.VUE_APP_API_GATEWAY}/api/persons`
        });
    }

    async GetAllEmployees(): Promise<Person[]> {
        const { data } = await this.axiosInst.get(``);
        return data.map((employee) => Person.deserialize(employee));
    }
    
    async GetEmployeeByID(id: string): Promise<Person> {
        const { data } = await this.axiosInst.get(`/${id}`);
        return Person.deserialize(data);
    }

}