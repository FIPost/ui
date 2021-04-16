import City from "./City";

export default class Address {
    public city: City;
    public street: string;
    public number: Number;
    public addition: string;
    public postalCode: string;


    constructor(city: City, street: string, postalCode: string, number: Number, addition: string){
        this.city = city;
        this.street = street;
        this.postalCode = postalCode;
        this.number = number;
        this.addition = addition;
    }
}