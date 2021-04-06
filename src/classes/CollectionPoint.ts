export default class CollectionPoint{
    public Id: string;
    public Institute: string;
    public Name: string;

    constructor(id:string, institute:string, name:string){
        this.Id = id;
        this.Institute = institute;
        this.Name = name;
    }
}