"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export function CreateUser() {
  const router = useRouter();
  const [name, setName] = useState("");

  const { mutate, isPending } = api.user.create.useMutation({
    onSuccess(data, variables, context) {
      console.log("success", data, variables, context);
      setName("");
      //   utils.user.invalidate();
      router.refresh();
    },
    onError(err) {
      alert(err.message);
    },
  });

  return (
    <div>
      <input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border"
        type="text"
        placeholder="name"
      />
      <button
        className="rounded-lg bg-blue-500 px-4 py-2"
        onClick={() =>
          mutate({ name, email: `name${name.replace(/\s+/g, "")}@gmail.com` })
        }
      >
        {isPending ? "Creating..." : "Create"}
      </button>
    </div>
  );
}
