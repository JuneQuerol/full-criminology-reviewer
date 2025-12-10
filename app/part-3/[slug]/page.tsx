import { getModuleContent, getAllModuleIds } from '@/lib/content';
import ModuleContent from '@/components/ModuleContent';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const modules = getAllModuleIds('part-3');
  return modules;
}

export default async function ModulePage({
  params,
}: {
  params: { slug: string };
}) {
  const module = await getModuleContent('part-3', params.slug);

  if (!module) {
    notFound();
  }

  return <ModuleContent {...module} />;
}
