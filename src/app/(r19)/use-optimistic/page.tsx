"use client";

import { Trash } from "lucide-react";
import { useOptimistic } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useFormStatus } from "react-dom";

export default function OptimisticPage() {
  const utils = api.useUtils();

  const { pending } = useFormStatus();
  const { data: posts } = api.post.getAllPosts.useQuery();

  const { mutate } = api.post.create.useMutation({
    onSuccess: () => {
      utils.post.invalidate();
    },
  });

  const { mutate: deletePost, isPending: isPendingDelete } =
    api.post.deletePost.useMutation({
      onSuccess: () => utils.post.invalidate(),
    });

  const [optimisticTitle, setOptimisticTitle] = useOptimistic(
    "",
    (_: string, newTitle): string => {
      return newTitle as unknown as string;
    },
  );

  async function handleSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    setOptimisticTitle(title);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    mutate({ name: title });
  }

  return (
    <section>
      <form action={handleSubmit} className="flex flex-col gap-2">
        <Input
          disabled={pending}
          name="title"
          type="text"
          placeholder="Enter post"
        />
        <Button type="submit" disabled={pending}>
          {pending ? "Creating post..." : "Create post"}
        </Button>
      </form>

      {optimisticTitle !== "" && <h1>{optimisticTitle}(submitting..)</h1>}

      {posts?.map((p) => (
        <div key={p.id} className="my-2 flex justify-between">
          <h1>{p.name}</h1>
          <Button
            variant="destructive"
            disabled={isPendingDelete}
            onClick={() => {
              deletePost({ id: p.id });
            }}
            size="icon"
          >
            <Trash />
          </Button>
        </div>
      ))}
    </section>
  );
}
