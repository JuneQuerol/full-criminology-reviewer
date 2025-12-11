"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Book, Shield, Microscope, Search, Building, Gavel, Users, Fingerprint, Dna, FileText, Briefcase } from 'lucide-react';

const cleModules = [
  {
    title: 'Criminal Jurisprudence & Procedure (CLJ)',
    short: 'CLJ',
    percentage: '20%',
    icon: <Gavel size={20} />,
    subCategories: [
      {
        part: 'part-1',
        title: 'Book 1: Criminal Law Principles',
        icon: <Book size={20} />,
        modules: [
          { title: 'Fundamentals of Criminal Law', href: '/part-1/Module-1.1-Fundamentals-of-Criminal-Law' },
          { title: 'Felonies (Dolo & Culpa)', href: '/part-1/Module-1.2-Felonies-Dolo-Culpa' },
          { title: 'Circumstances Affecting Liability', href: '/part-1/Module-1.3-Circumstances-Affecting-Liability' },
          { title: 'Persons Criminally Liable', href: '/part-1/Module-1.4-Persons-Criminally-Liable' },
          { title: 'Penalties in General', href: '/part-1/Module-1.5-Penalties-in-General' },
          { title: 'Application & Execution of Penalties', href: '/part-1/Module-1.6-Application-Execution-Penalties' },
          { title: 'Extinction of Criminal Liability', href: '/part-1/Module-1.7-Extinction-Criminal-Liability' },
          { title: 'Civil Liability', href: '/part-1/Module-1.8-Civil-Liability' },
        ],
      },
      {
        part: 'part-2',
        title: 'Book 2: Crimes & Penalties',
        icon: <Shield size={20} />,
        modules: [
          { title: 'Crimes Against National Security', href: '/part-2/Module-2.1-Crimes-Against-National-Security' },
          { title: 'Crimes Against Fundamental Laws', href: '/part-2/Module-2.2-Crimes-Against-Fundamental-Laws' },
          { title: 'Crimes Against Public Order', href: '/part-2/Module-2.3-Crimes-Against-Public-Order' },
          { title: 'Crimes Against Public Interest', href: '/part-2/Module-2.4-Crimes-Against-Public-Interest' },
          { title: 'Crimes Against Public Morals', href: '/part-2/Module-2.5-Crimes-Against-Public-Morals' },
          { title: 'Crimes by Public Officers', href: '/part-2/Module-2.6-Crimes-by-Public-Officers' },
          { title: 'Crimes Against Persons', href: '/part-2/Module-2.7-Crimes-Against-Persons' },
          { title: 'Crimes Against Personal Liberty', href: '/part-2/Module-2.8-Crimes-Against-Personal-Liberty' },
          { title: 'Crimes Against Property', href: '/part-2/Module-2.9-Crimes-Against-Property' },
          { title: 'Crimes Against Chastity', href: '/part-2/Module-2.10-Crimes-Against-Chastity' },
          { title: 'Crimes Against Civil Status', href: '/part-2/Module-2.11-Crimes-Against-Civil-Status' },
          { title: 'Crimes Against Honor', href: '/part-2/Module-2.12-Crimes-Against-Honor' },
          { title: 'Quasi-Offenses', href: '/part-2/Module-2.13-Quasi-Offenses' },
        ],
      },
      {
        part: 'part-3',
        title: 'Criminal Procedure',
        icon: <FileText size={20} />,
        modules: [
          { title: 'General Provisions & Prosecution', href: '/part-3/Module-3.1-General-Provisions-Prosecution' },
          { title: 'Arrest, Bail & Rights of Accused', href: '/part-3/Module-3.2-Arrest-Bail-Rights-Accused' },
          { title: 'Arraignment to Judgment', href: '/part-3/Module-3.3-Arraignment-to-Judgment' },
          { title: 'Search and Seizure', href: '/part-3/Module-3.4-Search-and-Seizure' },
        ],
      },
      {
        part: 'part-4',
        title: 'Law on Evidence',
        icon: <Briefcase size={20} />,
        modules: [
          { title: 'General Principles of Evidence', href: '/part-4/Module-4.1-General-Principles-Evidence' },
          { title: 'Rules on Admissibility', href: '/part-4/Module-4.2-Rules-on-Admissibility' },
          { title: 'Testimonial Evidence', href: '/part-4/Module-4.3-Testimonial-Evidence' },
          { title: 'Documentary & Object Evidence', href: '/part-4/Module-4.4-Documentary-Object-Evidence' },
        ],
      },
      {
        part: 'part-5',
        title: 'Special Penal Laws',
        icon: <Building size={20} />,
        modules: [
          { title: 'Dangerous Drugs Act (RA 9165)', href: '/part-5/Module-5.1-Dangerous-Drugs-Act-RA9165' },
          { title: 'Fire Code & Arson (RA 9514)', href: '/part-5/Module-5.2-Fire-Code-Arson-RA9514' },
          { title: 'Firearms & Ammunition (RA 10591)', href: '/part-5/Module-5.3-Firearms-Ammunition-RA10591' },
          { title: 'VAWC (RA 9262)', href: '/part-5/Module-5.4-VAWC-RA9262' },
          { title: 'Child Abuse (RA 7610)', href: '/part-5/Module-5.5-Child-Abuse-RA7610' },
          { title: 'Anti-Trafficking (RA 9208)', href: '/part-5/Module-5.6-Anti-Trafficking-RA9208' },
          { title: 'Other Special Laws', href: '/part-5/Module-5.7-Other-Special-Laws' },
          { title: 'Cybercrime Prevention Act (RA 10175)', href: '/part-5/Module-5.8-Cybercrime-Prevention-Act-RA10175' },
        ],
      },
    ]
  },
  {
    title: 'Law Enforcement Administration (LEA)',
    short: 'LEA',
    percentage: '15%',
    icon: <Shield size={20} />,
    subCategories: [
      {
        part: 'lea-history',
        title: 'History & Foundations',
        icon: <Book size={20} />,
        modules: [
          { title: 'History of Philippine Law Enforcement', href: '/lea/Module-6.1-History-of-Philippine-Law-Enforcement' },
          { title: 'DILG-PNP Relationship & NAPOLCOM', href: '/lea/Module-6.2-DILG-PNP-Relationship-NAPOLCOM' },
          { title: 'Legal Bases (RA 6975, 8551, 11200)', href: '/lea/Module-6.3-Legal-Bases' },
        ],
      },
      {
        part: 'lea-org',
        title: 'Police Organization',
        icon: <Building size={20} />,
        modules: [
          { title: 'PNP Organizational Structure', href: '/lea/Module-6.4-PNP-Organizational-Structure' },
          { title: 'Principles of Police Organization', href: '/lea/Module-6.5-Principles-of-Police-Organization' },
          { title: 'Line & Staff Functions', href: '/lea/Module-6.6-Line-Staff-Functions' },
        ],
      },
      {
        part: 'lea-admin',
        title: 'Police Administration',
        icon: <Briefcase size={20} />,
        modules: [
          { title: 'Police Planning & Decision Making', href: '/lea/Module-6.7-Police-Planning-Decision-Making' },
          { title: 'Police Personnel Management', href: '/lea/Module-6.8-Police-Personnel-Management' },
        ],
      },
      {
        part: 'lea-ops',
        title: 'Police Operations',
        icon: <Search size={20} />,
        modules: [
          { title: 'Patrol Operations', href: '/lea/Module-6.9-Patrol-Operations' },
          { title: 'Traffic Management & Crime Prevention', href: '/lea/Module-6.10-Traffic-Management-Crime-Prevention' },
          { title: 'Police Field Procedures', href: '/lea/Module-6.15-Police-Field-Procedures' },
        ],
      },
      {
        part: 'lea-lead',
        title: 'Leadership & Management',
        icon: <Users size={20} />,
        modules: [
          { title: 'Police Leadership Theories & Styles', href: '/lea/Module-6.11-Police-Leadership-Theories-Styles' },
          { title: 'Police Logistics & Fiscal Admin', href: '/lea/Module-6.12-Police-Logistics-Fiscal-Administration' },
        ],
      },
      {
        part: 'lea-community',
        title: 'Community Relations & Ethics',
        icon: <Users size={20} />,
        modules: [
          { title: 'Police Community Relations (PCR)', href: '/lea/Module-6.13-Police-Community-Relations' },
          { title: 'Police Ethics, Values & Discipline', href: '/lea/Module-6.14-Police-Ethics-Values-Discipline' },
          { title: 'Human Rights in Law Enforcement', href: '/lea/Module-6.17-Human-Rights-in-Law-Enforcement' },
        ],
      },
      {
        part: 'lea-comparative',
        title: 'Comparative Systems',
        icon: <Shield size={20} />,
        modules: [
          { title: 'Comparative Police Systems', href: '/lea/Module-6.16-Comparative-Police-Systems' },
        ],
      },
    ],
  },
  {
    title: 'Criminalistics',
    short: 'CRIM',
    percentage: '20%',
    icon: <Microscope size={20} />,
    subCategories: [
        {
            part: 'crim-foundations',
            title: 'Foundations of Criminalistics',
            icon: <Book size={20} />,
            modules: [
                { title: 'Intro to Criminalistics & Forensic Science', href: '/criminalistics/Module-7.1-Introduction-Criminalistics-Forensic-Science' },
                { title: 'History & Development (Locard)', href: '/criminalistics/Module-7.2-History-Development' },
                { title: 'Philippine Crime Laboratories', href: '/criminalistics/Module-7.3-Philippine-Crime-Laboratories' },
            ]
        },
        {
            part: 'crim-id',
            title: 'Personal Identification',
            icon: <Fingerprint size={20} />,
            modules: [
                { title: 'Dactyloscopy (Fingerprints)', href: '/criminalistics/Module-7.4-Dactyloscopy' },
                { title: 'DNA Profiling & Analysis', href: '/criminalistics/Module-7.5-DNA-Profiling-Analysis' },
                { title: 'Other Biometric Methods', href: '/criminalistics/Module-7.6-Other-Biometric-Methods' },
            ]
        },
        {
            part: 'crim-docs',
            title: 'Document & Ballistics Exam',
            icon: <FileText size={20} />,
            modules: [
                { title: 'Questioned Documents Examination', href: '/criminalistics/Module-7.7-Questioned-Documents-Examination' },
                { title: 'Handwriting & Typewriting Analysis', href: '/criminalistics/Module-7.8-Handwriting-Typewriting-Analysis' },
                { title: 'Forensic Ballistics', href: '/criminalistics/Module-7.9-Forensic-Ballistics' },
            ]
        },
        {
            part: 'crim-chem',
            title: 'Forensic Chemistry & Biology',
            icon: <Dna size={20} />,
            modules: [
                { title: 'Drug ID & Dangerous Drugs Testing', href: '/criminalistics/Module-7.10-Drug-Identification-Dangerous-Drugs-Testing' },
                { title: 'Toxicology & Poisoning Analysis', href: '/criminalistics/Module-7.11-Toxicology-Poisoning-Analysis' },
                { title: 'Blood Pattern Analysis & Serology', href: '/criminalistics/Module-7.12-Blood-Pattern-Analysis-Serology' },
            ]
        },
        {
            part: 'crim-special',
            title: 'Specialized Fields',
            icon: <Briefcase size={20} />,
            modules: [
                { title: 'Forensic Photography & Documentation', href: '/criminalistics/Module-7.13-Forensic-Photography-Crime-Scene-Documentation' },
                { title: 'Polygraphy & Lie Detection', href: '/criminalistics/Module-7.14-Polygraphy-Lie-Detection' },
                { title: 'Forensic Psychology & Profiling', href: '/criminalistics/Module-7.15-Forensic-Psychology-Criminal-Profiling' },
                { title: 'Forensic Medicine & Pathology Basics', href: '/criminalistics/Module-7.16-Forensic-Medicine-Pathology-Basics' },
            ]
        }
    ],
  },
  {
    title: 'Crime Detection & Investigation (CDI)',
    short: 'CDI',
    percentage: '15%',
    icon: <Search size={20} />,
    subCategories: [
        {
            part: 'cdi-fundamentals',
            title: 'Fundamentals of Investigation',
            icon: <Book size={20} />,
            modules: [
                { title: 'Nature & Principles of Investigation', href: '/cdi/Module-8.1-Nature-Principles-Criminal-Investigation' },
                { title: 'Qualities of a Good Investigator', href: '/cdi/Module-8.2-Qualities-of-a-Good-Investigator' },
                { title: 'Tools of Investigation (3 I\'s)', href: '/cdi/Module-8.3-Tools-of-Investigation' },
            ]
        },
        {
            part: 'cdi-scene',
            title: 'Crime Scene Management',
            icon: <Briefcase size={20} />,
            modules: [
                { title: 'Crime Scene Investigation Procedures', href: '/cdi/Module-8.4-Crime-Scene-Investigation-Procedures' },
                { title: 'Evidence Collection & Chain of Custody', href: '/cdi/Module-8.5-Evidence-Collection-Preservation-Chain-of-Custody' },
            ]
        },
        {
            part: 'cdi-interview',
            title: 'Interview & Interrogation',
            icon: <Users size={20} />,
            modules: [
                { title: 'Interview Techniques & Procedures', href: '/cdi/Module-8.6-Interview-Techniques-Procedures' },
                { title: 'Interrogation & Confession Admissibility', href: '/cdi/Module-8.7-Interrogation-Methods-Confession-Admissibility' },
            ]
        },
        {
            part: 'cdi-intel',
            title: 'Intelligence & Surveillance',
            icon: <Shield size={20} />,
            modules: [
                { title: 'Types of Surveillance', href: '/cdi/Module-8.8-Types-of-Surveillance' },
                { title: 'Undercover Ops & Informant Mgmt', href: '/cdi/Module-8.9-Undercover-Operations-Informant-Management' },
                { title: 'Police Intelligence Operations', href: '/cdi/Module-8.10-Police-Intelligence-Operations' },
            ]
        },
        {
            part: 'cdi-special',
            title: 'Special Investigations',
            icon: <FileText size={20} />,
            modules: [
                { title: 'Homicide, Robbery, Kidnapping', href: '/cdi/Module-8.11-Homicide-Robbery-Kidnapping-Investigation' },
                { title: 'Drug Crimes, Cybercrimes & Arson', href: '/cdi/Module-8.12-Drug-Crimes-Cybercrimes-Arson-Investigation' },
            ]
        },
        {
            part: 'cdi-advanced',
            title: 'Advanced Investigation Topics',
            icon: <Search size={20} />,
            modules: [
                { title: 'Modus Operandi & Criminal Identification', href: '/cdi/Module-8.13-Modus-Operandi-Criminal-Identification' },
                { title: 'Investigative Report Writing', href: '/cdi/Module-8.14-Investigative-Report-Writing' },
            ]
        }
    ],
  },
  {
    title: 'Sociology of Crimes & Ethics (SCE)',
    short: 'SCE',
    percentage: '15%',
    icon: <Users size={20} />,
    subCategories: [
      {
        part: 'sce-foundations',
        title: 'Foundations of Criminology',
        icon: <Book size={20} />,
        modules: [
            { title: 'Intro to Criminology as a Science', href: '/sce/Module-9.1-Introduction-to-Criminology' },
            { title: 'Schools of Criminological Thought', href: '/sce/Module-9.2-Schools-of-Criminological-Thought' },
            { title: 'Crime, Criminal, and Criminality', href: '/sce/Module-9.3-Crime-Criminal-Criminality-Defined' },
        ]
      },
      {
        part: 'sce-theories',
        title: 'Theories of Crime Causation',
        icon: <Briefcase size={20} />,
        modules: [
            { title: 'Classical & Neoclassical Theories', href: '/sce/Module-9.4-Classical-Neoclassical-Theories' },
            { title: 'Biological & Psychological Theories', href: '/sce/Module-9.5-Biological-Psychological-Theories' },
            { title: 'Sociological Theories', href: '/sce/Module-9.6-Sociological-Theories' },
        ]
      },
      {
        part: 'sce-populations',
        title: 'Special Populations',
        icon: <Users size={20} />,
        modules: [
            { title: 'Juvenile Delinquency & RA 9344', href: '/sce/Module-9.7-Juvenile-Delinquency-RA9344' },
            { title: 'Victimology & Victim Rights', href: '/sce/Module-9.8-Victimology-Victim-Rights' },
        ]
      },
      {
        part: 'sce-behavior',
        title: 'Human Behavior',
        icon: <Shield size={20} />,
        modules: [
            { title: 'Abnormal Behavior & Mental Disorders', href: '/sce/Module-9.9-Abnormal-Behavior-Mental-Disorders' },
            { title: 'Crisis Intervention & Hostage Negotiation', href: '/sce/Module-9.10-Crisis-Intervention-Hostage-Negotiation' },
        ]
      },
      {
        part: 'sce-ethics',
        title: 'Professional Ethics',
        icon: <Gavel size={20} />,
        modules: [
            { title: 'Police Ethics & RA 6713', href: '/sce/Module-9.11-Police-Ethics-RA6713' },
            { title: 'Human Rights & Use of Force', href: '/sce/Module-9.12-Human-Rights-in-Law-Enforcement' },
        ]
      }
    ],
  },
  {
    title: 'Correctional Administration (CA)',
    short: 'CA',
    percentage: '15%',
    icon: <Building size={20} />,
    subCategories: [
      {
        part: 'ca-foundations',
        title: 'Foundations of Corrections',
        icon: <Book size={20} />,
        modules: [
          { title: 'Intro to Corrections (Punishment)', href: '/ca/Module-10.1-Introduction-to-Corrections' },
          { title: 'History of Corrections', href: '/ca/Module-10.2-History-of-Corrections' },
          { title: 'Philippine Correctional System', href: '/ca/Module-10.3-Philippine-Correctional-System-Overview' },
        ]
      },
      {
        part: 'ca-institutional',
        title: 'Institutional Corrections',
        icon: <Building size={20} />,
        modules: [
          { title: 'Bureau of Corrections (BuCor)', href: '/ca/Module-10.4-Bureau-of-Corrections-BuCor' },
          { title: 'BJMP', href: '/ca/Module-10.5-Bureau-of-Jail-Management-Penology-BJMP' },
          { title: 'Prisoner Classification & Security', href: '/ca/Module-10.6-Prisoner-Classification-Security-Levels' },
        ]
      },
      {
        part: 'ca-management',
        title: 'Prison Management',
        icon: <Briefcase size={20} />,
        modules: [
          { title: 'Inmate Discipline, Privileges & Programs', href: '/ca/Module-10.7-Inmate-Discipline-Privileges-Programs' },
          { title: 'Prison Industries, Health & Sanitation', href: '/ca/Module-10.8-Prison-Industries-Health-Sanitation' },
        ]
      },
      {
        part: 'ca-non-institutional',
        title: 'Non-Institutional Corrections',
        icon: <FileText size={20} />,
        modules: [
          { title: 'Probation (PD 968) & Parole', href: '/ca/Module-10.9-Probation-Parole-Procedures' },
          { title: 'Executive Clemency & GCTA (RA 10592)', href: '/ca/Module-10.10-Executive-Clemency-GCTA' },
        ]
      },
      {
        part: 'ca-rehab',
        title: 'Rehabilitation',
        icon: <Users size={20} />,
        modules: [
          { title: 'Therapeutic Community & Drug Rehab', href: '/ca/Module-10.11-Therapeutic-Community-Drug-Rehabilitation' },
          { title: 'Reintegration, Aftercare & Restorative Justice', href: '/ca/Module-10.12-Reintegration-Aftercare-Restorative-Justice' },
        ]
      }
    ],
  }
];

