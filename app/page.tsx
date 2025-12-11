import Link from 'next/link';
import { BookOpen, Shield, Search, Building, CheckSquare, GraduationCap, Target, Gavel, Fingerprint, Users, Calendar, ClipboardCheck, Lightbulb, Clock, Brain, Award } from 'lucide-react';

// PRC Table of Specifications - Official CLE Coverage
const prcTableOfSpecs = [
    {
        title: "Criminal Jurisprudence & Procedure",
        code: "CLJ",
        percentage: "25%",
        topics: "Revised Penal Code, Criminal Procedure, Evidence, Special Laws",
        icon: <Gavel className="w-8 h-8" />,
        href: "/part-1"
    },
    {
        title: "Law Enforcement Administration",
        code: "LEA",
        percentage: "15%",
        topics: "Police Organization, Management, Operations",
        icon: <Shield className="w-8 h-8" />,
        href: "/lea"
    },
    {
        title: "Criminalistics",
        code: "CRIM",
        percentage: "15%",
        topics: "Forensics, Dactyloscopy, Ballistics, Questioned Documents",
        icon: <Fingerprint className="w-8 h-8" />,
        href: "/criminalistics"
    },
    {
        title: "Crime Detection & Investigation",
        code: "CDI",
        percentage: "20%",
        topics: "Investigation Techniques, Special Crime Investigation",
        icon: <Search className="w-8 h-8" />,
        href: "/cdi"
    },
    {
        title: "Sociology of Crimes & Ethics",
        code: "SCE",
        percentage: "10%",
        topics: "Criminal Behavior, Ethics, Human Relations",
        icon: <Users className="w-8 h-8" />,
        href: "/sce"
    },
    {
        title: "Correctional Administration",
        code: "CA",
        percentage: "15%",
        topics: "Penology, Prison Management, Probation & Parole",
        icon: <Building className="w-8 h-8" />,
        href: "/ca"
    },
];

// Upcoming CLE Schedule
const examSchedule = [
    {
        month: "March 2025",
        dates: "March 16-17, 2025",
        deadline: "January 31, 2025",
        status: "Open for Registration"
    },
    {
        month: "September 2025",
        dates: "September 14-15, 2025",
        deadline: "July 31, 2025",
        status: "Coming Soon"
    },
];

