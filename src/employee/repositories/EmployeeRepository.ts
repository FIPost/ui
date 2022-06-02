import { Person } from "../Person";

export interface IEmployeeRepository {
    GetAllEmployees(): Promise<Array<Person>>;
    GetEmployeeByID(id: string): Promise<Person>;
}

