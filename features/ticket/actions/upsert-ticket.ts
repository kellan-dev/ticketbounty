"use server";

import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { toCents } from "@/lib/currency";
import { lucia } from "@/lib/lucia";
import { paths } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { isOwner } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const upsertTicketSchema = z.object({
  // Todo: Figure out where 191 comes from
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  bounty: z.coerce.number().positive(),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
});

export async function upsertTicket(
  id: string | undefined,
  _state: ActionState,
  formData: FormData,
) {
  const { user } = await lucia.authOrRedirect(paths.signIn());

  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({ where: { id } });
      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("error", "Unauthorized");
      }
    }

    const { title, content, bounty, deadline } = upsertTicketSchema.parse({
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      bounty: formData.get("bounty") as string,
      deadline: formData.get("deadline") as string,
    });

    const data = {
      userId: user.id,
      title,
      content,
      bounty: toCents(bounty),
      deadline,
    };

    await prisma.ticket.upsert({
      where: { id: id || "" },
      create: data,
      update: data,
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
