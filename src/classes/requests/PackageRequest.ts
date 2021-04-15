export default class PackageModel {
    public Sender: String;
    public ReceiverId: String;
    public Name: String;
    public CollectionPointId: String;

    
    constructor(Sender: String, ReceiverId: String, Name: String, CollectionPointId: String) {
        this.Sender = Sender;
        this.ReceiverId = ReceiverId;
        this.Name = Name;
        this.CollectionPointId = CollectionPointId;
    }
}