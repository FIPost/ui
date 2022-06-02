import { Person } from "../Person";
import { IEmployeeRepository } from "./EmployeeRepository";


export class LocalEmployeeRepository implements IEmployeeRepository {
    private employees: Array<Person> = new Array<Person>();

    constructor() {
        this.employees.push(
            new Person("0", "Employee_0", "Email_0"),
            new Person("1", "Employee_1", "Email_1"),
            new Person("2", "Employee_2", "Email_2"),
            new Person("3", "Employee_3", "Email_3"),
            new Person("4", "Employee_4", "Email_4")
        );
    }

    async GetAllEmployees(): Promise<Person[]> {
        return this.employees;
    }

    async GetEmployeeByID(id: string): Promise<Person> {
        const res = this.employees.find(employee => employee.id == id);
        if (!res)
            throw new Error(`employee not found with id: ${id}`);
        return res;
    }
}
