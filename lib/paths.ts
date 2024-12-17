const home = () => "/";
const tickets = () => "/tickets";
const ticket = (ticketId: string) => `/tickets/${ticketId}`;
const ticketEdit = (ticketId: string) => `/tickets/${ticketId}/edit`;

export const paths = {
  home,
  tickets,
  ticket,
  editTicket: ticketEdit,
};
