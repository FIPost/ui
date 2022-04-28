import ISerializable from "./helpers/ISerializable";

export class Person implements ISerializable<Person> {
    public id: string = "";
    public name: string = "";
    public email: string = "";

    constructor(id: string, name: string, email: string){
        this.id = id;
        this.name = name;
        this.email = email;
    }

    deserialize(data: Object): Person {
        this.id = data["id"];
        this.name = data["name"];
        this.email = data["email"];
        return this;
    }
}