const home = () => "/";
const tickets = () => "/tickets";
const ticket = (ticketId: string) => `/tickets/${ticketId}`;
const ticketEdit = (ticketId: string) => `/tickets/${ticketId}/edit`;
const signUp = () => "/sign-up";
const signIn = () => "/sign-in";
const forgotPassword = () => "/forgot-password";

export const paths = {
  home,
  tickets,
  ticket,
  editTicket: ticketEdit,
  signUp,
  signIn,
  forgotPassword,
};
