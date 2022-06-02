export class Person {
    public id: string = "";
    public name: string = "";
    public email: string = "";

    constructor(id: string, name: string, email: string){
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static deserialize(data: Object): Person {
        return new Person(
            data["id"],
            data["name"],
            data["email"]
        );
    }
}