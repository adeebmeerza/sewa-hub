import { notFound } from "next/navigation";

export async function fetchPageData(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page/${slug}`);
  if (!res.ok) return notFound();
  return res.json();
}
