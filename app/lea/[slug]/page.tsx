// app/lea/[slug]/page.tsx
import { getModuleContent, getAllModuleIds } from '@/lib/content';
import ModuleContent from '@/components/ModuleContent';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const modules = getAllModuleIds('lea');
  return modules;
}

export default async function ModulePage({
  params,
}: {
  params: { slug: string };
}) {
  const module = await getModuleContent('lea', params.slug);

  if (!module) {
    notFound();
  }

  return <ModuleContent {...module} />;
}