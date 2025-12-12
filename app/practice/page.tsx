import Link from 'next/link';
import { FC } from 'react';
import { ClipboardList, BookOpen, Scale, Shield, Microscope, Search, Users, Building } from 'lucide-react';

const practiceExams = [
  // CLJ - Criminal Law & Jurisprudence (10 sets)
  { id: 'CLJ-Mock-Exam-1', name: 'CLJ Mock Exam 1', topic: 'Criminal Law (RPC Book 1) - 30 items', icon: Scale, category: 'CLJ' },
  { id: 'Set-01-RPC-Book1-General', name: 'Set 1: RPC Book 1', topic: 'General Provisions, Felonies, Circumstances', icon: Scale, category: 'CLJ' },
  { id: 'Set-02-RPC-Book2-Part1', name: 'Set 2: RPC Book 2 (Part 1)', topic: 'Crimes Against National Security & Public Order', icon: Scale, category: 'CLJ' },
  { id: 'Set-03-RPC-Book2-Part2', name: 'Set 3: RPC Book 2 (Part 2)', topic: 'Crimes Against Public Interest & Morals', icon: Scale, category: 'CLJ' },
  { id: 'Set-04-RPC-Book2-Part3', name: 'Set 4: RPC Book 2 (Part 3)', topic: 'Crimes Against Persons', icon: Scale, category: 'CLJ' },
  { id: 'Set-05-RPC-Book2-Part4', name: 'Set 5: RPC Book 2 (Part 4)', topic: 'Crimes Against Property & Civil Status', icon: Scale, category: 'CLJ' },
  { id: 'Set-06-Criminal-Procedure', name: 'Set 6: Criminal Procedure', topic: 'Prosecution, Arrest, Bail, Arraignment', icon: BookOpen, category: 'CLJ' },
  { id: 'Set-07-Evidence', name: 'Set 7: Evidence', topic: 'Rules on Admissibility, Testimonial, Documentary', icon: BookOpen, category: 'CLJ' },
  { id: 'Set-08-Special-Laws-Part1', name: 'Set 8: Special Laws (Part 1)', topic: 'RA 9165, RA 9514, RA 10591', icon: BookOpen, category: 'CLJ' },
  { id: 'Set-09-Special-Laws-Part2', name: 'Set 9: Special Laws (Part 2)', topic: 'RA 9262, RA 7610, RA 9208', icon: BookOpen, category: 'CLJ' },

  // LEA - Law Enforcement Administration (4 sets)
  { id: 'Set-11-LEA-General', name: 'Set 11: LEA General', topic: 'Law Enforcement Administration', icon: Shield, category: 'LEA' },
  { id: 'Set-18-LEA-Organization-Leadership', name: 'Set 18: LEA Organization', topic: 'PNP Structure, NAPOLCOM, Leadership', icon: Shield, category: 'LEA' },
  { id: 'Set-19-LEA-Operations-PCR', name: 'Set 19: LEA Operations', topic: 'Patrol, Traffic, Community Relations', icon: Shield, category: 'LEA' },
  { id: 'Set-20-LEA-Planning-Ethics', name: 'Set 20: LEA Planning & Ethics', topic: 'Planning, Human Rights, Comparative Systems', icon: Shield, category: 'LEA' },

  // CRIM - Criminalistics (5 sets)
  { id: 'Set-12-Criminalistics-Part1', name: 'Set 12: Criminalistics Part 1', topic: 'Forensics, Photography, Fingerprints', icon: Microscope, category: 'CRIM' },
  { id: 'Set-13-Criminalistics-Part2', name: 'Set 13: Criminalistics Part 2', topic: 'Ballistics, Chemistry, Toxicology', icon: Microscope, category: 'CRIM' },
  { id: 'Set-21-CRIM-Dactyloscopy', name: 'Set 21: Dactyloscopy', topic: 'Fingerprints, Personal Identification', icon: Microscope, category: 'CRIM' },
  { id: 'Set-22-CRIM-Ballistics', name: 'Set 22: Ballistics', topic: 'Firearms, Gunshot Analysis, RA 10591', icon: Microscope, category: 'CRIM' },
  { id: 'Set-23-CRIM-QD-Chemistry', name: 'Set 23: QD & Chemistry', topic: 'Questioned Documents, Forensic Chemistry', icon: Microscope, category: 'CRIM' },

  // CDI - Crime Detection & Investigation (4 sets)
  { id: 'Set-14-CDI-Investigation', name: 'Set 14: Crime Detection', topic: 'Investigation Procedures', icon: Search, category: 'CDI' },
  { id: 'Set-24-CDI-Fundamentals', name: 'Set 24: CDI Fundamentals', topic: 'Crime Scene, Evidence, Chain of Custody', icon: Search, category: 'CDI' },
  { id: 'Set-25-CDI-Special-Crimes', name: 'Set 25: Special Crimes', topic: 'Homicide, Robbery, Kidnapping, Arson', icon: Search, category: 'CDI' },
  { id: 'Set-26-CDI-Interview-Intel', name: 'Set 26: Interview & Intel', topic: 'Interrogation, Surveillance, Intelligence', icon: Search, category: 'CDI' },

  // SCE - Sociology of Crimes & Ethics (4 sets)
  { id: 'Set-15-SCE-Theories', name: 'Set 15: Sociology & Ethics', topic: 'Criminological Theories', icon: Users, category: 'SCE' },
  { id: 'Set-27-SCE-Classical-Positivist', name: 'Set 27: Classical & Positivist', topic: 'Beccaria, Lombroso, Ferri, Garofalo', icon: Users, category: 'SCE' },
  { id: 'Set-28-SCE-Sociological', name: 'Set 28: Sociological Theories', topic: 'Strain, Control, Labeling Theories', icon: Users, category: 'SCE' },
  { id: 'Set-29-SCE-Ethics-HR', name: 'Set 29: Ethics & Victimology', topic: 'Professional Ethics, Victim Rights', icon: Users, category: 'SCE' },

  // CA - Correctional Administration (4 sets)
  { id: 'Set-16-CA-Corrections', name: 'Set 16: Corrections', topic: 'Correctional Administration', icon: Building, category: 'CA' },
  { id: 'Set-30-CA-Institutional', name: 'Set 30: Institutional', topic: 'BuCor, BJMP, Prison Systems', icon: Building, category: 'CA' },
  { id: 'Set-31-CA-NonInstitutional', name: 'Set 31: Non-Institutional', topic: 'Probation, Parole, Executive Clemency', icon: Building, category: 'CA' },
  { id: 'Set-32-CA-Penology', name: 'Set 32: Penology', topic: 'Punishment Theories, Rehabilitation', icon: Building, category: 'CA' },

  // Mixed/Comprehensive (2 sets)
  { id: 'Set-10-Comprehensive-Mixed', name: 'Set 10: Comprehensive', topic: 'Mixed Topics - Full Review', icon: ClipboardList, category: 'Mixed' },
  { id: 'Set-17-Comprehensive-AllSubjects', name: 'Set 17: Comprehensive', topic: 'All 6 CLE Subjects Mixed', icon: ClipboardList, category: 'Mixed' },
];

const categoryColors: Record<string, string> = {
  CLJ: 'bg-blue-500',
  LEA: 'bg-green-500',
  CRIM: 'bg-purple-500',
  CDI: 'bg-orange-500',
  SCE: 'bg-pink-500',
  CA: 'bg-teal-500',
  Mixed: 'bg-brand-gold',
};

const PracticePage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-serif text-brand-navy dark:text-brand-gold mb-4">Practice Exams</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Test your knowledge with our comprehensive practice exams covering all 6 CLE subjects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practiceExams.map((exam) => {
          const IconComponent = exam.icon;
          return (
            <Link
              key={exam.id}
              href={`/practice/${exam.id}`}
              className="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-brand-gold hover:border-l-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-gold/10 dark:bg-brand-gold/20 rounded-lg flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold text-white px-2 py-0.5 rounded ${categoryColors[exam.category]}`}>
                      {exam.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold font-serif text-brand-navy dark:text-brand-gold group-hover:underline mb-2">
                    {exam.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{exam.topic}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm font-semibold text-brand-navy dark:text-brand-gold group-hover:text-brand-gold dark:group-hover:text-white transition-colors">
                  Start Practice →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PracticePage;
