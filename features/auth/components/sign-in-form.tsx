"use client";

import SubmitButton from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import signIn from "../actions/sign-in";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { useActionState } from "react";
import Form from "@/components/form/form";
import FieldError from "@/components/form/field-error";

export default function SignInForm() {
  const [state, action] = useActionState(signIn, EMPTY_ACTION_STATE);

  return (
    <Form action={action} state={state}>
      <Input
        name="email"
        placeholder="Email"
        defaultValue={state.payload?.get("email") as string}
      />
      <FieldError state={state} name="email" />

      <Input
        name="password"
        placeholder="Password"
        type="password"
        defaultValue={state.payload?.get("password") as string}
      />
      <FieldError state={state} name="password" />

      <SubmitButton label="Sign In" />
    </Form>
  );
}
