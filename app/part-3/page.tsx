
import { getSortedModulesData } from '../../lib/content';
import ModuleCard from '../../components/ModuleCard';

export default function Part3() {
  const allModulesData = getSortedModulesData('part-3');
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Part 3: Criminal Procedure</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allModulesData.map(({ id, title, description }) => (
          <ModuleCard key={id} id={id} title={title} description={description} part="part-3" />
        ))}
      </div>
    </div>
  );
}
