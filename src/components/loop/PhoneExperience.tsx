import loopLogo from "@/assets/loop-logo.png";

export function PhoneExperience() {
  return (
    <section className="phone-experience" id="experience">
      <div className="experience-copy experience-copy--left">
        <span className="eyebrow">A studio in your pocket</span>
        <h2>
          Every lesson.
          <br />
          <em>In your rhythm.</em>
        </h2>
        <p>Practice with a clear plan, expert feedback and a community that keeps you moving.</p>
      </div>
      <div className="experience-copy experience-copy--right">
        <span className="eyebrow">Made for momentum</span>
        <p>Live guidance, focused practice and a rhythm that fits your life.</p>
      </div>
      <div className="phone-stage">
        <div className="phone-glow" />
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="phone-wrap">
          <div className="phone-shell">
            <div className="dynamic-island" />
            <div className="phone-screen">
              <div className="phone-screen-bg" aria-hidden="true" />
              <div className="screen-head">
                <img
                  src={loopLogo}
                  alt=""
                  className="screen-logo"
                  draggable={false}
                  aria-hidden="true"
                />
              </div>
              <div className="screen-stat">
                <div className="screen-stat-ring" aria-hidden="true">
                  <svg viewBox="0 0 36 36">
                    <circle className="ring-track" cx="18" cy="18" r="15.5" />
                    <circle className="ring-fill" cx="18" cy="18" r="15.5" />
                  </svg>
                  <span>12</span>
                </div>
                <div className="screen-stat-copy">
                  <strong>12-day streak</strong>
                  <small>4 sessions left this week</small>
                </div>
              </div>
              <span className="screen-courses-label">Courses</span>
              <div className="bottom-nav">
                <span>Today</span>
                <i />
                <span>Library</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cue">
        <span /> Scroll to compose
      </div>
    </section>
  );
}
