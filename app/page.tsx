import s from "./page.module.css";
import ValuesGrid from "./ValuesGrid";
import FadeIn from "./FadeIn";
import BioCard from "./BioCard";
import ServiceCarousel from "./ServiceCarousel";
import TitleBubble from "./TitleBubble";
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

          <TitleBubble />

          <ValuesGrid />

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
          ]}
        />
      </section>

      {/* ── Services ── */}
      <FadeIn>
        <section className={`${s.section} ${s.services}`}>
          <p className={s.servicesLabel}>Services</p>
          <ServiceCarousel />
        </section>
      </FadeIn>

      {/* ── Connect ── */}
      <section id="connect" className={`${s.section} ${s.connect}`}>
        <div className={s.connectOvalWrap}>

          {/* Header row: heading left, ring right */}
          <div className={s.connectHeader}>
            <h2 className={s.connectHeading}>Let&rsquo;s connect</h2>

            {/* Red ring + arc text — lifted out of the oval, sits top-right */}
            <svg
              className={s.connectRingSvg}
              viewBox="38 82 360 76"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M 50.9 120 C 43.1 86.7 392.9 86.7 385.1 120 C 392.9 153.3 43.1 153.3 50.9 120 Z M 354.3 120 C 360.4 147.2 75.5 147.3 81.7 120 C 76.5 93.0 358.4 92.9 354.3 120 Z"
                fill="#922030"
                fillOpacity="0.82"
                fillRule="evenodd"
                shapeRendering="geometricPrecision"
              />
              <text
                x="218"
                y="120"
                fill="#922030"
                fontSize="20"
                fontWeight="600"
                fontFamily="'Source Sans 3', sans-serif"
                letterSpacing="0.5"
                textAnchor="middle"
                dominantBaseline="central"
              >
                one step at a time
              </text>
            </svg>
          </div>

          {/* Black oval — clean, no ring */}
          <svg
            className={s.connectOvalSvg}
            viewBox="-60 52 1020 188"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="ovalDepth" cx="50%" cy="16%" r="78%">
                <stop offset="0%"   stopColor="#1e1e1e" />
                <stop offset="30%"  stopColor="#0e0e0e" />
                <stop offset="100%" stopColor="#030303" />
              </radialGradient>
            </defs>
            <path
              transform="rotate(0.5, 450, 120)"
              d="M -41.71 129.33 C -25.23 149.28 115.63 169.82 415.27 166.28 C 662.37 163.38 856.79 147.04 910.05 121.61 C 956.01 99.69 848.33 84.79 700.39 76.33 C 637.83 72.77 574.91 71.19 515.26 70.63 C 467.78 70.18 423.03 70.39 381.28 70.80 C 333.57 71.29 289.22 72.01 245.37 73.18 C 219.55 73.87 193.50 74.84 166.08 76.31 C 117.51 78.90 75.51 82.50 44.02 87.10 C -30.70 97.95 -56.01 112.00 -41.71 129.33 Z"
              fill="url(#ovalDepth)"
              shapeRendering="geometricPrecision"
            />
          </svg>

          {/* Links */}
          <div className={s.connectLinks}>
            <a
              href="https://instagram.com/aline.practice"
              target="_blank"
              rel="noopener noreferrer"
              className={s.connectLink}
            >
              @aline.practice
            </a>
            <span className={s.connectDivider} aria-hidden="true" />
            <a
              href="mailto:connect@alinepractice.com"
              className={s.connectLink}
            >
              connect@alinepractice.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
