/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue, Variants } from "motion/react";
import { Heart, Stars, Gift, Play, Pause, Sparkles, PartyPopper, ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";

type Page = "intro" | "card" | "memories" | "letter";

const images = [
  "/assets/images/img1.jpeg",
  "/assets/images/img2.jpeg",
  "/assets/images/img3.jpeg",
  "/assets/images/img4.jpeg",
  "/assets/images/img6.jpeg",
];

const videos = [
  { id: 1, title: "si right mara?", url: "/assets/videos/vid1.mp4" },
  { id: 2, title: "Gorgeous", url: "/assets/videos/vid2.mp4"},
  { id: 3, title: "Ngatitholela sgulane", url: "/assets/videos/vid3.mp4" },
];

const textVariant: Variants = {
  hidden: { opacity: 0, scale: 1.5, y: 50, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1 - (i * 0.02), // Subtle fading effect for later letters
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.5 + i * 0.08,
      duration: 0.8,
      type: "spring",
      damping: 15,
      stiffness: 80,
    }
  })
};

const videoCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.15,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }),
  hover: {
    scale: 1.02,
    y: -10,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

function IntroPage({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-pink-600/5 blur-[150px] rounded-full animate-pulse" />
      </div>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-12 flex justify-center"
        >
          <img 
            src="\assets\images\bg.png" 
            alt="Intro decoration" 
            className="w-48 sm:w-64 h-auto "
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <button
          onClick={onNext}
          className="group relative px-12 py-5 bg-black text-white font-bold text-xl rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-3">
            PRESS ME <Sparkles className="w-6 h-6 text-pink-500" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity" />
        </button>
        
        <p className="mt-8 text-black/40 font-poppins tracking-widest uppercase text-xs">
          A special surprise awaits you
        </p>
      </motion.div>
    </motion.div>
  );
}

function CardPage({ onNext }: { onNext: () => void }) {
  const handleConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff0080", "#00bfff", "#ffffff", "#ffcc00"],
    });
    setTimeout(onNext, 1500);
  };

  return (
    <motion.div
      key="card"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen overflow-hidden bg-white"
    >
      <div className="bg-image-overlay opacity-5" />

      {/* Floating Confetti Button (Now takes to Memories) */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={handleConfetti}
        className="fixed top-8 right-8 z-[100] w-20 h-20 bg-pink-600 rounded-full flex flex-col items-center justify-center shadow-2xl shadow-pink-600/40 hover:scale-110 active:scale-90 transition-transform group"
      >
        <PartyPopper className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        <span className="text-[8px] font-bold mt-1">US</span>
      </motion.button>

      <div className="h-full flex flex-col items-center justify-center p-6 sm:p-12">
        {/* Background Large Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 opacity-10 select-none pointer-events-none">
          <h1 className="bg-text-large font-display">HAPPY</h1>
          <h1 className="bg-text-large font-display">BIRTHDAY</h1>
          <h1 className="bg-text-large font-display">BABY</h1>
        </div>

        {/* 3D Slider Section */}
        <div className="relative z-20 mb-12">
          <div 
            className="slider-container animate-auto-run relative w-[180px] h-[250px] sm:w-[250px] sm:h-[350px]"
            style={{ "--quantity": images.length } as any}
          >
            {images.map((src, index) => (
              <div 
                key={index}
                className="slider-item"
                style={{ "--position": index + 1 } as any}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full h-full rounded-xl overflow-hidden border border-black/5 shadow-2xl shadow-black/20"
                >
                  <img 
                    src={src} 
                    alt={`Birthday moment ${index + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-30 w-full max-w-5xl flex flex-col items-center text-center">
          <div className="flex flex-col mb-8">
            {["HAPPY", "BIRTHDAY", "BABY"].map((word, wordIndex) => (
              <div key={wordIndex} className="flex justify-center overflow-hidden">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    custom={wordIndex * 5 + charIndex}
                    variants={textVariant}
                    initial="hidden"
                    animate="visible"
                    className="birthday-heading font-black tracking-tighter text-black/80 drop-shadow-xl inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="font-poppins"
          >
            <div className="inline-block px-8 py-6 bg-black/5 border border-black/5 backdrop-blur-xl rounded-3xl">
              <h2 className="text-5xl sm:text-7xl font-bold text-pink-600 mb-2"></h2>
              <p className="text-lg font-semibold text-black/60 mb-1">Eish your beauty!😭</p>
              <p className="text-sm text-black/40 leading-relaxed max-w-[300px] mx-auto">
                Ukhule ube mudze phela mna😭
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function MemoriesPage({ onNext }: { onNext: () => void }) {
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [playingId, setPlayingId] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleVideoClick = (id: number, videoElement: HTMLVideoElement) => {
    console.log("Attempting to play video:", id);
    if (videoElement.paused) {
      videoElement.play().catch(err => {
        console.error("Video play failed:", err);
      });
      videoElement.muted = false;
      setPlayingId(id);
    } else {
      videoElement.pause();
      setPlayingId(null);
    }
  };

  return (
    <motion.div
      key="memories"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-white p-8 sm:p-12 overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h2 className="text-5xl sm:text-7xl font-black font-display tracking-tighter mb-4 text-black">
              KUGULA <span className="text-pink-500">KWETHU</span>
            </h2>
            <p className="text-black/40 font-poppins max-w-md">
              A few of moments that define us. Every second with you is a treasure.
            </p>
          </motion.div>

          <button onClick={onNext} className="modern-nav-btn flex items-center gap-2">
            Read My Letter <ChevronDown className="w-5 h-5 -rotate-90" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              custom={index}
              variants={videoCardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={(e) => {
                const videoElement = e.currentTarget.querySelector('video');
                if (videoElement) handleVideoClick(video.id, videoElement);
              }}
              className="group relative aspect-[9/16] bg-black/5 rounded-3xl overflow-hidden border border-black/5 cursor-pointer shadow-xl video-card-glow"
            >
              <video
                src={video.url}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-6 right-6 z-20">
                <motion.button
                  whileTap={{ scale: 1.5 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(video.id);
                  }}
                  className={`p-3 rounded-full backdrop-blur-md border transition-colors ${
                    likes[video.id] ? 'bg-pink-500 border-pink-400' : 'bg-white/10 border-white/20'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likes[video.id] ? 'fill-white text-white' : 'text-white'}`} />
                </motion.button>
              </div>

              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${playingId === video.id ? 'opacity-0 hover:opacity-100' : 'opacity-100'} scale-50 group-hover:scale-100`}>
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                  {playingId === video.id ? (
                    <Pause className="w-8 h-8 fill-white text-white" />
                  ) : (
                    <Play className="w-8 h-8 fill-white text-white ml-1" />
                  )}
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-[1px] w-8 bg-pink-500" />
                  <p className="text-[10px] font-bold tracking-[0.3em] text-pink-500 uppercase">Memory {index + 1}</p>
                </div>
                <h3 className="text-3xl font-black font-display tracking-tight leading-none text-white">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function LetterPage() {
  return (
    <motion.div
      key="letter"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-white flex items-center justify-center p-6 sm:p-12"
    >
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, rotate: 2, scale: 0.9 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="paper-container p-12 sm:p-20 rounded-sm shadow-2xl"
        >
          <div className="absolute top-6 right-6 opacity-10">
            <Heart className="w-16 h-16 text-red-900 fill-current" />
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tighter mb-10 text-brown-900">
            MY <span className="text-red-800">LETTER</span> TO YOU
          </h2>
          
          <div className="space-y-6 handwritten text-lg sm:text-xl text-brown-900 font-medium">
            <p>To my Penguin,</p>
            <p>
              Happy 20th Birthday! Today is a celebration of the most beautiful person I know. 
              Having you in my life was truly a blessing.
            </p>
            <p>
            I love you so much Love. I know you've had your struggles and I'll be here for you. 
            I also know that you'll overcome them, you've made it this far with the hurt you've endured.
            I know you will overcome them because you are stronger than you think.
            </p>
            <p>
            Here's to many more birthdays together,  more adventures, and a lifetime of happiness.
             I could write more but I'll keep it short and sweet just like you.
            </p>
            <p className="pt-11 text-grey-900 italic">
              Songs of Solomon 4:7 - 
              "You are altogether beautiful, my love; there is no flaw in you."

            </p>
            <p className="pt-10 font-bold text-red-900 italic">
              Yours truly, <br />
              
            </p>
          </div>

          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="mt-12 flex justify-center"
          >
            <div className="px-8 py-4 bg-red-900 text-white rounded-full font-bold shadow-lg transform -rotate-2">
              I LOVE YOU ❤️
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("intro");

  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-pink-500/30 overflow-hidden">
      <AnimatePresence mode="wait">
        {currentPage === "intro" && <IntroPage onNext={() => setCurrentPage("card")} />}
        {currentPage === "card" && <CardPage onNext={() => setCurrentPage("memories")} />}
        {currentPage === "memories" && <MemoriesPage onNext={() => setCurrentPage("letter")} />}
        {currentPage === "letter" && <LetterPage />}
      </AnimatePresence>
    </div>
  );
}
