
import Link from 'next/link';
import { FC } from 'react';

const practiceExams = [
  { id: 'Set-01-RPC-Book1-General', name: 'Set 1: RPC Book 1', topic: 'General Provisions, Felonies, Circumstances' },
  { id: 'Set-02-RPC-Book2-Part1', name: 'Set 2: RPC Book 2 (Part 1)', topic: 'Crimes Against National Security & Public Order' },
  { id: 'Set-03-RPC-Book2-Part2', name: 'Set 3: RPC Book 2 (Part 2)', topic: 'Crimes Against Public Interest & Morals' },
  { id: 'Set-04-RPC-Book2-Part3', name: 'Set 4: RPC Book 2 (Part 3)', topic: 'Crimes Against Persons' },
  { id: 'Set-05-RPC-Book2-Part4', name: 'Set 5: RPC Book 2 (Part 4)', topic: 'Crimes Against Property & Civil Status' },
  { id: 'Set-06-Criminal-Procedure', name: 'Set 6: Criminal Procedure', topic: 'Prosecution, Arrest, Bail, Arraignment' },
  { id: 'Set-07-Evidence', name: 'Set 7: Evidence', topic: 'Rules on Admissibility, Testimonial, Documentary' },
  { id: 'Set-08-Special-Laws-Part1', name: 'Set 8: Special Laws (Part 1)', topic: 'RA 9165, RA 9514, RA 10591' },
  { id: 'Set-09-Special-Laws-Part2', name: 'Set 9: Special Laws (Part 2)', topic: 'RA 9262, RA 7610, RA 9208' },
  { id: 'Set-10-Comprehensive-Mixed', name: 'Set 10: Comprehensive', topic: 'Mixed Topics - Full Review' },
  { id: 'Set-11-LEA-General', name: 'Set 11: LEA General', topic: 'Law Enforcement Administration' },
  { id: 'Set-12-Criminalistics-Part1', name: 'Set 12: Criminalistics Part 1', topic: 'Forensics, Photography, Fingerprints' },
  { id: 'Set-13-Criminalistics-Part2', name: 'Set 13: Criminalistics Part 2', topic: 'Ballistics, Chemistry, Toxicology' },
  { id: 'Set-14-CDI-Investigation', name: 'Set 14: Crime Detection', topic: 'Investigation Procedures' },
  { id: 'Set-15-SCE-Theories', name: 'Set 15: Sociology & Ethics', topic: 'Criminological Theories' },
  { id: 'Set-16-CA-Corrections', name: 'Set 16: Corrections', topic: 'Correctional Administration' },
  { id: 'Set-17-Comprehensive-AllSubjects', name: 'Set 17: Comprehensive', topic: 'All 6 CLE Subjects Mixed' },
];

const PracticePage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Practice Exams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practiceExams.map((exam) => (
          <Link key={exam.id} href={`/practice/${exam.id}`} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{exam.name}</h2>
            <p className="text-gray-600">{exam.topic}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PracticePage;
