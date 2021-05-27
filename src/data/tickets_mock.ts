import Ticket from "@/classes/Ticket";

const mock_tickets: Ticket[] = [
  {
    id: "3",
    location: "Tilburg, P1, Kantine",
    finishedAt: 1622116360,
    completedByPerson: "Levent",
    receivedByPerson: "Jacques de Roij"
  } as Ticket,
  {
    id: "2",
    location: "Eindhoven, P2, 1.01",
    finishedAt: 1622116260,
    completedByPerson: "Levent",
    receivedByPerson: ""
  } as Ticket,
  {
    id: "1",
    location: "Nijmegen, AX, Receptie",
    finishedAt: 1622116000,
    completedByPerson: "Simon",
    receivedByPerson: ""
  } as Ticket,

];
export default mock_tickets;