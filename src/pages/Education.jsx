import { useTheme } from '../context/ThemeContext';

const experiences = [
  {
    company: 'AT&T',
    location: 'Atlanta, GA',
    role: 'Embedded & Network Engineer',
    date: 'Jul 2025 - Present',
    bullets: [
      'Developed a Linux embedded application in C with the Legato Application Framework to coordinate dual Snapdragon Auto 5G modems through event-driven IPC, state synchronization, and network failover handling.',
      'Implemented LTE and 5G NR modem synchronization and handoff logic for legacy IoT platforms, targeting deployment across automotive and large-scale IoT modem systems.',
      'Built a Python network automation pipeline with Paramiko SSH orchestration and Pandas audit processing to validate configurations across 300+ enterprise routers, reducing manual audit time by 99%.',
      'Created an automated workflow orchestration system with Selenium and React to generate and submit large-scale operational work tickets, increasing processing throughput by 500%.',
    ],
    tools: [
      'C',
      'Embedded Linux',
      'Legato',
      'IPC',
      '5G NR',
      'LTE',
      'Python',
      'Paramiko',
      'Pandas',
      'Selenium',
      'React',
    ],
  },
  {
    company: 'MercuryVote',
    location: 'New York, NY',
    role: 'Full Stack Engineer',
    date: 'Dec 2024 - Jul 2025',
    bullets: [
      'Designed and deployed a responsive company frontend using React, TypeScript, and Tailwind CSS, hosted on Vercel for performant and scalable delivery.',
      'Implemented backend support for secure authentication and authorization workflows using OAuth2 and JWT.',
      'Added advanced security measures including PostgreSQL Row-Level Security and discretionary access controls to protect sensitive election data.',
    ],
    tools: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Vercel',
      'OAuth2',
      'JWT',
      'PostgreSQL',
      'Row-Level Security',
    ],
  },
];

const Education = () => {
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
    <section
      id="Experience"
      className={`min-h-screen px-6 py-24 transition-colors duration-200 md:py-28 ${panel}`}
    >
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-4 text-5xl font-semibold leading-tight text-brand-gold sm:text-6xl lg:text-7xl">
          Experience
        </p>
        <h1 className={`max-w-4xl text-2xl font-semibold leading-snug sm:text-3xl ${title}`}>
          Engineering work across embedded systems, automation, and secure web platforms.
        </h1>

        <div className="mt-10 grid gap-6">
          {experiences.map(({ company, location, role, date, bullets, tools }) => (
            <article key={`${company}-${role}`} className={`border p-6 ${card}`}>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className={`text-2xl font-semibold ${title}`}>{company}</h2>
                      <p className="mt-1 text-brand-gold-light">{role}</p>
                    </div>
                    <p className={`text-sm ${body}`}>
                      {location} · {date}
                    </p>
                  </div>

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

export default Education;
