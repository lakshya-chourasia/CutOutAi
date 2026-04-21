import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// ─── Icons ───────────────────────────────────────────────────────────────────
const IconUpload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
  </svg>
);
const IconWand = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.26 8.715L18 9.75l-.26-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.035-.259a3.375 3.375 0 002.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
);
const IconDownload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);
const IconBlur = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);
const IconLightning = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);
const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);
const IconFree = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);
const IconClose = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('transparent');
  const [blurAmount, setBlurAmount] = useState(8);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPromo, setShowPromo] = useState(false);

  const fileInputRef = useRef(null);
  const toolRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Copy / DevTools Protection ────────────────────────────
  useEffect(() => {
    // Disable right-click context menu
    const noContext = (e) => e.preventDefault();
    document.addEventListener('contextmenu', noContext);

    // Disable common DevTools shortcuts
    const noKeys = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'U'].includes(e.key)) ||
        (e.metaKey && e.altKey && ['I', 'J', 'C'].includes(e.key)) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        return false;
      }
    };
    document.addEventListener('keydown', noKeys);

    // Disable text selection via CSS class
    document.body.classList.add('no-select');

    // Devtools open detection — redirect or warn
    const devToolsCheck = setInterval(() => {
      const threshold = 160;
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        document.title = '⚠️ Protected Content';
      } else {
        document.title = 'CutOut AI — Free Background Remover';
      }
    }, 1000);

    return () => {
      document.removeEventListener('contextmenu', noContext);
      document.removeEventListener('keydown', noKeys);
      document.body.classList.remove('no-select');
      clearInterval(devToolsCheck);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeen = localStorage.getItem('hasSeenPromo');
      if (!hasSeen) setShowPromo(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const closePromo = () => {
    setShowPromo(false);
    localStorage.setItem('hasSeenPromo', 'true');
  };

  const scrollToTool = () => toolRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResultImage(null);
      setError(null);
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResultImage(null);
      setError(null);
    }
  };

  const removeBackground = async () => {
    if (!imageFile) return;
    setIsProcessing(true);
    setError(null);
    setProgress(0);

    // Fake progress animation for UX
    const progressInterval = setInterval(() => {
      setProgress(p => p < 85 ? p + Math.random() * 8 : p);
    }, 400);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) throw new Error("API configuration missing. Please set VITE_API_URL.");

      const formData = new FormData();
      formData.append('file', imageFile);
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API Error (${response.status}): ${errText}`);
      }
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await response.json();
        if (data.url) setResultImage(data.url);
        else if (data.image) setResultImage(data.image);
        else if (data.result) setResultImage(data.result);
        else throw new Error('Invalid response from API');
      } else {
        const blob = await response.blob();
        setResultImage(URL.createObjectURL(blob));
      }
      setProgress(100);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to remove background. Please try again.');
    } finally {
      clearInterval(progressInterval);
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!resultImage) return;
    if (mode === 'transparent') {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = 'cutout.png';
      link.click();
      return;
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const origImg = new Image();
    const resultImg = new Image();
    origImg.crossOrigin = 'anonymous';
    resultImg.crossOrigin = 'anonymous';
    await Promise.all([
      new Promise(r => { origImg.onload = r; origImg.src = imagePreview; }),
      new Promise(r => { resultImg.onload = r; resultImg.src = resultImage; }),
    ]);
    canvas.width = origImg.width;
    canvas.height = origImg.height;
    ctx.filter = `blur(${blurAmount * 2}px)`;
    ctx.drawImage(origImg, 0, 0);
    ctx.filter = 'none';
    ctx.drawImage(resultImg, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'portrait-blur.png';
    link.click();
  };

  const reset = () => {
    setImageFile(null);
    setImagePreview(null);
    setResultImage(null);
    setError(null);
    setProgress(0);
  };

  return (
    <div className="page">

      {/* ── Navbar ── */}
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar-inner">
          <a href="#" className="nav-logo">
            <span className="logo-icon">✦</span>
            <span>CutOut<strong>AI</strong></span>
          </a>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#tool">Try It</a>
            <a href="#how">How It Works</a>
            <a
              href="https://www.linkedin.com/in/laakshyaa/"
              target="_blank"
              rel="noreferrer"
              className="nav-link-li"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>
          </div>
          <button className="nav-cta" onClick={scrollToTool}>
            <span>Get Started</span>
            <svg className="nav-cta-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-badge">✦ AI-Powered · Free Forever</div>
        <h1 className="hero-title">
          Remove Backgrounds<br />
          <span className="gradient-text">Instantly with AI</span>
        </h1>
        <p className="hero-subtitle">
          Upload any photo and our AI strips the background in seconds — no skills needed,
          no watermarks, 100% free.
        </p>
        <div className="hero-actions">
          <button className="btn-hero-primary" onClick={scrollToTool}>
            <IconWand /> Remove Background Free
          </button>
          <button className="btn-hero-outline" onClick={scrollToTool}>See How It Works</button>
        </div>
        <div className="hero-stats">
          <div className="stat"><strong>10K+</strong><span>Images Processed</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>&lt;5s</strong><span>Average Speed</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>Free</strong><span>No Sign-up</span></div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section" id="features">
        <div className="section-label">Why CutOut AI?</div>
        <h2 className="section-title">Everything you need, nothing you don't</h2>
        <div className="features-grid">
          <FeatureCard icon={<IconLightning />} title="Lightning Fast" desc="Our AI model removes backgrounds in under 5 seconds, even on complex photos with hair or fur." />
          <FeatureCard icon={<IconBlur />} title="Background Blur" desc="Don't want transparent? Apply a beautiful portrait-style blur to your photo background instantly." />
          <FeatureCard icon={<IconShield />} title="Privacy First" desc="Your images are processed securely and never stored. What you upload stays yours, always." />
          <FeatureCard icon={<IconDownload />} title="HD Downloads" desc="Download your cutout as a full-resolution PNG with transparency, ready for any design tool." />
          <FeatureCard icon={<IconFree />} title="100% Free" desc="No subscriptions, no hidden fees, no watermarks. Powered by open-source AI on Hugging Face." />
          <FeatureCard icon={<IconUpload />} title="Any Format" desc="Supports JPG, PNG, WebP and more. Works perfectly on portraits, products, logos & objects." />
        </div>
      </section>

      {/* ── Why Better ── */}
      <section className="why-section">
        <div className="why-inner">
          <div className="why-header">
            <div className="section-label">The CutOut AI Difference</div>
            <h2 className="section-title">Why we're better than the rest</h2>
            <p className="section-subtitle">Most background removers charge you, watermark your images, or make you sign up. We don't.</p>
          </div>

          <div className="compare-table">
            <div className="compare-col compare-col--them">
              <div className="compare-col-header">
                <span className="compare-tag compare-tag--bad">❌ Others</span>
              </div>
              <ul className="compare-list">
                <li><span className="x-icon">✕</span> Forced sign-up before use</li>
                <li><span className="x-icon">✕</span> Watermarks on free tier</li>
                <li><span className="x-icon">✕</span> Download limits per day</li>
                <li><span className="x-icon">✕</span> Low-res output on free plan</li>
                <li><span className="x-icon">✕</span> No background blur option</li>
                <li><span className="x-icon">✕</span> Slow, overloaded servers</li>
              </ul>
            </div>

            <div className="compare-col compare-col--us">
              <div className="compare-col-header">
                <span className="compare-tag compare-tag--good">✦ CutOut AI</span>
              </div>
              <ul className="compare-list">
                <li><span className="check-icon">✓</span> No sign-up, use instantly</li>
                <li><span className="check-icon">✓</span> Zero watermarks, ever</li>
                <li><span className="check-icon">✓</span> Unlimited free removals</li>
                <li><span className="check-icon">✓</span> Full HD PNG output</li>
                <li><span className="check-icon">✓</span> Portrait blur built-in</li>
                <li><span className="check-icon">✓</span> Results in under 5 seconds</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tool ── */}
      <section className="tool-section" id="tool" ref={toolRef}>
        <div className="section-label">The Tool</div>
        <h2 className="section-title">Remove a background right now</h2>


        <div className="tool-card">
          {!imagePreview ? (
            /* Upload Zone */
            <div
              id="upload-zone"
              className={`upload-zone ${isDragging ? 'dragging' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
              <div className="upload-icon-wrap">
                <IconUpload />
              </div>
              <h3>Drop your image here</h3>
              <p>or <span className="link-like">click to browse files</span></p>
              <div className="upload-formats">
                <span>JPG</span><span>PNG</span><span>WebP</span><span>HEIC</span>
              </div>
            </div>
          ) : (
            /* Editor */
            <div className="editor">
              {/* Top bar */}
              <div className="editor-topbar">
                <div className="file-info">
                  <div className="file-thumb">
                    <img src={imagePreview} alt="thumb" />
                  </div>
                  <div>
                    <p className="file-name">{imageFile?.name}</p>
                    <p className="file-size">{imageFile ? (imageFile.size / 1024).toFixed(0) + ' KB' : ''}</p>
                  </div>
                </div>
                <button className="icon-btn" onClick={reset} title="Remove image"><IconClose /></button>
              </div>

              {/* Image panels */}
              <div className="panels">
                <div className="panel">
                  <div className="panel-label">Original</div>
                  <div className="panel-img-wrap">
                    <img src={imagePreview} alt="Original" />
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-label">Result</div>
                  <div className={`panel-img-wrap result-wrap ${!resultImage ? 'empty' : ''}`}>
                    {!resultImage && !isProcessing && (
                      <div className="result-placeholder">
                        <IconWand />
                        <p>Hit "Remove Background" to see magic</p>
                      </div>
                    )}
                    {isProcessing && (
                      <div className="processing-overlay">
                        <div className="processing-ring" />
                        <p>Removing background…</p>
                        <div className="progress-track">
                          <div className="progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="progress-pct">{Math.round(progress)}%</span>
                      </div>
                    )}
                    {resultImage && (
                      <>
                        <div className="result-container">
                          {mode === 'blur' && (
                            <img
                              src={imagePreview}
                              alt="Blurred bg"
                              className="bg-layer"
                              style={{ filter: `blur(${blurAmount}px) saturate(1.2)` }}
                            />
                          )}
                          <img
                            src={resultImage}
                            alt="Result"
                            className={`fg-layer ${mode === 'transparent' ? 'checkerboard-bg' : ''}`}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="controls-bar">
                {!resultImage ? (
                  <div className="controls-actions">
                    <button className="btn-secondary" onClick={reset} disabled={isProcessing}>
                      Cancel
                    </button>
                    <button className="btn-primary" onClick={removeBackground} disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <span className="dot-pulse" />
                          Processing…
                        </>
                      ) : (
                        <><IconWand /> Remove Background</>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="result-controls">
                    <div className="mode-switcher">
                      <button
                        className={`mode-btn ${mode === 'transparent' ? 'active' : ''}`}
                        onClick={() => setMode('transparent')}
                      >
                        Transparent
                      </button>
                      <button
                        className={`mode-btn ${mode === 'blur' ? 'active' : ''}`}
                        onClick={() => setMode('blur')}
                      >
                        <IconBlur /> Blur BG
                      </button>
                    </div>

                    {mode === 'blur' && (
                      <div className="blur-control">
                        <label>Blur: <strong>{blurAmount}</strong></label>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          value={blurAmount}
                          onChange={e => setBlurAmount(Number(e.target.value))}
                          className="slider"
                        />
                      </div>
                    )}

                    <div className="result-actions">
                      <button className="btn-secondary" onClick={reset}>New Image</button>
                      <button className="btn-download" onClick={handleDownload}>
                        <IconDownload /> Download PNG
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="error-banner">
                  <strong>Error:</strong> {error}
                  <button className="err-close" onClick={() => setError(null)}><IconClose /></button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="how-section" id="how">
        <div className="section-label">How It Works</div>
        <h2 className="section-title">Three steps, zero friction</h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <h4>Upload</h4>
            <p>Drag & drop or click to select any image from your device.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-num">02</div>
            <h4>Process</h4>
            <p>Our AI model instantly detects and removes the background.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-num">03</div>
            <h4>Download</h4>
            <p>Get your transparent PNG or apply a blur effect and save.</p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="logo-icon">✦</span>
              <span>CutOut<strong>AI</strong></span>
            </div>
            <a
              href="https://www.linkedin.com/in/laakshyaa/"
              target="_blank"
              rel="noreferrer"
              className="footer-linkedin"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              <span>Built by Lakshya Chourasia</span>
            </a>
          </div>
          <p className="footer-copy">© 2026 CutOutAI · Free to use forever</p>
        </div>
      </footer>

      {/* ── LinkedIn Promo Popup ── */}
      {showPromo && (
        <div className="promo-popup">
          <button className="promo-close" onClick={closePromo} aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div className="promo-content">
            <div className="promo-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </div>
            <div className="promo-text">
              <h4>Connection Request? ✦</h4>
              <p>Have you checked Lakshya Chourasia's profile yet?</p>
              <a 
                href="https://www.linkedin.com/in/laakshyaa/" 
                target="_blank" 
                rel="noreferrer"
                className="promo-link"
              >
                View Profile
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
