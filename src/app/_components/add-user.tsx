"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export function AddUser() {
  const router = useRouter();
  const utils = api.useUtils();
  const [name, setName] = useState("");

  const { mutate } = api.user.create.useMutation({
    onSuccess: (res) => {
      console.log("success", res);
      //   utils.user.invalidate();
      router.refresh();
    },
  });

  return (
    <div className="flex flex-col gap-2 text-black">
      <input onChange={(e) => setName(e.target.value)} value={name} />
      <button
        className="text-white"
        onClick={() =>
          mutate({
            name,
            email: `${name}@example.com`,
          })
        }
      >
        Add name
      </button>
    </div>
  );
}
