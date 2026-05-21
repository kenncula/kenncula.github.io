import { useTheme } from '../context/ThemeContext';

const projects = [
  {
    organization: 'AT&T',
    location: 'Atlanta, GA',
    name: 'Innovation Labs Lead',
    date: 'Jan 2025 - Present',
    bullets: [
      'Led hands-on technical workshops for 50+ participants across the TDP and AT&T community, covering embedded systems, distributed systems, soldering, and network fundamentals.',
      'Architected and managed development of a Financial Management System for the TDP community, leading a 15-person cross-functional frontend and backend team from concept through production delivery.',
    ],
    tools: [
      'Embedded Systems',
      'Distributed Systems',
      'Network Fundamentals',
      'Soldering',
      'React',
      'Backend Architecture',
      'Team Leadership',
    ],
  },
  {
    organization: 'Cornell University',
    location: 'Ithaca, NY',
    name: 'Distributed Systems Labs and Framework',
    date: 'Jan 2024 - May 2024',
    bullets: [
      'Implemented a fault-tolerant distributed ledger using Multi-Paxos replication and primary-backup failover to maintain consistency under simulated server failures.',
      'Designed sharding and load-balancing mechanisms to improve distributed workload scalability and replica coordination efficiency.',
    ],
    tools: [
      'Multi-Paxos',
      'Primary-Backup Failover',
      'Sharding',
      'Load Balancing',
      'Distributed Ledger',
      'Replication',
      'Fault Tolerance',
    ],
  },
];

const Projects = () => {
  const { dark } = useTheme();
  const panel = dark ? 'bg-matte-pattern' : 'bg-stone-50';
  const title = dark ? 'text-stone-50' : 'text-stone-950';
  const body = dark ? 'text-stone-300' : 'text-stone-700';
  const card = dark
    ? 'border-stone-800/80 bg-black/15'
    : 'border-stone-200 bg-white/70';
  const toolCard = dark
    ? 'border-brand-gold/25 bg-brand-gold/5'
    : 'border-brand-gold/35 bg-brand-gold/10';

  return (
    <section className={`min-h-screen px-6 py-24 transition-colors duration-200 md:py-28 ${panel}`} id="Projects">
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-4 text-5xl font-semibold leading-tight text-brand-gold sm:text-6xl lg:text-7xl">
          Projects
        </p>
        {/* <h1 className={`max-w-4xl text-2xl font-semibold leading-snug sm:text-3xl ${title}`}>
          Applied systems projects with real users, real constraints, and distributed infrastructure.
        </h1> */}

        <div className="mt-10 grid gap-6">
          {projects.map(({ organization, location, name, date, bullets, tools }) => (
            <article key={name} className={`border p-6 ${card}`}>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide text-brand-gold">
                    {organization}
                  </p>
                  <h2 className={`mt-3 text-2xl font-semibold ${title}`}>{name}</h2>
                  <p className={`mt-2 text-sm ${body}`}>
                    {location} · {date}
                  </p>

                  <ul className={`mt-5 space-y-3 text-base leading-relaxed ${body}`}>
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-gold" aria-hidden />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <aside className={`border p-4 ${toolCard}`}>
                  <p className="text-xs font-medium uppercase tracking-wide text-brand-gold">
                    {/* Tools & Tech */}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className="border border-brand-gold/30 px-2.5 py-1 text-sm text-brand-gold-light"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </aside>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
