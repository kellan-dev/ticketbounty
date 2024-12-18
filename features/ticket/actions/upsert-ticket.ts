"use server";

import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { paths } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const upsertTicketSchema = z.object({
  // todo: Figure out where 191 comes from
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
});

export async function upsertTicket(
  id: string | undefined,
  _state: ActionState,
  formData: FormData,
) {
  try {
    const { title, content } = upsertTicketSchema.parse({
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    });

    await prisma.ticket.upsert({
      where: { id: id || "" },
      create: { title, content },
      update: { title, content },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(paths.tickets());

  if (id) {
    await setCookieByKey("toast", "Ticket updated");
    redirect(paths.ticket(id));
  }

  return toActionState("success", "Ticket created");
}
