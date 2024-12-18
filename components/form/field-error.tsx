import React from "react";
import { ActionState } from "./utils/to-action-state";

type Props = {
  state: ActionState;
  name: string;
};

export default function FieldError({ state, name }: Props) {
  const message = state.fieldErrors[name]?.[0];
  if (!message) return null;
  return <span className="text-xs text-red-500">{message}</span>;
}
