import s from "./page.module.css";
import ValueCard from "./ValueCard";
import FadeIn from "./FadeIn";
import BioCard from "./BioCard";
import StaggerList from "./StaggerList";
import DrawCircle from "./DrawCircle";
import BlobTransition from "./BlobTransition";

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

      {/* ── Hero / Transition zone ── */}
      <div data-transition-zone style={{ height: "260vh" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh" }}>
          <div style={{ position: "relative", height: "100%" }}>
            <header className={s.header} data-hero>
              <svg
                className={s.heroLogo}
                data-hero-logo
                viewBox="246 269 500 550"
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
                preserveAspectRatio="xMidYMid meet"
                aria-label="Aline logo"
              >
                <g className={s.blobTranslate}>
                  <g className={s.blobBounce}>
                    <g className={s.blobRotate}>
                      <path
                        fill="#000000"
                        d="M 283.957 519.5625 C 282.988 466.8086 304.902 410.4219 353.7266 366.0234 C 388.414 334.4805 429.1719 313.625 476.3594 308.9258 C 537.0742 302.8828 582.8828 328.1094 613.9141 379.9531 C 633.3516 412.418 639.6133 448.2852 637.5664 485.793 C 635.6523 520.8164 626.5273 554.2031 614.3203 586.8242 C 598.8398 628.1797 579.6328 667.6992 553.6992 703.6055 C 537.6563 725.8164 518.0859 744.4023 493.3789 756.8828 C 450.4531 778.5625 407.0156 773.1406 370.5625 741.8242 C 307.5273 687.6719 285.4219 599.4336 283.957 519.5625 Z"
                      />
                    </g>
                  </g>
                </g>
                <circle
                  className={s.ring}
                  cx="672.8"
                  cy="737.4"
                  r="34.3"
                  fill="none"
                  stroke="#981327"
                  strokeWidth="5.2"
                />
              </svg>
            </header>
            <BlobTransition />
          </div>
        </div>
      </div>

      {/* ── Values ── */}
      <section id="values-section" className={`${s.section} ${s.values}`}>
        <div className={s.valuesInner}>
          {/* Heading shown in the scroll transition; kept here for accessibility only */}
          <h2 className={s.valuesHeadingHidden} aria-hidden="true">
            At Aline, we are relationship driven.
          </h2>

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
          </div>
        </section>

      {/* ── Bios ── */}
      <section className={`${s.section} ${s.bios}`}>
        <BioCard
          src="/images/bio-roxy.png"
          alt="Roxy Burke"
          name="Roxanne Burke, M.Ed., BCBA, LBA"
          tagline="Connection driven. Grounded in development and learning."
          direction="left"
          paragraphs={[
            "Roxy approaches behavior analysis as a way to understand learning and organizes support around developmental and relational capacities, with a focus on connection, communication, and meaningful growth. Her work is grounded in connection, attunement, and naturalistic play-based support, with a focus on communication, social engagement, and meaningful growth across home, school, and community settings.",
            "She designs individualized, relationship-centered support that integrates communication, flexibility, and coping skills into everyday routines and child-led interactions. Roxy partners closely with families and providers through coaching, modeling, and reflective collaboration to build shared understanding and support connection-based care.",
            "Her approach is informed by naturalistic developmental and behavioral models, including ESDM, PRT, JASPER, Project ImPACT, and DIR/Floortime, alongside strengths-based assessment, AAC support, and co-regulation strategies.",
          ]}
        />
        <BioCard
          src="/images/bio-tiffany.png"
          alt="Tiffany Marino"
          name="Tiffany Marino, M.S., CCC-SLP, TSSLD"
          tagline="Connection driven. Grounded in communication and development."
          direction="right"
          paragraphs={[
            "Tiffany approaches speech and language support through a relational and developmental lens, with a focus on meaningful, functional communication across everyday contexts. With over a decade of experience supporting children and adults across school and private practice settings, her work is grounded in connection, attunement, and naturalistic play-based support, within a neurodiversity-affirming approach.",
            "She partners closely with families and interdisciplinary teams to build communication that carries over into daily life. Tiffany supports a range of communication styles, including spoken language, AAC, and multimodal communication, and brings a thoughtful, engaging approach that meets each individual where they are. Her work emphasizes engagement, regulation, and shared experience as the foundation for communication development.",
            "Her approach is informed by developmental, play-based models including ESDM, DIR/Floortime, and JASPER, alongside specialized training in childhood apraxia of speech (DTTC), fluency (including Lidcombe and PCI), and voice and language-based support.",
          ]}
        />
      </section>

      {/* ── Practices ── */}
      <FadeIn>
        <section className={`${s.section} ${s.practices}`}>
          <div className={s.practiceColumns}>
            <h2 className={s.practiceHeading}>ABA</h2>
            <h2 className={s.practiceHeading}>Speech</h2>
          </div>
          <StaggerList
            items={[
              "2:1 consultation",
              "Parent",
              "Support",
              "Social",
              "School",
            ]}
          />
        </section>
      </FadeIn>

      {/* ── Connect ── */}
      <section id="connect" className={`${s.section} ${s.connect}`}>
        <h2 className={s.connectHeading}>Let&rsquo;s connect</h2>
        <div className={s.connectRow}>
          <p className={s.connectSub}>
            <span className={s.connectCircleWrap}>
              We can take it one step at a time.
              <DrawCircle />
            </span>
          </p>
          <div className={s.connectLinks}>
            <a
              href="https://instagram.com/aline.practice"
              target="_blank"
              rel="noopener noreferrer"
              className={s.connectBtn}
            >
              @aline.practice
            </a>
            <a href="mailto:connect@alinepractice.com" className={s.connectBtn}>
              connect@alinepractice.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
