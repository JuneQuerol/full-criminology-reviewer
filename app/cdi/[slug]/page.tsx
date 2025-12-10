// app/cdi/[slug]/page.tsx
import { getModuleContent, getAllModuleIds } from '@/lib/content';
import ModuleContent from '@/components/ModuleContent';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const modules = getAllModuleIds('cdi');
  return modules;
}

export default async function ModulePage({
  params,
}: {
  params: { slug: string };
}) {
  const module = await getModuleContent('cdi', params.slug);

  if (!module) {
    notFound();
  }

  return <ModuleContent {...module} />;
}