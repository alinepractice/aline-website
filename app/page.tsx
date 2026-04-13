import Image from "next/image";
import s from "./page.module.css";
import ValueCard from "./ValueCard";

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
          width={830}
          height={905}
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

          <p className={`${s.valuesText} ${s.valuesBody}`}>
            Our work is grounded in connection and in noticing opportunities
            within everyday moments. Growth happens through shared experiences,
            through being present, and in how we respond to one another.
            Learning unfolds within relationships. By staying attuned, we
            recognize meaningful moments and support them with intention. We
            prioritize pausing and tuning in, creating space to better
            understand and respond to each individual&rsquo;s sensory and
            emotional experience. Through respectful presence and shared
            enjoyment, we join in moments and follow the child&rsquo;s lead. By
            honoring individual differences, we support each child&rsquo;s
            unique way of experiencing the world and shape how we align our
            approach across ABA and speech therapy.
          </p>

          <p className={s.valuesGuide}>
            The values that guide our approach
          </p>

          <div className={s.principlesGrid}>
            <ValueCard
              name="Flexibility"
              description="Staying connected through change."
            />
            <ValueCard
              name="Independence"
              description="Noticing yourself and your needs."
            />
            <ValueCard
              name="Bravery"
              description="Engagement with uncertainty."
            />
            <ValueCard
              name="Safe Choices"
              description="Recognizing limits and responding with clarity."
            />
          </div>
        </div>
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
          <p className={s.bioName}>Roxanne Burke, M.Ed., BCBA, LBA</p>
          <div className={s.bioText}>
            <p className={s.bioTagline}>
              Connection driven. Grounded in development and learning.
            </p>
            <p>
              Roxy approaches behavior analysis as a way to understand learning
              and organizes support around developmental and relational
              capacities. Her work is grounded in connection, attunement, and
              naturalistic play-based support, with a focus on communication,
              social engagement, and meaningful growth across home, school, and
              community settings.
            </p>
            <p>
              She designs individualized, relationship-centered support that
              integrates communication, flexibility, and coping skills into
              everyday routines and child-led interactions. Roxy partners closely
              with families and providers through coaching, modeling, and
              reflective collaboration to build shared understanding and support
              connection-based care.
            </p>
            <p>
              Her approach is informed by naturalistic developmental and
              behavioral models, including ESDM, PRT, JASPER, Project ImPACT,
              and DIR/Floortime, alongside strengths-based assessment, AAC
              support, and co-regulation strategies.
            </p>
          </div>
        </div>

        <div className={s.bioCard}>
          <Image
            src="/images/bio-tiffany.png"
            alt="Tiffany Marino"
            width={400}
            height={400}
            className={s.bioPhoto}
          />
          <p className={s.bioName}>Tiffany Marino, M.S., CCC-SLP, TSSLD</p>
          <div className={s.bioText}>
            <p className={s.bioTagline}>
              Connection driven. Grounded in communication and development.
            </p>
            <p>
              Tiffany approaches speech and language support through a relational
              and developmental lens, with a focus on meaningful, functional
              communication across everyday contexts. Her work is grounded in
              connection, attunement, and naturalistic play-based support.
            </p>
            <p>
              She partners closely with families and interdisciplinary teams to
              build communication that carries over into daily life. Tiffany
              supports a range of communication styles, including spoken
              language, AAC, and multimodal communication, while honoring each
              individual&rsquo;s strengths and preferences. Her work
              emphasizes engagement, regulation, and shared experience as the
              foundation for communication development.
            </p>
            <p>
              Her approach is informed by developmental, play-based models
              including ESDM, DIR/Floortime, and JASPER, alongside specialized
              training in childhood apraxia of speech (DTTC), fluency (including
              Lidcombe and PCI), and voice and language-based support.
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
