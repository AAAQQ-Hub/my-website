import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, ArrowRight, Instagram, Twitter } from 'lucide-react';
import './App.css';

const App = () => {
  const [email, setEmail] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const isFeaturedInView = useInView(featuredRef, { once: true });
  const isPhilosophyInView = useInView(philosophyRef, { once: true });
  const isServicesInView = useInView(servicesRef, { once: true });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const fadeIn = () => {
      let opacity = 0;
      const start = performance.now();
      const animate = (timestamp: number) => {
        const elapsed = timestamp - start;
        opacity = Math.min(elapsed / 500, 1);
        video.style.opacity = opacity.toString();
        if (opacity < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    };

    const fadeOut = () => {
      let opacity = 1;
      const start = performance.now();
      const animate = (timestamp: number) => {
        const elapsed = timestamp - start;
        opacity = Math.max(1 - elapsed / 500, 0);
        video.style.opacity = opacity.toString();
        if (opacity > 0) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    };

    const handleTimeUpdate = () => {
      if (video.currentTime >= video.duration - 0.55) {
        fadeOut();
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
        fadeIn();
      }, 100);
    };

    video.addEventListener('canplay', fadeIn);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', fadeIn);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen relative flex flex-col overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          muted
          autoPlay
          playsInline
          preload="auto"
          style={{ opacity: 0 }}
        />

        {/* Navbar */}
        <nav className="relative z-20 px-6 py-6">
          <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Globe size={24} color="white" />
              <span className="text-white font-semibold text-lg">Asme</span>
              <div className="hidden md:flex gap-8 ml-8">
                <a href="#" className="text-white/80 hover:text-white text-sm font-medium">Features</a>
                <a href="#" className="text-white/80 hover:text-white text-sm font-medium">Pricing</a>
                <a href="#" className="text-white/80 hover:text-white text-sm font-medium">About</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-white text-sm font-medium">Sign Up</button>
              <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium">Login</button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
          <h1 className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap font-instrument-serif">
            Know it then <em className="italic">all</em>
          </h1>

          <div className="max-w-xl w-full mt-12">
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent flex-1 text-white placeholder:text-white/40 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="bg-white rounded-full p-3 text-black">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <p className="text-white text-sm leading-relaxed px-4 mt-6">
            Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
          </p>

          <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors mt-8">
            Manifesto
          </button>

          <div className="relative z-10 flex justify-center gap-4 pb-12 mt-16">
            <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
              <Instagram size={20} />
            </button>
            <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
              <Twitter size={20} />
            </button>
            <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
              <Globe size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
        <div className="relative max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-white/40 text-sm tracking-widest uppercase"
          >
            About Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight mt-4"
          >
            <span className="font-instrument-serif italic text-white/60">Pioneering</span> ideas for
            <br className="hidden md:block" />
            <span className="font-instrument-serif italic text-white/60">minds that create, build, and inspire.</span>
          </motion.h2>
        </div>
      </section>

      {/* Featured Video Section */}
      <section ref={featuredRef} className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="rounded-3xl overflow-hidden aspect-video relative"
          >
            <video
              className="w-full h-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">
                  <p className="text-white/50 text-xs tracking-widest uppercase mb-3">Our Approach</p>
                  <p className="text-white text-sm md:text-base leading-relaxed">
                    We believe in the power of curiosity-driven exploration. Every project starts with a question, and every answer opens a new door to innovation.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium md:ml-auto md:self-end"
                >
                  Explore more
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={philosophyRef} className="bg-black py-28 md:py-40 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isPhilosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24"
          >
            <span className="font-instrument-serif italic text-white/40">Innovation</span> x <span className="font-instrument-serif italic">Vision</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isPhilosophyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden aspect-[4/3]"
            >
              <video
                className="w-full h-full object-cover"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isPhilosophyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8"
            >
              <div>
                <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Choose your space</p>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  Every meaningful breakthrough begins at the intersection of disciplined strategy and remarkable creative vision. We operate at that crossroads, turning bold thinking into tangible outcomes that move people and reshape industries.
                </p>
              </div>

              <div className="w-full h-px bg-white/10" />

              <div>
                <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Shape the future</p>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  We believe that the best work emerges when curiosity meets conviction. Our process is designed to uncover hidden opportunities and translate them into experiences that resonate long after the first impression.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="bg-black py-28 md:py-40 px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex justify-between items-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-5xl text-white tracking-tight"
            >
              What we do
            </motion.h2>
            <p className="text-white/40 text-sm hidden md:block">Our services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="liquid-glass rounded-3xl overflow-hidden group"
            >
              <div className="aspect-video relative overflow-hidden">
                <video
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start">
                  <p className="uppercase tracking-widest text-white/40 text-xs">Strategy</p>
                  <button className="liquid-glass rounded-full p-2">
                    <ArrowRight size={16} className="rotate-45" />
                  </button>
                </div>
                <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight mt-2">Research & Insight</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="liquid-glass rounded-3xl overflow-hidden group"
            >
              <div className="aspect-video relative overflow-hidden">
                <video
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start">
                  <p className="uppercase tracking-widest text-white/40 text-xs">Craft</p>
                  <button className="liquid-glass rounded-full p-2">
                    <ArrowRight size={16} className="rotate-45" />
                  </button>
                </div>
                <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight mt-2">Design & Execution</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;