import Link from 'next/link';
import { BookOpen, Shield, Search, Building, CheckSquare, GraduationCap, Target, Gavel, Fingerprint, Users } from 'lucide-react';

const stats = [
  { value: '6', label: 'Major Subjects', icon: <GraduationCap className="w-8 h-8" /> },
  { value: '60+', label: 'Study Modules', icon: <BookOpen className="w-8 h-8" /> },
  { value: '17', label: 'Practice Exam Sets', icon: <CheckSquare className="w-8 h-8" /> },
  { value: '500+', label: 'Practice Questions', icon: <Target className="w-8 h-8" /> },
];

const reviewerSections = [
    { title: "Criminal Jurisprudence & Procedure (CLJ)", description: "Covers the Revised Penal Code, criminal procedure, evidence, and related special laws.", icon: <Gavel className="w-10 h-10" />, href: "/part-1" },
    { title: "Law Enforcement Administration (LEA)", description: "Police organization, management, and the broader aspects of law enforcement.", icon: <Shield className="w-10 h-10" />, href: "/lea" },
    { title: "Criminalistics", description: "Scientific methods in crime detection, including forensics, dactyloscopy, and polygraphy.", icon: <Fingerprint className="w-10 h-10" />, href: "/criminalistics" },
    { title: "Crime Detection & Investigation (CDI)", description: "Techniques for investigating crimes, including special procedures and protocols.", icon: <Search className="w-10 h-10" />, href: "/cdi" },
    { title: "Sociology of Crimes & Ethics (SCE)", description: "Study of criminal behavior, ethics, and community relations.", icon: <Users className="w-10 h-10" />, href: "/sce" },
    { title: "Correctional Administration (CA)", description: "Management of jails, prisons, and non-institutional correction programs.", icon: <Building className="w-10 h-10" />, href: "/ca" },
];

const studyTips = [
    { title: 'Active Recall', description: 'Instead of passively reading, actively try to retrieve information from memory.', icon: <GraduationCap className="w-8 h-8" /> },
    { title: 'Spaced Repetition', description: 'Review material at increasing intervals to improve long-term retention.', icon: <Target className="w-8 h-8" /> },
    { title: 'Feynman Technique', description: 'Explain a concept in simple terms as if you were teaching it to someone else.', icon: <BookOpen className="w-8 h-8" /> },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-brand-navy text-white rounded-xl shadow-2xl" style={{backgroundImage: 'linear-gradient(rgba(26, 54, 93, 0.9), rgba(26, 54, 93, 0.9)), url(/path-to-your-background-image.jpg)'}}>
        <h1 className="text-5xl font-extrabold font-serif text-brand-gold">Your Ultimate CLE Reviewer</h1>
        <p className="text-xl mt-4 max-w-3xl mx-auto text-gray-300">Your all-in-one resource for acing the Criminology Licensure Examination (CLE), fully aligned with the official curriculum.</p>
        <Link href="/part-1">
          <span className="mt-8 inline-block bg-brand-gold text-brand-navy font-bold text-lg py-4 px-8 rounded-lg hover-lift transition-transform">
            Start Reviewing Now
          </span>
        </Link>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card dark:bg-gray-800/50 p-8 rounded-xl shadow-lg flex flex-col items-center">
              <div className="text-brand-gold mb-4">{stat.icon}</div>
              <p className="text-4xl font-bold text-brand-navy dark:text-white">{stat.value}</p>
              <p className="text-lg text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Review Areas Section */}
      <section className="py-16">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold font-serif text-brand-navy dark:text-brand-light">The 6 Major CLE Subjects</h2>
            <p className="text-lg mt-2 text-muted-foreground">Comprehensive coverage of all six major subjects of the official CLE Table of Specifications.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewerSections.map((section) => (
            <Link key={section.title} href={section.href} passHref>
              <div className={`bg-card dark:bg-gray-800/50 rounded-xl shadow-lg p-8 flex flex-col items-center text-center h-full ${section.href === '#' ? 'cursor-not-allowed opacity-70' : 'hover-lift cursor-pointer'}`}>
                <div className="text-brand-gold mb-4">{section.icon}</div>
                <h3 className="text-2xl font-bold font-serif text-brand-navy dark:text-brand-gold">{section.title}</h3>
                <p className="text-muted-foreground mt-2 flex-grow">{section.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Study Tips Section */}
      <section className="py-16 bg-brand-light dark:bg-gray-900/40 rounded-xl">
        <div className="text-center mb-12 px-4">
            <h2 className="text-4xl font-extrabold font-serif text-brand-navy dark:text-brand-light">Proven Study Techniques</h2>
            <p className="text-lg mt-2 text-muted-foreground">Adopt effective strategies to maximize your learning.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 px-8">
          {studyTips.map((tip) => (
            <div key={tip.title} className="bg-card dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
              <div className="text-brand-gold mb-4">{tip.icon}</div>
              <h3 className="text-xl font-bold font-serif text-brand-navy dark:text-brand-gold">{tip.title}</h3>
              <p className="text-muted-foreground mt-2">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
