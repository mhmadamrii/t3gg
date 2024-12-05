import { api } from "~/trpc/server";
import { CreateUser } from "../_components/create-user";

export default async function Page() {
  const users = await api.user.getUsers();

  return (
    <section className="mx-auto max-w-3xl px-4">
      <h1>Invalidate problem</h1>
      <CreateUser />
      {users.map((u) => (
        <div key={u.id} className="h-24 border p-4">
          <h1 className="text-md font-bold">{u.name}</h1>
          <h1 className="text-md font-bold">{u.email}</h1>
        </div>
      ))}
    </section>
  );
}
