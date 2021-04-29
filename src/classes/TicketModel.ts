export default class TicketModel {
    public Id: String;
    public PackageId: String;
    public ToDoLocationId: number;
    public CreatedAt: String;
    public FinishedAt: String;
    public CreatedByPCN: String;
    public FinishedByPCN: String;
    public IsFinished: Boolean;
    public NextTicketId: String;
    public IsCurrent: Boolean;
    public Description: String;
    public IsLast: Boolean = false;

    constructor(id: String, packageId: String, toDoLocationId: number, createdAt: String, createdByPCN: String, finishedByPCN: String
        , isFinished: Boolean, nextTicketId: String, finishedAt: String, isCurrent: Boolean, description: String){
        this.Id = id;
        this.PackageId = packageId;
        this.ToDoLocationId = toDoLocationId;
        this.CreatedAt = createdAt;
        this.CreatedByPCN = createdByPCN;
        this.FinishedByPCN = finishedByPCN;
        this.IsFinished = isFinished;
        this.NextTicketId = nextTicketId;
        this.FinishedAt = finishedAt;
        this.IsCurrent = isCurrent;
        this.Description = description;
    }
}