export default class Person {
    public Id: String;
    public Name: string;
    public Email: string;
    public Phone: string;

    constructor(id: string, name: string, email: string, phone: string){
        this.Id = id;
        this.Name = name;
        this.Email = email;
        this.Phone = phone;
    }
}