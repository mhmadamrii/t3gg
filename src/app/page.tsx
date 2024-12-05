import { api } from "~/trpc/server";
import { AddUser } from "./_components/add-user";

export default async function Page() {
  const users = await api.user.getUsers();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black text-white">
      <h1>Hello World</h1>
      <AddUser />
      <section className="flex flex-col gap-4">
        {users.map((u) => (
          <div key={u.id} className="h-24 border p-4">
            <h1>{u.name}</h1>
            <h1>{u.email}</h1>
          </div>
        ))}
      </section>
    </main>
  );
}
