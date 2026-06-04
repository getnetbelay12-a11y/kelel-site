import { notFound } from "next/navigation";
import { SeoServicePage } from "@/components/seo-service-page";
import { createSeoMetadata } from "@/lib/seo";
import { findSeoPage, solutionPages } from "@/lib/seo-pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return solutionPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = findSeoPage("solutions", slug);
  if (!page) return {};

  return createSeoMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = findSeoPage("solutions", slug);
  if (!page) notFound();

  return <SeoServicePage page={page} />;
}
