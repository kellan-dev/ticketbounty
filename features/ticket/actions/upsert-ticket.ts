"use server";

import { paths } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function upsertTicket(id: string | undefined, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.ticket.upsert({
    where: { id: id || "" },
    create: { title, content },
    update: { title, content },
  });

  revalidatePath(paths.tickets());

  if (id) redirect(paths.ticket(id));
}
