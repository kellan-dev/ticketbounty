import { PrismaClient, TicketStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const tickets: {
  title: string;
  content: string;
  status: TicketStatus;
  createdAt: Date;
}[] = [
  {
    title: "(1) Critical Security Vulnerability",
    content:
      "(1) Urgent: Discovered a potential XSS vulnerability in the login form. Immediate attention required.",
    status: TicketStatus.WORKING,
    createdAt: new Date("2024-09-15T10:00:00Z"),
  },
  {
    title: "(2) Performance Optimization Needed",
    content:
      "(2) The dashboard is loading slowly on production. Initial investigation shows multiple unnecessary API calls and unoptimized database queries. We should implement caching and reduce the number of requests.",
    status: TicketStatus.OPEN,
    createdAt: new Date("2024-09-28T14:30:00Z"),
  },
  {
    title: "(3) UI Bug in Mobile Navigation",
    content: "(3) Mobile menu doesn't close properly after selecting an item.",
    status: "OPEN",
    createdAt: new Date("2024-10-05T09:15:00Z"),
  },
  {
    title: "(4) Update Dependencies",
    content:
      "(4) Several packages are outdated and have security vulnerabilities. Need to update React, Next.js, and associated dependencies. This will require thorough testing of all features after the update.",
    status: TicketStatus.WORKING,
    createdAt: new Date("2024-10-15T16:45:00Z"),
  },
  {
    title: "(5) Add Dark Mode Support",
    content:
      "(5) Users have requested dark mode. We need to implement a theme switcher and create dark variants for all components.",
    status: TicketStatus.OPEN,
    createdAt: new Date("2024-10-28T11:20:00Z"),
  },
  {
    title: "(6) Fix Authentication Flow",
    content:
      "(6) Users are sometimes logged out unexpectedly. Need to investigate token refresh mechanism.",
    status: TicketStatus.CLOSED,
    createdAt: new Date("2024-11-05T13:10:00Z"),
  },
  {
    title: "(7) Implement File Upload Feature",
    content:
      "(7) Add support for file attachments in the messaging system. Requirements: Max file size 10MB, supported formats: PDF, PNG, JPG. Must include progress bar and error handling. Consider implementing cloud storage solution.",
    status: TicketStatus.OPEN,
    createdAt: new Date("2024-11-15T15:30:00Z"),
  },
  {
    title: "(8) Database Backup Issue",
    content: "(8) Automated backups failed last night.",
    status: TicketStatus.CLOSED,
    createdAt: new Date("2024-11-25T08:45:00Z"),
  },
  {
    title: "(9) Improve Error Handling",
    content:
      "(9) Current error messages are not user-friendly. We need to implement better error handling throughout the application and provide more meaningful error messages to users. This includes form validation errors, API errors, and system errors.",
    status: TicketStatus.WORKING,
    createdAt: new Date("2024-12-01T10:20:00Z"),
  },
  {
    title: "(10) Add Export to PDF Feature",
    content:
      "(10) Users need the ability to export their reports to PDF format.",
    status: TicketStatus.OPEN,
    createdAt: new Date("2024-12-08T14:15:00Z"),
  },
  {
    title: "(11) Memory Leak in Dashboard",
    content:
      "(11) The dashboard component isn't properly cleaning up event listeners, causing memory leaks in long-running sessions. This needs to be investigated and fixed. Steps to reproduce: 1. Open dashboard 2. Navigate away and back multiple times 3. Observe increasing memory usage.",
    status: TicketStatus.WORKING,
    createdAt: new Date("2024-12-12T09:30:00Z"),
  },
  {
    title: "(12) Update Privacy Policy",
    content: "(12) Legal team has requested updates to the privacy policy.",
    status: TicketStatus.CLOSED,
    createdAt: new Date("2024-12-15T16:00:00Z"),
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("Database seed started...");

  await prisma.ticket.deleteMany({}); // reset the database
  await prisma.ticket.createMany({ data: tickets });

  const t1 = performance.now();
  console.log("Database seed completed in", t1 - t0, "ms");
};

seed();
