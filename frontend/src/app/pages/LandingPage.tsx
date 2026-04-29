import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Camera,
  MessageCircle,
  Share2,
  Cake,
  Calendar,
  MapPin,
  Clock,
  Image,
} from "lucide-react";
import { QRCodeModal } from "../components/QRCodeModal";
import { GuestMemories } from "../components/GuestMemories";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

const allSarahPhotos = Array.from({ length: 30 }, (_, i) => `/${i + 1}.jpg`);

function getRandomPhotos(
  photos: string[],
  count: number,
  exclude: string[] = [],
): string[] {
  const available = photos.filter((p) => !exclude.includes(p));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const premiumTransition = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
  transition: {
    duration: 1.5, // Increased from 0.8 to 1.5
    ease: [0.4, 0, 0.2, 1],
  },
};

export function LandingPage() {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);
  const [showGuestMemories, setShowGuestMemories] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [galleryImages, setGalleryImages] = useState(() =>
    getRandomPhotos(allSarahPhotos, 4),
  );
  const [prevGalleryImages, setPrevGalleryImages] = useState<string[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const [nextImages, setNextImages] = useState<string[]>([]);

  const birthdayDate = new Date("2026-05-20T18:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = birthdayDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   if (isGalleryHovered) return;

  //   const galleryTimer = setInterval(() => {
  //     setPrevGalleryImages([...galleryImages]);
  //     const newImages =
  //       nextImages.length > 0
  //         ? nextImages
  //         : getRandomPhotos(allSarahPhotos, 4, galleryImages);
  //     setGalleryImages(newImages);

  //     // Preload next set for smooth transition
  //     const preloadNext = getRandomPhotos(allSarahPhotos, 4, newImages);
  //     setNextImages(preloadNext);
  //     preloadNext.forEach((src) => {
  //       const img = new Image();
  //       img.src = src;
  //     });
  //   }, 4500);

  //   return () => clearInterval(galleryTimer);
  // }, [galleryImages, isGalleryHovered, nextImages]);
  useEffect(() => {
    if (isGalleryHovered) return;

    const galleryTimer = setInterval(() => {
      setPrevGalleryImages([...galleryImages]);
      const newImages =
        nextImages.length > 0
          ? nextImages
          : getRandomPhotos(allSarahPhotos, 4, galleryImages);
      setGalleryImages(newImages);

      const preloadNext = getRandomPhotos(allSarahPhotos, 4, newImages);
      setNextImages(preloadNext);
      preloadNext.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }, 6000); // 2. Increased from 4500 to 6000 (6 seconds)

    return () => clearInterval(galleryTimer);
  }, [galleryImages, isGalleryHovered, nextImages]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCelebrate = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1598622443054-499119043e82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNlbGVicmF0aW9uJTIwYmFsbG9vbnN8ZW58MXx8fHwxNzc2MTk5NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              {/* Background Echo Effect */}
              <motion.div
                className="absolute inset-0 w-32 h-32 md:w-48 md:h-48 rounded-full blur-3xl opacity-30"
                style={{
                  backgroundImage: "url(/10.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Animated Gold Ring */}
              <motion.div
                className="absolute -inset-3 rounded-full"
                style={{
                  background:
                    "linear-gradient(45deg, #f9a8d4, #fbbf24, #fb923c, #f9a8d4)",
                  backgroundSize: "300% 300%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  rotate: [0, 360],
                }}
                transition={{
                  backgroundPosition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <div className="absolute inset-1 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 rounded-full" />
              </motion.div>

              {/* Main Profile Image */}
              <motion.div
                className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl"
                style={{
                  transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
                }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 40px rgba(236, 72, 153, 0.6)",
                }}
              >
                <img
                  src="/10.jpg"
                  alt="Sarah"
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: "center 30%",
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Birthday Cake Badge */}
              <motion.div
                className="absolute -bottom-2 -right-2 bg-gradient-to-br from-pink-500 to-rose-500 text-white p-3 rounded-full shadow-lg"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Cake className="w-6 h-6 md:w-8 md:h-8" />
              </motion.div>

              {/* Sparkle Effects */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                  style={{
                    top: `${20 + Math.cos((i * Math.PI * 2) / 6) * 80}%`,
                    left: `${50 + Math.sin((i * Math.PI * 2) / 6) * 80}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl mb-4 text-rose-900">
            🎉 You're Invited! 🎉
          </h1>
          <p className="text-xl md:text-3xl mb-2 text-rose-800">
            Join us in celebrating
          </p>
          <h2 className="text-3xl md:text-5xl mb-6 text-pink-600">
            Naiah's Birthday
          </h2>

          {/* Date & Time */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-4 text-rose-700">
              <Calendar className="w-5 h-5" />
              <p className="text-lg">May 20, 2026 at 6:00 PM</p>
            </div>

            {/* Countdown */}
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              <div className="bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-xl p-3 md:p-4">
                <div className="text-2xl md:text-4xl">{timeLeft.days}</div>
                <div className="text-xs md:text-sm">Days</div>
              </div>
              <div className="bg-gradient-to-br from-rose-400 to-rose-500 text-white rounded-xl p-3 md:p-4">
                <div className="text-2xl md:text-4xl">{timeLeft.hours}</div>
                <div className="text-xs md:text-sm">Hours</div>
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-xl p-3 md:p-4">
                <div className="text-2xl md:text-4xl">{timeLeft.minutes}</div>
                <div className="text-xs md:text-sm">Minutes</div>
              </div>
              <div className="bg-gradient-to-br from-rose-400 to-pink-400 text-white rounded-xl p-3 md:p-4">
                <div className="text-2xl md:text-4xl">{timeLeft.seconds}</div>
                <div className="text-xs md:text-sm">Seconds</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 max-w-3xl mx-auto">
            <button
              onClick={() => setShowGuestMemories(true)}
              className="bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white rounded-xl p-5 shadow-lg transition-all transform hover:scale-105 flex flex-col items-center gap-2"
            >
              <Camera className="w-7 h-7" />
              <span className="text-base md:text-lg">Upload Photo</span>
            </button>

            <button
              onClick={() => navigate("/messages")}
              className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white rounded-xl p-5 shadow-lg transition-all transform hover:scale-105 flex flex-col items-center gap-2"
            >
              <MessageCircle className="w-7 h-7" />
              <span className="text-base md:text-lg">Messages</span>
            </button>

            <button
              onClick={() => setShowQR(true)}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl p-5 shadow-lg transition-all transform hover:scale-105 flex flex-col items-center gap-2"
            >
              <Share2 className="w-7 h-7" />
              <span className="text-base md:text-lg">Share</span>
            </button>
          </div>

          {/* Celebrate Button */}
          <button
            onClick={handleCelebrate}
            className="bg-white text-pink-600 px-8 py-3 rounded-full shadow-lg text-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            🎊 Celebrate Now! 🎊
          </button>
        </div>
      </div>

      {/* Sarah's Gallery Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-rose-100 px-6 py-2 rounded-full mb-4">
              <Image className="w-5 h-5 text-pink-600" />
              <span className="text-sm font-medium text-pink-900">
                Naiah's Moments
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl mb-4 text-rose-900 font-serif">
              Celebrating Naiah
            </h2>
            <p className="text-lg text-rose-700">
              Beautiful moments and cherished memories
            </p>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            onMouseEnter={() => setIsGalleryHovered(true)}
            onMouseLeave={() => setIsGalleryHovered(false)}
          >
            <AnimatePresence mode="wait">
              {galleryImages.map((img, index) => (
                <motion.div
                  key={`${img}-${index}`} // Use index or unique ID to ensure Framer tracks it
                  initial={premiumTransition.initial}
                  animate={premiumTransition.animate}
                  exit={premiumTransition.exit}
                  transition={{
                    duration: 1.5, // Matches the premiumTransition
                    delay: index * 0.2, // Slightly increased stagger for elegance
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="relative group overflow-hidden rounded-2xl shadow-lg aspect-square cursor-pointer"
                  onClick={() => navigate("/photos")}
                >
                  <motion.img
                    src={img}
                    alt={`Sarah ${index + 1}`}
                    className="w-full h-full object-cover"
                    // Slowed down the subtle scale-in effect as well
                    animate={{ scale: 1.02 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  {/* ... rest of your overlays */}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/photos")}
              className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 inline-flex items-center gap-2"
            >
              <Image className="w-5 h-5" />
              View All Photos
            </button>
          </div>
        </div>
      </div>

      {/* Venue Section */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-rose-900">
              Venue Details
            </h2>
            <p className="text-lg text-rose-700">
              Join us at this beautiful location
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Venue Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-64 md:h-auto">
              <img
                src="./public/unnamed.jpg"
                alt="Venue"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent" />
            </div>

            {/* Venue Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-rose-900">Location</h3>
                    <p className="text-rose-700"> Jollibee Xentro Mall</p>
                    <p className="text-rose-700"> Roxas Drive</p>
                    <p className="text-rose-600">Sto. Niño</p>
                    <p className="text-rose-600">
                      Calapan City, Oriental Mindoro
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-rose-900">Time</h3>
                    <p className="text-rose-700">
                      May 20, 2026 at 2:00 PM to 4:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Cake className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-rose-900">Dress Code</h3>
                    <p className="text-rose-700">Semi-Formal</p>
                    <p className="text-rose-600">Feel free to wear pink! 💖</p>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/place/Jollibee+Xentro+Mall/@13.4038575,121.1815391,17z/data=!3m1!4b1!4m6!3m5!1s0x33bce9ad2f64c64f:0x5b504dbe7b0f7e5a!8m2!3d13.4038575!4d121.184114!16s%2Fg%2F11clyt1tg4?entry=ttu&g_ep=EgoyMDI2MDQxOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-linear-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white text-center py-4 rounded-xl shadow-lg transition-all transform hover:scale-105"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && <QRCodeModal onClose={() => setShowQR(false)} />}

      {/* Guest Memories Modal */}
      <GuestMemories
        isOpen={showGuestMemories}
        onClose={() => setShowGuestMemories(false)}
      />
    </div>
  );
}
