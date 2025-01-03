"use client";

import { Button } from "@/components/ui/button";
import { LucideMoreVertical, LucideTrash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CommentWithMetadata } from "../types";
import { deleteComment } from "../queries/delete-comment";
import useConfirmDialog from "@/hooks/use-confirm-dialog";

type Props = {
  comment: CommentWithMetadata;
};

export default function CommentItemMenu({ comment }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, comment.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className="h-4 w-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  });

  return (
    <>
      <div className="absolute right-2 top-2">
        <div
          className={cn(
            "opacity-0",
            isOpen ? "opacity-100" : "group-hover:opacity-100",
          )}
        >
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <LucideMoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit (TODO)</DropdownMenuItem>
              {deleteButton}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {deleteDialog}
    </>
  );
}
