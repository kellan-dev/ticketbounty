import { hash } from "@node-rs/argon2";
import { PrismaClient, TicketStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const seedTickets: {
  title: string;
  content: string;
  status: TicketStatus;
  createdAt: Date;
  bounty: number;
  deadline: string;
}[] = [
  {
    title: "(1) Critical Security Vulnerability",
    content:
      "(1) Urgent: Discovered a potential XSS vulnerability in the login form. Immediate attention required.",
    status: TicketStatus.WORKING,
    createdAt: new Date("2024-09-15T10:00:00Z"),
    bounty: 2999,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(2) Performance Optimization Needed",
    content:
      "(2) The dashboard is loading slowly on production. Initial investigation shows multiple unnecessary API calls and unoptimized database queries. We should implement caching and reduce the number of requests.",
    status: TicketStatus.OPEN,
    createdAt: new Date("2024-09-28T14:30:00Z"),
    bounty: 1999,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(3) UI Bug in Mobile Navigation",
    content: "(3) Mobile menu doesn't close properly after selecting an item.",
    status: "OPEN",
    createdAt: new Date("2024-10-05T09:15:00Z"),
    bounty: 499,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(4) Update Dependencies",
    content:
      "(4) Several packages are outdated and have security vulnerabilities. Need to update React, Next.js, and associated dependencies. This will require thorough testing of all features after the update.",
    status: TicketStatus.WORKING,
    createdAt: new Date("2024-10-12T16:45:00Z"),
    bounty: 1499,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(5) Add Dark Mode Support",
    content:
      "(5) Users have requested dark mode. We need to implement a theme switcher and create dark variants for all components.",
    status: TicketStatus.OPEN,
    createdAt: new Date("2024-10-19T11:20:00Z"),
    bounty: 1799,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(6) Fix Authentication Flow",
    content:
      "(6) Users are sometimes logged out unexpectedly. Need to investigate token refresh mechanism.",
    status: TicketStatus.CLOSED,
    createdAt: new Date("2024-10-26T13:10:00Z"),
    bounty: 1299,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(7) Implement File Upload Feature",
    content:
      "(7) Add support for file attachments in the messaging system. Requirements: Max file size 10MB, supported formats: PDF, PNG, JPG. Must include progress bar and error handling. Consider implementing cloud storage solution.",
    status: TicketStatus.OPEN,
    createdAt: new Date("2024-11-02T15:30:00Z"),
    bounty: 2499,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(8) Database Backup Issue",
    content: "(8) Automated backups failed last night.",
    status: TicketStatus.CLOSED,
    createdAt: new Date("2024-11-08T08:45:00Z"),
    bounty: 999,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(9) Improve Error Handling",
    content:
      "(9) Current error messages are not user-friendly. We need to implement better error handling throughout the application and provide more meaningful error messages to users. This includes form validation errors, API errors, and system errors.",
    status: TicketStatus.WORKING,
    createdAt: new Date("2024-11-15T10:20:00Z"),
    bounty: 1599,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(10) Add Export to PDF Feature",
    content:
      "(10) Users need the ability to export their reports to PDF format.",
    status: TicketStatus.OPEN,
    createdAt: new Date("2024-11-21T14:15:00Z"),
    bounty: 1399,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(11) Memory Leak in Dashboard",
    content:
      "(11) The dashboard component isn't properly cleaning up event listeners, causing memory leaks in long-running sessions. This needs to be investigated and fixed. Steps to reproduce: 1. Open dashboard 2. Navigate away and back multiple times 3. Observe increasing memory usage.",
    status: TicketStatus.WORKING,
    createdAt: new Date("2024-11-29T09:30:00Z"),
    bounty: 1899,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(12) Update Privacy Policy",
    content: "(12) Legal team has requested updates to the privacy policy.",
    status: TicketStatus.CLOSED,
    createdAt: new Date("2024-12-02T16:00:00Z"),
    bounty: 799,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(13) Implement Two-Factor Authentication",
    content:
      "(13) Need to add 2FA support for enhanced security. Should support both authenticator apps and SMS-based verification.",
    status: TicketStatus.OPEN,
    createdAt: new Date("2024-12-07T11:30:00Z"),
    bounty: 2199,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(14) Optimize Image Loading",
    content:
      "(14) Images in the gallery section are loading slowly. Implement lazy loading and image optimization pipeline.",
    status: TicketStatus.WORKING,
    createdAt: new Date("2024-12-10T13:45:00Z"),
    bounty: 1699,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(15) Add Search Functionality",
    content:
      "(15) Users need the ability to search through their tickets and messages. Implement full-text search functionality.",
    status: TicketStatus.OPEN,
    createdAt: new Date("2024-12-13T09:15:00Z"),
    bounty: 1899,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(16) Fix Payment Integration",
    content:
      "(16) Payment processing occasionally fails during high traffic. Need to implement better error handling and retry mechanism.",
    status: TicketStatus.WORKING,
    createdAt: new Date("2024-12-16T14:20:00Z"),
    bounty: 2499,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(17) Implement API Rate Limiting",
    content:
      "(17) To prevent abuse, we need to implement rate limiting on our API endpoints. Should include proper error responses and documentation.",
    status: TicketStatus.OPEN,
    createdAt: new Date("2024-12-19T10:00:00Z"),
    bounty: 1599,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "(18) Add Email Notifications",
    content:
      "(18) Users should receive email notifications for important events like ticket updates and new messages.",
    status: TicketStatus.OPEN,
    createdAt: new Date("2024-12-22T15:30:00Z"),
    bounty: 1799,
    deadline: new Date().toISOString().split("T")[0],
  },
];

// Generate 10-30 comments for each ticket (except the last one which has 0)
const generateComments = (
  ticketId: string,
  users: { id: string }[],
  ticketCreatedAt: Date,
  isLastTicket: boolean,
) => {
  if (isLastTicket) return [];

  const numComments = Math.floor(Math.random() * 21) + 10; // 10 to 30 comments
  if (numComments === 0) return [];

  // Generate sorted dates for comments (1-10 days after ticket)
  const commentDates = Array.from({ length: numComments }, () => {
    const daysAfterTicket = Math.floor(Math.random() * 10) + 1; // 1-10 days
    const commentDate = new Date(ticketCreatedAt);
    commentDate.setDate(commentDate.getDate() + daysAfterTicket);
    // Add random hours (0-23) and minutes (0-59)
    commentDate.setHours(Math.floor(Math.random() * 24));
    commentDate.setMinutes(Math.floor(Math.random() * 60));
    return commentDate;
  }).sort((a, b) => a.getTime() - b.getTime());

  return commentDates.map((commentDate, index) => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    return {
      content: `(${index + 1}) ${
        [
          "I can help with this issue.",
          "Looking into this now.",
          "Need more information to proceed.",
          "I've seen this before, will share my solution.",
          "This seems more complex than initially thought.",
          "Almost done with the implementation.",
          "Great progress so far!",
          "Can you provide more details?",
          "I have a similar experience to share.",
          "Let's discuss the approach.",
          "I can help with this issue. I've implemented something similar in another project using a combination of JWT and Redis for session management.",
          "Looking into this now. Initial investigation suggests it might be related to our caching layer.",
          "Need more information to proceed. Could you provide the steps to reproduce and any relevant error logs?",
          "I've seen this before, will share my solution. The key is to implement proper connection pooling and add retry logic for failed requests.",
          "This seems more complex than initially thought. We might need to refactor the entire authentication flow to accommodate these changes.",
          "Almost done with the implementation. Just need to add some unit tests and update the documentation.",
          "Great progress so far! The performance improvements are already noticeable in the staging environment.",
          "Can you provide more details about the expected behavior? The current specs are a bit ambiguous.",
          "I have a similar experience to share. We solved this by implementing a queue-based system with rate limiting.",
          "Let's discuss the approach. I think we should consider using WebSockets for real-time updates instead of polling.",
          "The root cause appears to be in the database indexing. I'll prepare a migration script to optimize the queries.",
          "This is a critical issue. I suggest we implement a temporary workaround while working on the permanent fix.",
          "Just pushed a potential fix to the staging branch. Please review when you have a chance.",
          "We should also update the API documentation once this is implemented. I'll create a separate task for that.",
          "The current implementation might not scale well. We should consider using a distributed cache.",
          "I've created a proof of concept in a separate branch. Take a look and let me know your thoughts.",
          "This is blocking our next release. I'll prioritize it and have a solution by tomorrow.",
          "We might need to coordinate with the infrastructure team on this one.",
          "The bug seems to only occur under heavy load. I'm setting up load testing to reproduce it consistently.",
          "Good catch! This could have caused serious issues in production if not caught early.",
        ][Math.floor(Math.random() * 30)]
      }`,
      userId: randomUser.id,
      ticketId,
      createdAt: commentDate,
    };
  });
};

