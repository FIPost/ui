export default class Location {
    public Id: Number;
    public Stad: String;
    public Locatie: String;
    public Afhaalpunt: String;

    constructor(id: Number, stad: String, locatie: String, afhaalpunt: String){ 
        this.Id = id;
        this.Stad = stad;
        this.Locatie = locatie;
        this.Afhaalpunt = afhaalpunt;
    }
}