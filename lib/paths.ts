import { closest } from "fastest-levenshtein";

const home = () => "/";
const tickets = () => "/tickets";
const ticket = (ticketId: string) => `/tickets/${ticketId}`;
const ticketEdit = (ticketId: string) => `/tickets/${ticketId}/edit`;
const signUp = () => "/sign-up";
const signIn = () => "/sign-in";
const forgotPassword = () => "/forgot-password";
const accountProfile = () => "/account/profile";
const accountPassword = () => "/account/password";

export const paths = {
  home,
  tickets,
  ticket,
  editTicket: ticketEdit,
  signUp,
  signIn,
  forgotPassword,
  accountProfile,
  accountPassword,
};

// TODO: This needs some work. For example, a ticket's details page will cause "My Tickets" to be active, even if the ticket doesn't belong to the user.
export function getActivePath(
  path: string,
  paths: string[],
  ignoredPaths?: string[],
) {
  const closestPath = closest(path, paths.concat(ignoredPaths || []));
  const index = paths.indexOf(closestPath);
  return { activePath: closestPath, activeIndex: index };
}