const Sidebar = () => {
  const pathname = usePathname();
  const [openMajor, setOpenMajor] = useState(() => {
    for (const major of cleModules) {
      if (major.subCategories.some(sc => sc.modules.some(mod => mod.href === pathname))) {
        return major.title;
      }
    }
    // Fallback for parent paths
    const currentMajor = cleModules.find(major => pathname.startsWith(`/${major.short.toLowerCase()}`));
    return currentMajor?.title || null;
  });

  const [openSub, setOpenSub] = useState(() => {
    for (const major of cleModules) {
      const sub = major.subCategories.find(sc => sc.modules.some(mod => mod.href === pathname));
      if (sub) return sub.part;
    }
    return null;
  });

  const toggleMajor = (title: string) => {
    setOpenMajor(openMajor === title ? null : title);
  };

  const toggleSub = (part: string) => {
    setOpenSub(openSub === part ? null : part);
  };

  return (
    <aside className="w-80 bg-brand-light/50 dark:bg-gray-900/60 border-r border-gray-200 dark:border-gray-800 hidden lg:block no-print">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-brand-navy dark:text-brand-light font-serif">CLE Review Modules</h2>
      </div>
      <nav className="mt-2 flex-grow">
        <ul>
          {cleModules.map((major) => (
            <li key={major.title} className="px-2 mb-1">
              <button
                onClick={() => toggleMajor(major.title)}
                className="w-full flex justify-between items-center p-3 rounded-md bg-gray-200/50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <div className="flex items-center space-x-3 text-left">
                  <span className="text-brand-gold">{major.icon}</span>
                  <span className="font-semibold text-sm text-gray-800 dark:text-gray-200 text-left">{major.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-gray-500">{major.percentage}</span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-500 transition-transform ${openMajor === major.title ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openMajor === major.title ? 'max-h-[1000px]' : 'max-h-0'
                }`}
              >
                <ul className="pt-1">
                  {major.subCategories.length > 0 ? major.subCategories.map((sub) => (
                    <li key={sub.part} className="mb-1 pl-4">
                      <button
                        onClick={() => toggleSub(sub.part)}
                        className="w-full flex justify-between items-center p-2.5 rounded-md hover:bg-gray-200/80 dark:hover:bg-gray-700/60"
                      >
                         <div className="flex items-center space-x-3 text-left">
                           <span className="text-brand-gold">{sub.icon}</span>
                           <span className="font-medium text-sm text-gray-700 dark:text-gray-300 text-left">{sub.title}</span>
                         </div>
                        <ChevronDown
                          size={18}
                          className={`text-gray-500 transition-transform ${openSub === sub.part ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openSub === sub.part ? 'max-h-screen' : 'max-h-0'
                        }`}
                      >
                        {sub.modules.length > 0 ? (
                          <ul className="py-1 pl-8 pr-1 space-y-1">
                            {sub.modules.map((mod) => (
                              <li key={mod.href}>
                                <Link href={mod.href}>
                                  <span
                                    className={`block p-2 text-sm rounded-md transition-colors text-left ${
                                      pathname === mod.href
                                        ? 'bg-brand-gold/20 text-brand-navy dark:text-brand-gold font-semibold'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-300/50 dark:hover:bg-gray-700/50'
                                    }`}
                                  >
                                    {mod.title}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="pl-8 py-2">
                            <span className="text-xs text-gray-500 italic">Coming soon...</span>
                          </div>
                        )}
                      </div>
                    </li>
                  )) : (
                    <li className="p-3 text-sm flex justify-center text-gray-500">Coming Soon</li>
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;