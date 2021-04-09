export default class Address {
    public Guid: string;
    public Street: string;
    public StreetNr: number;
    public PostalCode: string;
    public City: string;
    public Country: string;

    constructor(street: string, streetNr: number, postalCode: string, city: string, country: string, guid: string){
        this.Street = street;
        this.StreetNr = streetNr;
        this.PostalCode = postalCode;
        this.City = city;
        this.Country = country;
        this.Guid = guid;
    }

}