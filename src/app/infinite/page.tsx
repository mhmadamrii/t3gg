"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "~/trpc/react";

export default function Page() {
  const { ref, inView } = useInView();

  const { data, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
    api.user.getInfiniteUsers.useInfiniteQuery(
      {
        limit: 2,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
      },
    );

  const {
    data: externalUsers,
    isFetchingNextPage: isFetchingExternalNextPage,
    fetchNextPage: fetchExternalNextPage,
    isLoading: isLoadingExternal,
    hasNextPage: hasNextExternalPage,
  } = api.user.getExternalInfiniteUsers.useInfiniteQuery(
    {
      limit: 2,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    },
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <section className="flex flex-col gap-4">
      <Link href="/" className="block">
        home
      </Link>
      {/* {data?.pages.map((page, idx) => (
        <div key={idx}>
          {page.users?.map((u) => (
            <div key={u.id} className="h-24 border p-4">
              <h1>{u.name}</h1>
              <h1>{u.email}</h1>
            </div>
          ))}
        </div>
      ))} */}
      {externalUsers?.pages.map((page, idx) => (
        <div key={idx}>
          {page.users?.map((u: { name: string; email: string; id: number }) => (
            <div key={u.id} className="h-24 border p-4">
              <h1>{u.name}</h1>
              <h1>{u.email}</h1>
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={() => fetchNextPage()}
        className="rounded-lg bg-blue-500 px-4"
      >
        Fetch next page
      </button>

      <button
        onClick={() => fetchExternalNextPage()}
        className="rounded-lg bg-red-500 px-4"
      >
        Fetch external next page
      </button>

      <div className="h-[200px] border border-red-500" ref={ref}>
        {isFetchingNextPage && "Loading..."}
      </div>
    </section>
  );
}
