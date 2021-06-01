import TicketModel from "@/classes/TicketModel";

const tickets: TicketModel[] = [
  new TicketModel(
    "1",
    "1",
    1,
    "13 februari 13:16",
    "405273",
    "405273",
    true,
    "2",
    "14 februari 16:32",
    false,
    "Zending is aangekomen bij Fontys HVK"
  ),
  new TicketModel(
    "2",
    "1",
    1,
    "12 februari 10:28",
    "405273",
    "405273",
    true,
    "3",
    "12 februari 14:23",
    false,
    "Zending onderweg naar Fontys HVK"
  ),
  new TicketModel(
    "1",
    "1",
    1,
    "10 februari 13:16",
    "405273",
    "405273",
    true,
    "2",
    "11 februari 10:32",
    false,
    "Zending is geregistreerd bij Fontys"
  )
];
export default tickets;