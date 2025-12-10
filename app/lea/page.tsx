
import { getSortedModulesData } from '@/lib/content';
import ModuleCard from '../../components/ModuleCard';

export default function LEA() {
  const modules = getSortedModulesData('lea');
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Law Enforcement Administration (LEA)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map(({ id, title, description }) => (
          <ModuleCard key={id} id={id} title={title} description={description} part="lea" />
        ))}
      </div>
    </div>
  );
}
