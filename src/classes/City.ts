export default class City{
    public Guid: string;
    public City: String;

    constructor(city: String, guid: string){
        this.City = city;
        this.Guid = guid;
    }
}