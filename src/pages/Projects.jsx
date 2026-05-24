import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { MagicCard } from '../components/ui/magic-card';

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

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay: i * 0.12 },
  }),
};

const Projects = () => {
  const { dark } = useTheme();
  const panel = dark ? 'bg-matte-pattern' : 'bg-stone-50';
  const title = dark ? 'text-stone-50' : 'text-stone-950';
  const body = dark ? 'text-stone-300' : 'text-stone-700';
  const card = dark
    ? 'border-stone-800/60 bg-stone-900/40 backdrop-blur-sm'
    : 'border-stone-200/80 bg-white/60 backdrop-blur-sm';

  return (
    <motion.section
      className={`min-h-screen px-4 py-16 transition-colors duration-200 sm:px-6 sm:py-24 md:py-32 ${panel}`}
      id="Projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.p
          className="text-3xl font-semibold uppercase tracking-wide text-brand-gold sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
        >
          Projects
        </motion.p>
        <motion.h1
          className={`mt-3 max-w-3xl text-base font-medium leading-relaxed sm:text-lg md:text-xl ${title}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
        </motion.h1>

        <div className="mt-8 space-y-5 sm:mt-14 sm:space-y-8">
          {projects.map(({ organization, location, name, date, bullets, tools }, i) => (
            <motion.article
              key={name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              <MagicCard
                className={`group relative overflow-hidden rounded-sm border border-l-[3px] border-l-brand-gold p-4 pl-5 transition-colors duration-200 hover:border-brand-gold/40 hover:border-l-brand-gold sm:p-6 sm:pl-7 md:p-8 md:pl-9 ${card}`}
                gradientSize={250}
                gradientColor={dark ? '#C9A22715' : '#C9A22710'}
                gradientFrom="#C9A227"
                gradientTo="#44403c"
                dark={dark}
              >

              <div className="grid gap-5 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
                <div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h2 className={`text-lg font-semibold tracking-tight sm:text-xl md:text-2xl ${title}`}>
                        {name}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-brand-gold-light">
                        {organization} · {location}
                      </p>
                    </div>
                    <p className={`text-xs tabular-nums tracking-wide ${body}`}>{date}</p>
                  </div>

                  <ul className={`mt-4 space-y-2.5 text-sm leading-relaxed sm:mt-5 sm:space-y-3 sm:text-[0.94rem] ${body}`}>
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2 sm:gap-3">
                        <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-brand-gold/80" aria-hidden />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <aside className="flex flex-wrap content-start gap-1.5 border-t border-stone-800/20 pt-4 lg:border-l lg:border-t-0 lg:border-stone-800/40 lg:pl-6 lg:pt-0">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="h-fit rounded-sm border border-brand-gold/20 bg-brand-gold/5 px-2 py-0.5 text-xs font-medium text-brand-gold-light"
                    >
                      {tool}
                    </span>
                  ))}
                </aside>
              </div>
              </MagicCard>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
