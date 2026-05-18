import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [isOpening, setIsOpening] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isFadeOut, setIsFadeOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    isFinished: false
  });

  useEffect(() => {
    // Countdown logic
    const weddingDate = new Date('July 30, 2026 20:30:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft(prev => ({ ...prev, isFinished: true }));
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
        seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0'),
        isFinished: false
      });
    }, 1000);

    // Scroll reveal logic
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    return () => {
      clearInterval(timer);
      revealElements.forEach(el => revealObserver.unobserve(el));
    };
  }, []);

  const handleOpen = () => {
    setIsOpening(true);
    
    setTimeout(() => {
      setIsRevealing(true);
    }, 800);

    setTimeout(() => {
      setIsFadeOut(true);
      setIsVisible(true);
      document.body.style.overflowY = 'auto';
      
      setTimeout(() => {
        setShowIntro(false);
      }, 1200);
    }, 2200);
  };

  useEffect(() => {
    document.body.style.overflowY = isVisible ? 'auto' : 'hidden';
  }, [isVisible]);

  return (
    <>
      <Head>
        <title>Seif & Manar | Wedding Invitation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {showIntro && (
        <div id="intro-screen" className={`intro-screen ${isOpening ? 'opening' : ''} ${isRevealing ? 'revealing' : ''} ${isFadeOut ? 'fade-out' : ''}`}>
          <div className="envelope-wrapper">
            <div className="envelope">
              <div className="flap"></div>
              <div className="body"></div>
              <div className="wax-seal" id="wax-seal">
                <div className="seal-inner">
                  <span className="monogram">S&M</span>
                </div>
              </div>
              <div className="invitation-preview">
                <div className="preview-content">
                  <p className="preview-text">Save the Date</p>
                  <h2 className="preview-initials">S & M</h2>
                </div>
              </div>
            </div>
            <button id="open-btn" className="open-btn" onClick={handleOpen}>Open Invitation</button>
          </div>
          <div className="ambient-particles"></div>
        </div>
      )}

      <main id="main-content" className={!isVisible ? 'hidden' : 'main-visible'}>
        <section id="hero" className="hero">
          <div className="hero-content">
            <p className="hero-subtitle">Together with their families</p>
            <h1 className="couple-names">Seif <span className="ampersand">&</span> Manar</h1>
            <p className="hero-tagline">Are getting married</p>
          </div>
        </section>

        <section id="countdown-section" className="countdown-section reveal">
          <div className="container">
            <h2 className="section-title">Counting Down to the Big Day</h2>
            <p className="wedding-date-display">July 30, 2026</p>
            <div className="countdown-container" id="countdown">
              {!timeLeft.isFinished ? (
                <>
                  <div className="countdown-item">
                    <span className="number">{timeLeft.days}</span>
                    <span className="label">Days</span>
                  </div>
                  <div className="countdown-item">
                    <span className="number">{timeLeft.hours}</span>
                    <span className="label">Hours</span>
                  </div>
                  <div className="countdown-item">
                    <span className="number">{timeLeft.minutes}</span>
                    <span className="label">Minutes</span>
                  </div>
                  <div className="countdown-item">
                    <span className="number">{timeLeft.seconds}</span>
                    <span className="label">Seconds</span>
                  </div>
                </>
              ) : (
                <h3 className="monogram">The Big Day is Here!</h3>
              )}
            </div>
          </div>
        </section>

        <section id="details" className="details-section reveal">
          <div className="container">
            <div className="details-card">
              <div className="details-header">
                <h2 className="section-title">The Celebration</h2>
              </div>
              <div className="details-grid">
                <div className="detail-item">
                  <h3>When</h3>
                  <p>Thursday, July 30, 2026</p>
                  <p>8:30 PM — 11:30 PM</p>
                </div>
                <div className="detail-item">
                  <h3>Where</h3>
                  <p>Sunrise Hall</p>
                  <p>Star Club</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="location" className="location-section reveal">
          <div className="container">
            <h2 className="section-title">How to Get There</h2>
            <div className="map-card">
              <div className="map-placeholder">
                <div className="map-overlay">
                  <p>Venue Location</p>
                  <h3>Sunrise Hall</h3>
                  <a href="https://maps.app.goo.gl/9wEmRiViuEWijmbh9?g_st=iw" target="_blank" rel="noopener noreferrer" className="map-btn">Open Google Maps</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="gallery-section reveal">
          <div className="container">
            <h2 className="section-title">A Moment Captured</h2>
            <div className="photo-card-wrapper">
              <div className="photo-card">
                <div className="photo-frame">
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" alt="Wedding Couple" className="gallery-img" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="closing" className="closing-section reveal">
          <div className="container">
            <div className="closing-content">
              <h2 className="thank-you">Thank You</h2>
              <p>For being a part of our love story.</p>
              <div className="closing-monogram">S & M</div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        /* Next.js specific hidden handling if needed */
        .hidden { display: none !important; opacity: 0; }
        .main-visible { display: block !important; opacity: 1; }
      `}</style>
    </>
  );
}
