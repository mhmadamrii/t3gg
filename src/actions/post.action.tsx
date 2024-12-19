"use server";

export async function createPost(prev: string, formData: FormData) {
  console.log("submitting");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const title = formData.get("title");

  return `Field is ${title}`;
}
