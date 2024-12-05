import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),

  getInfiniteUsers: publicProcedure
    .input(z.object({ limit: z.number(), cursor: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;

      const users = await ctx.db.user.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
        orderBy: { id: "asc" },
      });

      const nextCursor = users.length > limit ? users.pop()!.id : null; // Get next cursor if more pages exist

      return {
        users,
        nextCursor,
      };
    }),

  getExternalInfiniteUsers: publicProcedure
    .input(z.object({ limit: z.number(), cursor: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;
      console.log("cursor", cursor);

      // Fetch data from external API
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();

      // Determine start index for pagination
      const startIdx = cursor ? cursor : 0;

      // Slice users array based on the limit and cursor
      const paginatedUsers = users.slice(startIdx, startIdx + limit);

      // Calculate the next cursor based on the slice (if more users exist)
      const nextCursor =
        startIdx + limit < users.length ? startIdx + limit : null;

      return {
        users: paginatedUsers,
        nextCursor,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1), email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),
});