const seed = async () => {
  const t0 = performance.now();
  console.log("Database seed started...");

  // reset the database
  await prisma.comment.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.ticket.deleteMany({});

  // create the users
  const passwordHash = await hash("password");
  const admin = await prisma.user.create({
    data: { username: "admin", email: "admin@admin.com", passwordHash },
  });
  const alice = await prisma.user.create({
    data: { username: "alice", email: "alice@alice.com", passwordHash },
  });
  const bob = await prisma.user.create({
    data: { username: "bob", email: "bob@bob.com", passwordHash },
  });

  // create the tickets
  const createdTickets = await Promise.all(
    seedTickets.map((ticket, index) =>
      prisma.ticket.create({
        data: {
          ...ticket,
          userId:
            index % 3 === 0 ? admin.id : index % 3 === 1 ? alice.id : bob.id,
        },
      }),
    ),
  );

  // create the comments
  const users = [admin, alice, bob];
  const seedComments = createdTickets.flatMap((ticket, index) =>
    generateComments(
      ticket.id,
      users,
      ticket.createdAt,
      index === createdTickets.length - 1,
    ),
  );
  await prisma.comment.createMany({
    data: seedComments,
  });

  const t1 = performance.now();
  console.log("Database seed completed in", t1 - t0, "ms");
};

seed();
