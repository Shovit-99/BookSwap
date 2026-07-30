import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './Landing.css';

const Landing = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  // ---------- Cursor parallax ----------
  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });

    heroRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    heroRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  // ---------- Nav scroll effect ----------
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---------- Scroll reveal observer ----------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);



  // ---------- Parallax transform helper ----------
  const getParallaxStyle = (depth) => ({
    transform: `translate3d(${mousePos.x * depth * 30}px, ${mousePos.y * depth * 20}px, 0)`,
  });

  // ---------- Framer Motion Variants ----------
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
    }),
  };

  // ---------- Floating Book Covers Data ----------
  const bookCovers = [
    { 
      Icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbe5b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/></svg>,
      color: '#b33939', title: 'The Great Gatsby', rotation: -15, top: '15%', left: '5%', depth: 1.5 
    },
    { 
      Icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbe5b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/></svg>,
      color: '#218c53', title: 'To Kill a Mockingbird', rotation: 12, top: '25%', right: '8%', depth: -1.2 
    },
    { 
      Icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbe5b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
      color: '#1e3799', title: '1984', rotation: -8, top: '60%', left: '3%', depth: 1.8 
    },
    { 
      Icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbe5b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
      color: '#e58e26', title: 'Pride & Prejudice', rotation: 20, top: '55%', right: '5%', depth: -0.8 
    },
    { 
      Icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbe5b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>,
      color: '#6a0dad', title: 'The Alchemist', rotation: -25, top: '40%', left: '10%', depth: 1.0 
    },
    { 
      Icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbe5b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
      color: '#006266', title: 'Atomic Habits', rotation: 15, top: '70%', right: '12%', depth: -1.5 
    },
  ];

  // ---------- FAQ Data ----------
  const faqs = [
    {
      q: 'How do I list my books for trading?',
      a: 'Simply create an account, click "Add Book", fill in details like title, author, condition, and upload photos. Your book will be live on the marketplace instantly for other readers to discover.',
    },
    {
      q: 'Is BookSwap free to use?',
      a: 'Yes! BookSwap is completely free. We believe in making books accessible to everyone. There are no listing fees, no hidden charges — just connect and swap.',
    },
    {
      q: 'How does the swapping process work?',
      a: 'Browse the marketplace, find a book you love, and send a swap request to the owner. You can propose trading one of your books in return, or simply purchase it at the listed price.',
    },
    {
      q: 'What condition should my books be in?',
      a: 'We accept books in any readable condition. When listing, honestly describe the condition — New, Like New, Good, or Fair — so buyers know exactly what to expect.',
    },
    {
      q: 'Can I track my swap history?',
      a: 'Absolutely! Your dashboard shows a complete history of all swaps, purchases, and listings. You\'ll also get real-time notifications for swap requests and messages.',
    },
  ];



  // ---------- Genre tags for visual flair ----------
  const genres = ['Fiction', 'Sci-Fi', 'Romance', 'Mystery', 'Self-Help', 'History', 'Fantasy', 'Biography', 'Poetry', 'Thriller'];

  return (
    <div className="landing-page">
      {/* ========== Navbar ========== */}
      <motion.nav
        className={`landing-nav ${navScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="landing-nav-inner">
          <Link to="/" className="landing-logo">
            BookSwap
          </Link>

          <ul className={`landing-nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a></li>
            <li><a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a></li>
            <li>
              <Link
                to="/login"
                className="landing-nav-login"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="landing-nav-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started →
              </Link>
            </li>
          </ul>

          <button
            className="landing-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </motion.nav>

      {/* ========== Hero Section ========== */}
      <motion.section
        className="landing-hero"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Background */}
        <div className="landing-hero-bg">
          <div className="landing-orb landing-orb-1"></div>
          <div className="landing-orb landing-orb-2"></div>
          <div className="landing-orb landing-orb-3"></div>
        </div>

        <div className="landing-cursor-spotlight"></div>
        <div className="landing-grid-overlay"></div>

        {/* Floating Book Covers */}
        <div className="landing-floating-books">
          {bookCovers.map((book, idx) => {
            const IconComponent = book.Icon;
            return (
              <motion.div
                key={idx}
                className="landing-floating-book"
                style={{
                  ...getParallaxStyle(book.depth),
                  top: book.top,
                  left: book.left,
                  right: book.right,
                }}
                initial={{ opacity: 0, scale: 0, rotate: book.rotation * 2 }}
                animate={{ opacity: 1, scale: 1, rotate: book.rotation }}
                transition={{
                  duration: 1.2,
                  delay: 0.5 + idx * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div
                  className="landing-book-3d"
                  style={{ '--book-color': book.color }}
                >
                  <div className="landing-book-cover">
                    <div className="landing-book-clip"></div>
                    <div className="landing-book-icon">
                      <IconComponent />
                    </div>
                    <span className="landing-book-title">{book.title}</span>
                  </div>
                  <div className="landing-book-spine-3d"></div>
                  <div className="landing-book-pages"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Genre Tags */}
        <div className="landing-genre-tags">
          {genres.map((genre, idx) => (
            <motion.span
              key={genre}
              className="landing-genre-tag"
              style={{
                top: `${15 + (idx % 5) * 17}%`,
                [idx % 2 === 0 ? 'left' : 'right']: `${2 + (idx % 4) * 5}%`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 + idx * 0.1 }}
            >
              {genre}
            </motion.span>
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          className="landing-hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="landing-hero-badge" variants={fadeInUp} custom={0}>
            <span className="landing-hero-badge-dot"></span>
            📚 The #1 Book Trading Platform
          </motion.div>

          <motion.h1 className="landing-hero-title" variants={fadeInUp} custom={1}>
            <span className="landing-hero-title-chrome">Trade Books.</span>
            <span className="landing-hero-title-accent">Share Stories.</span>
          </motion.h1>

          <motion.p className="landing-hero-subtitle" variants={fadeInUp} custom={2}>
            Your bookshelf has limits. Your reading journey shouldn't.
          </motion.p>

          <motion.p className="landing-hero-subtitle-bold" variants={fadeInUp} custom={3}>
            Join thousands of readers swapping, discovering, and connecting on BookSwap.
          </motion.p>

          <motion.div className="landing-hero-buttons" variants={fadeInUp} custom={4}>
            <Link to="/register" className="landing-btn-primary">
              Start Swapping Books →
            </Link>
            <Link to="/login" className="landing-btn-secondary">
              Log In to Your Account
            </Link>
          </motion.div>

          {/* Book stack visual under CTA */}
          <motion.div
            className="landing-hero-book-stack"
            variants={fadeInUp}
            custom={5}
          >
            <div className="landing-book-stack-visual">
              {['📕', '📗', '📘', '📙', '📓'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="landing-stack-book"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 2 + i * 0.15, duration: 0.5 }}
                >
                  {emoji}
                </motion.span>
              ))}
              <span className="landing-stack-label">10,000+ books already listed</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>



      {/* ========== How It Works ========== */}
      <section className="landing-section" id="how-it-works">
        <div className="landing-section-inner">
          <motion.div
            className="landing-section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="landing-section-label">✦ Simple Process</div>
            <h2 className="landing-section-title">How It Works</h2>
            <p className="landing-section-subtitle">
              Three simple steps to start your book trading journey
            </p>
          </motion.div>

          <motion.div
            className="landing-steps-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { num: 1, icon: '📸', title: 'List Your Books', desc: 'Snap a photo, add details, and publish your listing in under 60 seconds' },
              { num: 2, icon: '🔍', title: 'Discover & Match', desc: 'Browse the marketplace or let our smart matching find the perfect swap partner' },
              { num: 3, icon: '🤝', title: 'Swap & Enjoy', desc: 'Connect with the reader, arrange the swap, and dive into your next great read' },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="landing-step-card"
                variants={fadeInUp}
                custom={idx}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="landing-step-number">{step.num}</div>
                <span className="landing-step-icon">{step.icon}</span>
                <h3 className="landing-step-title">{step.title}</h3>
                <p className="landing-step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* ========== FAQ Section ========== */}
      <section className="landing-section" id="faq">
        <div className="landing-section-inner">
          <motion.div
            className="landing-section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="landing-section-label">✦ Common Questions</div>
            <h2 className="landing-section-title">
              Frequently Asked Questions
            </h2>
            <p className="landing-section-subtitle">
              Everything you need to know about BookSwap
            </p>
          </motion.div>

          <div className="landing-faq-list">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className={`landing-faq-item ${
                  activeFaq === idx ? 'active' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <button
                  className="landing-faq-question"
                  onClick={() =>
                    setActiveFaq(activeFaq === idx ? null : idx)
                  }
                >
                  {faq.q}
                  <motion.span
                    className="landing-faq-arrow"
                    animate={{ rotate: activeFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ↓
                  </motion.span>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      className="landing-faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="landing-faq-answer-inner">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="landing-divider" />

      {/* ========== CTA Section ========== */}
      <section className="landing-section landing-cta">
        <div className="landing-cta-glow"></div>
        <div className="landing-section-inner" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="landing-cta-title">
              Ready to Reimagine<br />Your Bookshelf?
            </h2>
            <p className="landing-cta-subtitle">
              Join thousands of readers already swapping stories on BookSwap
            </p>
            <div className="landing-hero-buttons">
              <Link to="/register" className="landing-btn-primary">
                Sign Up Free →
              </Link>
              <Link to="/login" className="landing-btn-secondary">
                I Already Have an Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== Footer ========== */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-grid">
            <div>
              <Link to="/" className="landing-logo">
                BookSwap
              </Link>
              <p className="landing-footer-brand-desc">
                The premium marketplace for book lovers. Trade, discover,
                and connect with readers worldwide.
              </p>
              <div className="landing-footer-social">
                <a href="#" aria-label="Twitter">𝕏</a>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="GitHub">⌨</a>
                <a href="#" aria-label="LinkedIn">in</a>
              </div>
            </div>

            <div>
              <div className="landing-footer-col-title">Product</div>
              <ul className="landing-footer-links">
                <li><Link to="/marketplace">Marketplace</Link></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><Link to="/add-book">List a Book</Link></li>
              </ul>
            </div>

            <div>
              <div className="landing-footer-col-title">Company</div>
              <ul className="landing-footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div>
              <div className="landing-footer-col-title">Support</div>
              <ul className="landing-footer-links">
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Report Issue</a></li>
              </ul>
            </div>
          </div>

          <div className="landing-footer-bottom">
            <div className="landing-footer-copyright">
              © {new Date().getFullYear()} BookSwap. All rights reserved.
            </div>
            <div className="landing-footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
