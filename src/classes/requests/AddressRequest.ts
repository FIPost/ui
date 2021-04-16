import CityRequest from "@/classes/requests/CityRequest"

export default class AddressRequest {
    public CityId: string;
    public Street: string;
    public Number: Number;
    public Addition: string;
    public PostalCode: string;


    constructor(cityId: string, street: string, postalCode: string, number: Number, addition: string){
        this.CityId = cityId;
        this.Street = street;
        this.PostalCode = postalCode;
        this.Number = number;
        this.Addition = addition;
    }
}