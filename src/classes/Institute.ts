export default class Institute {
    public Id: string;
    public Street: string;
    public StreetNr: number;
    public PostalCode: string;
    public City: string;

    constructor(id: string, street: string, streetNr: number, postalCode: string, city: string){
        this.Id = id;
        this.Street = street;
        this.StreetNr = streetNr;
        this.PostalCode = postalCode;
        this.City = city;
    }
}