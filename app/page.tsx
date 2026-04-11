import Image from "next/image";
import s from "./page.module.css";

const skills = [
  "Play-based, naturalistic intervention (ESDM, PRT, JASPER, Project ImPACT)",
  "Relationship-based, developmentally informed practice",
  "ACT-informed caregiver support and values-based coaching",
  "Co-regulation and emotional development strategies",
  "Communication, social play, and AAC support (including low- and high-tech systems)",
  "Strength-based assessment and observational data analysis",
  "Creation of developmentally aligned supports, visuals, and training resources",
  "Video modeling and in-the-moment coaching",
  "Visual supports, routines, and environment shaping",
];

export default function Home() {
  return (
    <>
      {/* ── Nav ── */}
      <nav className={s.nav}>
        <div />
        <a href="#connect" className={s.navConnect}>
          connect
        </a>
      </nav>

      {/* ── Header ── */}
      <header className={s.header}>
        <Image
          src="/images/logo.png"
          alt="Aline Practice logo"
          width={560}
          height={480}
          className={s.heroLogo}
          priority
        />
      </header>

      {/* ── Values ── */}
      <section className={`${s.section} ${s.values}`}>
        <div className={s.valuesInner}>
          <h2 className={s.valuesHeading}>
            At Aline, we are relationship driven.
          </h2>

          <p className={s.valuesText}>
            Our work is grounded in connection and in noticing opportunities
            within everyday moments. Growth happens through shared experiences,
            through being present, and in how we respond to one another.
            Learning unfolds within relationships, and by staying attuned, we
            recognize meaningful moments and support them with intention.
          </p>

          <p className={s.valuesText}>
            We prioritize pausing and tuning in, creating space to better
            understand and respond to each individual&rsquo;s sensory and
            emotional experience. Through respectful presence and shared
            enjoyment, we join in moments and follow the child&rsquo;s lead.
          </p>

          <p className={s.valuesText}>
            We recognize that development is interconnected. By honoring
            individual differences, we support each child&rsquo;s unique way of
            experiencing the world. This understanding shapes how we align our
            approach across ABA and speech.
          </p>

          <p className={s.valuesGuide}>What guides our work</p>

          <div className={s.principle}>
            <h3 className={s.principleName}>Flexibility</h3>
            <p className={s.valuesText}>
              Staying engaged as things shift. Making space for different ideas,
              changes in plans, and new ways of approaching a moment.
            </p>
          </div>

          <div className={s.principle}>
            <h3 className={s.principleName}>Independence</h3>
            <p className={s.valuesText}>
              Supporting agency and participation. Recognizing that independence
              includes knowing when to seek and accept support.
            </p>
          </div>

          <div className={s.principle}>
            <h3 className={s.principleName}>Bravery</h3>
            <p className={s.valuesText}>
              Engaging with what feels unfamiliar or challenging. Showing up,
              trying, and remaining present even when something feels hard.
            </p>
          </div>

          <div className={s.principle}>
            <h3 className={s.principleName}>Safe Choices</h3>
            <p className={s.valuesText}>
              Prioritizing physical, emotional, and relational safety. Supporting
              clear boundaries that help individuals feel secure and understood.
            </p>
          </div>
        </div>
      </section>

      {/* ── Practices ── */}
      <section className={`${s.section} ${s.practices}`}>
        <div className={s.practiceColumns}>
          <h2 className={s.practiceHeading}>ABA</h2>
          <h2 className={s.practiceHeading}>Speech</h2>
        </div>
        <ul className={s.practiceList}>
          <li>2:1 consultation</li>
          <li>Parent</li>
          <li>Support</li>
          <li>Social</li>
          <li>School</li>
        </ul>
      </section>

      {/* ── Bios ── */}
      <section className={`${s.section} ${s.bios}`}>
        <div className={s.bioCard}>
          <Image
            src="/images/bio-roxy.png"
            alt="Roxy Burke"
            width={400}
            height={400}
            className={s.bioPhoto}
          />
          <p className={s.bioName}>Roxy Burke, [Credentials]</p>
          <ul className={s.bioSkills}>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className={s.bioCard}>
          <Image
            src="/images/bio-tiffany.png"
            alt="Tiffany [Last]"
            width={400}
            height={400}
            className={s.bioPhoto}
          />
          <p className={s.bioName}>Tiffany [Last], [Credentials]</p>
          <ul className={s.bioSkills}>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Connect ── */}
      <section id="connect" className={`${s.section} ${s.connect}`}>
        <a href="mailto:connect@alinepractice.com" className={s.connectLink}>
          connect@alinepractice.com
        </a>
        <a
          href="https://instagram.com/aline_practice"
          target="_blank"
          rel="noopener noreferrer"
          className={s.connectLink}
        >
          @aline_practice
        </a>
      </section>
    </>
  );
}