// CLE Exam Tips and Tricks
const examTips = [
    {
        title: 'Master the Revised Penal Code',
        description: 'CLJ accounts for 25% of the exam. Focus on Book 1 (general provisions) and common crimes in Book 2. Memorize penalties and mitigating/aggravating circumstances.',
        icon: <Brain className="w-8 h-8" />
    },
    {
        title: 'Create a Study Schedule',
        description: 'Start reviewing 3-4 months before the exam. Dedicate specific days to each subject based on the PRC percentage allocation. Review weak areas more frequently.',
        icon: <Calendar className="w-8 h-8" />
    },
    {
        title: 'Practice Time Management',
        description: 'The exam is 100 questions per day (2 days). Practice answering questions within time limits. Aim for 1 minute per question to leave time for review.',
        icon: <Clock className="w-8 h-8" />
    },
    {
        title: 'Use Mnemonics & Acronyms',
        description: 'Create memory aids for complex topics. For example, use "DICE" for elements of robbery (Unlawful Taking, Intent to Gain, Personal Property, Violence/Intimidation).',
        icon: <Lightbulb className="w-8 h-8" />
    },
    {
        title: 'Take Practice Exams',
        description: 'Simulate exam conditions with timed practice tests. Review wrong answers thoroughly. Focus on understanding concepts, not just memorizing answers.',
        icon: <CheckSquare className="w-8 h-8" />
    },
    {
        title: 'Join Study Groups',
        description: 'Collaborate with fellow reviewees. Teaching others reinforces your knowledge. Discuss difficult topics and share study materials and techniques.',
        icon: <Users className="w-8 h-8" />
    },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative text-center py-24 px-4 bg-gradient-to-br from-brand-navy via-blue-900 to-brand-navy text-white rounded-2xl shadow-2xl overflow-hidden border-2 border-brand-gold">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-16 h-16 text-brand-gold" />
            <GraduationCap className="w-16 h-16 text-brand-gold" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold font-serif text-brand-gold mb-6 leading-tight">
            Your Ultimate CLE Reviewer
          </h1>
          <p className="text-xl md:text-2xl mt-4 max-w-4xl mx-auto text-gray-200 leading-relaxed mb-8">
            Your all-in-one resource for acing the <strong className="text-brand-gold">Criminology Licensure Examination (CLE)</strong>,
            fully aligned with the official PRC curriculum.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <span className="bg-white/10 backdrop-blur-sm border border-brand-gold/50 text-white px-4 py-2 rounded-full text-sm font-semibold">
              6 Major Subjects
            </span>
            <span className="bg-white/10 backdrop-blur-sm border border-brand-gold/50 text-white px-4 py-2 rounded-full text-sm font-semibold">
              200 Practice Questions
            </span>
            <span className="bg-white/10 backdrop-blur-sm border border-brand-gold/50 text-white px-4 py-2 rounded-full text-sm font-semibold">
              PRC-Aligned Content
            </span>
            <span className="bg-white/10 backdrop-blur-sm border border-brand-gold/50 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Free to Use
            </span>
          </div>

          <Link href="/part-1">
            <span className="inline-flex items-center gap-3 bg-brand-gold text-brand-navy font-bold text-lg py-5 px-10 rounded-xl hover-lift transition-all shadow-2xl hover:shadow-brand-gold/50 cursor-pointer">
              <Target className="w-6 h-6" />
              Start Reviewing Now
            </span>
          </Link>
        </div>
      </section>

      {/* Exam Schedule Section - FEATURED */}
      <section className="py-16 px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-10 h-10 text-brand-gold" />
            <h2 className="text-4xl font-extrabold font-serif text-brand-navy dark:text-brand-light">Upcoming CLE Schedule 2025</h2>
          </div>
          <p className="text-lg text-muted-foreground">Official PRC Criminology Licensure Examination Schedule</p>
        </div>

        {/* Table Format */}
        <div className="max-w-6xl mx-auto overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-brand-gold">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-brand-navy to-blue-900 dark:from-gray-900 dark:to-gray-950 text-white">
                <th className="px-6 py-4 text-left font-bold text-lg border-b-2 border-brand-gold">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-brand-gold" />
                    Examination Period
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-bold text-lg border-b-2 border-brand-gold">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-brand-gold" />
                    Exam Dates
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-bold text-lg border-b-2 border-brand-gold">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-brand-gold" />
                    Filing Deadline
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-bold text-lg border-b-2 border-brand-gold">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-brand-gold" />
                    Status
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {examSchedule.map((schedule, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-brand-light dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-5 font-semibold text-brand-navy dark:text-brand-gold text-lg">
                    {schedule.month}
                  </td>
                  <td className="px-6 py-5 text-gray-700 dark:text-gray-200 font-medium">
                    {schedule.dates}
                  </td>
                  <td className="px-6 py-5 text-gray-700 dark:text-gray-200 font-medium">
                    {schedule.deadline}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-block px-4 py-2 rounded-lg font-bold text-sm ${
                      schedule.status === 'Open for Registration'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-400 dark:bg-gray-600 text-white'
                    }`}>
                      {schedule.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Info */}
        <div className="max-w-6xl mx-auto mt-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-brand-gold rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong className="text-brand-navy dark:text-brand-gold">Note:</strong> Registration is done through the PRC Online Services portal.
            Ensure all requirements are prepared before the filing deadline to avoid last-minute issues.
          </p>
        </div>
      </section>

      {/* PRC Table of Specifications - FEATURED */}
      <section className="py-16 bg-brand-light dark:bg-gray-900/40 rounded-xl px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-10 h-10 text-brand-gold" />
            <h2 className="text-4xl font-extrabold font-serif text-brand-navy dark:text-brand-light">PRC Table of Specifications</h2>
          </div>
          <p className="text-lg text-muted-foreground">Official CLE Coverage - 6 Major Subjects (200 Total Questions)</p>
        </div>

        {/* Table Format */}
        <div className="max-w-7xl mx-auto overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-brand-gold">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-brand-navy to-blue-900 dark:from-gray-900 dark:to-gray-950 text-white">
                <th className="px-6 py-4 text-left font-bold text-lg border-b-2 border-brand-gold w-12">
                  <BookOpen className="w-5 h-5 text-brand-gold" />
                </th>
                <th className="px-6 py-4 text-left font-bold text-lg border-b-2 border-brand-gold">
                  Subject Area
                </th>
                <th className="px-6 py-4 text-left font-bold text-lg border-b-2 border-brand-gold">
                  Code
                </th>
                <th className="px-6 py-4 text-center font-bold text-lg border-b-2 border-brand-gold">
                  Weight
                </th>
                <th className="px-6 py-4 text-left font-bold text-lg border-b-2 border-brand-gold">
                  Coverage Topics
                </th>
                <th className="px-6 py-4 text-center font-bold text-lg border-b-2 border-brand-gold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {prcTableOfSpecs.map((subject, index) => (
                <tr
                  key={subject.code}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors group"
                >
                  <td className="px-6 py-5 text-brand-gold group-hover:text-brand-navy dark:group-hover:text-white transition-colors">
                    <Link href={subject.href} className="block">
                      {subject.icon}
                    </Link>
                  </td>
                  <td className="px-6 py-5">
                    <Link href={subject.href} className="block">
                      <div className="font-bold text-lg text-brand-navy dark:text-brand-gold group-hover:underline cursor-pointer">
                        {subject.title}
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-5">
                    <Link href={subject.href} className="block">
                      <span className="inline-block bg-brand-gold/10 dark:bg-brand-gold/20 text-brand-navy dark:text-brand-gold px-3 py-1 rounded-md font-bold text-sm border border-brand-gold cursor-pointer">
                        {subject.code}
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <Link href={subject.href} className="block">
                      <span className="inline-block bg-brand-gold text-brand-navy px-4 py-2 rounded-full font-bold text-base cursor-pointer">
                        {subject.percentage}
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-5 text-gray-700 dark:text-gray-200 text-sm">
                    <Link href={subject.href} className="block cursor-pointer">
                      {subject.topics}
                    </Link>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <Link href={subject.href}>
                      <span className="inline-flex items-center gap-2 bg-brand-navy dark:bg-brand-gold text-white dark:text-brand-navy px-4 py-2 rounded-lg font-semibold text-sm group-hover:bg-brand-gold group-hover:text-brand-navy dark:group-hover:bg-brand-navy dark:group-hover:text-white transition-colors">
                        <Target className="w-4 h-4" />
                        Study Now
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 dark:bg-gray-700/50">
                <td colSpan={3} className="px-6 py-4 text-right font-bold text-brand-navy dark:text-brand-gold">
                  Total Coverage:
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-full font-bold text-base">
                    100%
                  </span>
                </td>
                <td colSpan={2} className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm">
                  200 questions over 2 days
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Quick Stats Cards Below Table */}
        <div className="max-w-7xl mx-auto mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-brand-gold">
            <div className="flex items-center gap-3 mb-2">
              <ClipboardCheck className="w-6 h-6 text-brand-gold" />
              <h3 className="font-bold text-brand-navy dark:text-brand-gold">Total Questions</h3>
            </div>
            <p className="text-3xl font-extrabold text-brand-navy dark:text-white">200</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">100 questions per day</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-brand-gold">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6 text-brand-gold" />
              <h3 className="font-bold text-brand-navy dark:text-brand-gold">Exam Duration</h3>
            </div>
            <p className="text-3xl font-extrabold text-brand-navy dark:text-white">2 Days</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Consecutive testing days</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-brand-gold">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-brand-gold" />
              <h3 className="font-bold text-brand-navy dark:text-brand-gold">Passing Rate</h3>
            </div>
            <p className="text-3xl font-extrabold text-brand-navy dark:text-white">75%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">General passing score</p>
          </div>
        </div>
      </section>

      {/* CLE Tips and Tricks Section - FEATURED */}
      <section className="py-16 px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lightbulb className="w-10 h-10 text-brand-gold" />
            <h2 className="text-4xl font-extrabold font-serif text-brand-navy dark:text-brand-light">CLE Exam Tips & Strategies</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Proven strategies from successful board exam passers to help you ace the Criminology Licensure Examination
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examTips.map((tip, index) => (
            <div
              key={tip.title}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-brand-gold group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-14 h-14 bg-brand-gold/10 dark:bg-brand-gold/20 rounded-lg flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors">
                  {tip.icon}
                </div>
                <div className="flex-grow">
                  <div className="text-xs font-bold text-brand-gold/60 dark:text-brand-gold/80 mb-1">
                    TIP #{index + 1}
                  </div>
                  <h3 className="text-xl font-bold font-serif text-brand-navy dark:text-brand-gold leading-tight">
                    {tip.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {tip.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Study Resources Box */}
        <div className="max-w-7xl mx-auto mt-12 bg-gradient-to-br from-brand-navy to-blue-900 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl p-8 border-2 border-brand-gold">
          <div className="flex items-start gap-4 mb-6">
            <GraduationCap className="w-10 h-10 text-brand-gold flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-brand-gold mb-2">Ready to Start Your Review?</h3>
              <p className="text-gray-200">
                Combine these strategies with our comprehensive study modules for the best results. Each subject is carefully curated to match the PRC Table of Specifications.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-brand-gold/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckSquare className="w-5 h-5 text-brand-gold" />
                <h4 className="font-bold text-white">Practice Questions</h4>
              </div>
              <p className="text-sm text-gray-300">Hundreds of practice questions with detailed explanations</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-brand-gold/30">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-brand-gold" />
                <h4 className="font-bold text-white">Comprehensive Coverage</h4>
              </div>
              <p className="text-sm text-gray-300">All 6 subjects aligned with official PRC standards</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-brand-gold/30">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-brand-gold" />
                <h4 className="font-bold text-white">Track Progress</h4>
              </div>
              <p className="text-sm text-gray-300">Monitor your performance and identify weak areas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto relative bg-gradient-to-br from-brand-navy via-blue-900 to-brand-navy dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl p-12 border-2 border-brand-gold overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Award className="w-12 h-12 text-brand-gold" />
              <GraduationCap className="w-12 h-12 text-brand-gold" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-serif text-brand-gold mb-6 leading-tight">
              Ready to Ace the CLE?
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Start your review today with our comprehensive modules aligned with the official PRC Table of Specifications.
              Join thousands of successful CLE passers who used this platform.
            </p>

            {/* Stats Row */}
            <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-brand-gold/30">
                <div className="text-3xl font-extrabold text-brand-gold mb-1">6</div>
                <div className="text-sm text-gray-300">Complete Subjects</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-brand-gold/30">
                <div className="text-3xl font-extrabold text-brand-gold mb-1">200+</div>
                <div className="text-sm text-gray-300">Practice Questions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-brand-gold/30">
                <div className="text-3xl font-extrabold text-brand-gold mb-1">100%</div>
                <div className="text-sm text-gray-300">PRC-Aligned</div>
              </div>
            </div>

            <Link href="/part-1">
              <span className="inline-flex items-center gap-3 bg-brand-gold text-brand-navy font-bold text-lg md:text-xl py-5 px-12 rounded-xl hover-lift transition-all shadow-2xl hover:shadow-brand-gold/50 cursor-pointer">
                <Target className="w-6 h-6" />
                Begin Your Review Journey
              </span>
            </Link>

            <p className="text-sm text-gray-400 mt-6">
              100% Free • No Registration Required • Start Immediately
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
