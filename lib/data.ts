import { Ticket } from "@/features/ticket/types";

export const initialTickets: Ticket[] = [
  {
    id: "1",
    title: "Ticket 1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nemo, corporis quae enim eligendi consectetur quia maiores provident omnis, modi praesentium pariatur repudiandae eaque ut magnam explicabo fugit eveniet sunt ad nihil porro et, obcaecati veniam consequatur. Tempora eveniet sapiente sed harum modi labore? Esse fugit quidem eius veniam repellat!",
    status: "OPEN",
  },
  {
    id: "2",
    title: "Ticket 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nemo, corporis quae enim eligendi consectetur quia maiores provident omnis, modi praesentium pariatur repudiandae eaque ut magnam explicabo fugit eveniet sunt ad nihil porro et, obcaecati veniam consequatur. Tempora eveniet sapiente sed harum modi labore? Esse fugit quidem eius veniam repellat!",
    status: "CLOSED",
  },
  {
    id: "3",
    title: "Ticket 3",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nemo, corporis quae enim eligendi consectetur quia maiores provident omnis, modi praesentium pariatur repudiandae eaque ut magnam explicabo fugit eveniet sunt ad nihil porro et, obcaecati veniam consequatur. Tempora eveniet sapiente sed harum modi labore? Esse fugit quidem eius veniam repellat!",
    status: "WORKING",
  },
];
