"use client";

import { useActionState } from "react";
import { createPost } from "~/actions/post.action";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { AnotherComponent } from "./AnotherComponent";

export function ActionState() {
  const [state, submissionAction, isPending] = useActionState(createPost, "");

  return (
    <section className="mt-11 w-full px-4">
      <h1 className="font-medium">{state}</h1>
      <form action={submissionAction} className="flex flex-col gap-2">
        <Input
          disabled={isPending}
          type="text"
          placeholder="Enter a title"
          name="title"
          className="border"
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating post..." : "Create post"}
        </Button>
        <AnotherComponent />
      </form>
    </section>
  );
}
