import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),

  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  deletePost: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
