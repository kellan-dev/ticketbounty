const home = () => "/";
const tickets = () => "/tickets";
const ticket = (ticketId: string) => `/tickets/${ticketId}`;

export const paths = {
  home,
  tickets,
  ticket,
};
