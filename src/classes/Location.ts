export default class Location {
    public Id: Number;
    public Name: String;
    public Description: String;

    constructor(id: Number, name: String, description: String){
        this.Id = id;
        this.Name = name;
        this.Description = description;
    }
}