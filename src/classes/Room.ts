export default class Room{
    public Guid: string;
    public Name: string;
    public BuildingId: string;

    constructor(id: string, name: string, buildingId: string){
        this.Guid = id;
        this.Name = name;
        this.BuildingId = buildingId;
    }
}