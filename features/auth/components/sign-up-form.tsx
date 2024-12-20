"use client";

import SubmitButton from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import signUp from "../actions/sign-up";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { useActionState } from "react";
import Form from "@/components/form/form";
import FieldError from "@/components/form/field-error";

export default function SignUpForm() {
  const [state, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  return (
    <Form action={action} state={state}>
      <Input
        name="email"
        placeholder="Email"
        defaultValue={state.payload?.get("email") as string}
      />
      <FieldError state={state} name="email" />

      <Input
        name="username"
        placeholder="Username"
        defaultValue={state.payload?.get("username") as string}
      />
      <FieldError state={state} name="username" />

      <Input
        name="password"
        placeholder="Password"
        type="password"
        defaultValue={state.payload?.get("password") as string}
      />
      <FieldError state={state} name="password" />

      <Input
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        defaultValue={state.payload?.get("confirmPassword") as string}
      />
      <FieldError state={state} name="confirmPassword" />

      <SubmitButton label="Sign Up" />
    </Form>
  );
}
