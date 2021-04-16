export default class Address {
    public cityId: string;
    public street: string;
    public number: number;
    public addition: string;
    public postalCode: string;


    constructor(cityId: string, street: string, postalCode: string, number: number, addition: string){
        this.cityId = cityId;
        this.street = street;
        this.postalCode = postalCode;
        this.number = number;
        this.addition = addition;
    }
}