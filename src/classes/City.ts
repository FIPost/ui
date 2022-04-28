export default class City{
    public id: string;
    public name: string;

    constructor(id: string, name: string){
        this.id = id;
        this.name = name;
    }

    static deserialize(data: Object): City {
        return new City(
            data["id"],
            data["name"]
        );
    }
}