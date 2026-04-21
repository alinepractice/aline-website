import s from "./page.module.css";
import ValuesGrid from "./ValuesGrid";
import FadeIn from "./FadeIn";
import BioCard from "./BioCard";
import StaggerList from "./StaggerList";
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
            Values and approach
          </p>

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
        <div className={s.connectOvalWrap}>
          <h2 className={s.connectHeading}>Let&rsquo;s connect</h2>

          {/* Horizontal oval — black hole with crimson ring for depth */}
          <svg
            className={s.connectOvalSvg}
            viewBox="0 0 900 240"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Subtle gradient on the oval — rim catches light at top, deepens toward center */}
              <radialGradient id="ovalDepth" cx="50%" cy="16%" r="78%">
                <stop offset="0%"   stopColor="#242424" />
                <stop offset="22%"  stopColor="#0d0d0d" />
                <stop offset="100%" stopColor="#000000" />
              </radialGradient>
            </defs>

            {/* Black shape — exact 9-segment brand path from footer.eps, rotated 90° horizontal.
                 Converted from EPS coords (y-flipped), rotated, scaled to fill SVG width. */}
            <path
              d="M 22.43 128.11 C 36.76 145.46 159.24 163.32 419.80 160.24 C 634.67 157.72 803.73 143.51 850.04 121.40 C 890.01 102.34 796.37 89.38 667.73 82.03 C 613.33 78.93 558.62 77.56 506.75 77.07 C 465.46 76.68 426.55 76.86 390.24 77.22 C 348.76 77.64 310.19 78.27 272.06 79.29 C 249.61 79.89 226.96 80.73 203.11 82.01 C 160.88 84.26 124.36 87.39 96.97 91.39 C 32.00 100.83 9.99 113.04 22.43 128.11 Z"
              fill="url(#ovalDepth)"
              shapeRendering="geometricPrecision"
            />

            {/* Red ring — exact brand path from footer.eps, rotated 90° horizontal.
                 Compound path (outer oval + inner oval) with evenodd fill = crisp ring. */}
            <path
              d="M 50.9 120 C 43.1 86.7 392.9 86.7 385.1 120 C 392.9 153.3 43.1 153.3 50.9 120 Z M 354.3 120 C 360.4 147.2 75.5 147.3 81.7 120 C 76.5 93.0 358.4 92.9 354.3 120 Z"
              fill="#9A1124"
              fillRule="evenodd"
              shapeRendering="geometricPrecision"
            />

            {/* Sub-text — two lines, larger font, centred inside the ring */}
            <text
              textAnchor="middle"
              fill="rgba(243,238,218,0.90)"
              fontSize="18"
              fontWeight="300"
              fontFamily="'Source Sans 3', sans-serif"
              letterSpacing="0.3"
            >
              <tspan x="218" y="109">We can take it</tspan>
              <tspan x="218" y="132">one step at a time.</tspan>
            </text>

            {/* Thin divider between links */}
            <line
              x1="648" y1="103" x2="648" y2="137"
              stroke="rgba(243,238,218,0.18)" strokeWidth="1"
            />

            {/* @aline.practice */}
            <a href="https://instagram.com/aline.practice" target="_blank" rel="noopener noreferrer">
              <text
                x="510" y="120"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(243,238,218,0.88)"
                fontSize="14"
                fontWeight="300"
                fontFamily="'Source Sans 3', sans-serif"
                style={{ cursor: "pointer" }}
              >
                @aline.practice
              </text>
            </a>

            {/* connect@alinepractice.com */}
            <a href="mailto:connect@alinepractice.com">
              <text
                x="762" y="120"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(243,238,218,0.88)"
                fontSize="13"
                fontWeight="300"
                fontFamily="'Source Sans 3', sans-serif"
                style={{ cursor: "pointer" }}
              >
                connect@alinepractice.com
              </text>
            </a>
          </svg>
        </div>
      </section>
    </>
  );
}
