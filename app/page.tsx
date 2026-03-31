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
        <p className={s.valuesText}>
          Flexibility, Independence, Bravery, Safe Choices is a values based,
          relational framework designed to support connection, communication, and
          growth through everyday interactions. FIBS is an invitation to align
          yourself in a moment. It encourages thoughtful awareness by creating
          space to notice a learning opportunity and recognize which value is
          needed before responding.
        </p>
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
