import { motion } from "motion/react";

export function PrincessBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/bgimage.png)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          filter: "none",
        }}
      />

      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-rose-100/10 to-amber-100/20" />

      {/* Castle Silhouettes */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="absolute left-10 bottom-0 w-64 h-64 text-pink-300"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          {/* Left Castle */}
          <path d="M20,200 L20,100 L30,100 L30,90 L40,90 L40,100 L50,100 L50,90 L60,90 L60,100 L70,100 L70,200 Z" />
          <rect x="35" y="120" width="10" height="15" />
          <rect x="35" y="150" width="10" height="15" />
          <polygon points="20,100 45,70 70,100" />
        </svg>

        <svg
          className="absolute right-20 bottom-0 w-96 h-96 text-pink-300"
          viewBox="0 0 300 300"
          fill="currentColor"
        >
          {/* Right Castle - Larger */}
          <path d="M50,300 L50,120 L65,120 L65,105 L80,105 L80,120 L95,120 L95,105 L110,105 L110,120 L125,120 L125,105 L140,105 L140,120 L155,120 L155,300 Z" />
          <rect x="75" y="150" width="20" height="30" />
          <rect x="110" y="150" width="20" height="30" />
          <rect x="75" y="200" width="20" height="30" />
          <rect x="110" y="200" width="20" height="30" />
          <polygon points="50,120 102.5,70 155,120" />
          <circle cx="102.5" cy="90" r="8" />
        </svg>
      </div>

      {/* Bokeh Lights */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`bokeh-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 80 + 40}px`,
            height: `${Math.random() * 80 + 40}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              i % 3 === 0
                ? "rgba(251, 207, 232, 0.3)"
                : i % 3 === 1
                  ? "rgba(252, 231, 243, 0.3)"
                  : "rgba(254, 243, 199, 0.3)"
            } 0%, transparent 70%)`,
            filter: "blur(15px)",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Floating Sparkles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0L11.5 8.5L20 10L11.5 11.5L10 20L8.5 11.5L0 10L8.5 8.5L10 0Z"
              fill={i % 2 === 0 ? "#fbbf24" : "#fcd34d"}
              opacity="0.8"
            />
          </svg>
        </motion.div>
      ))}

      {/* Glitter Particles */}
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={`glitter-${i}`}
          className="absolute w-1 h-1 bg-yellow-200 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, -30, -60],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Floral Decorations - Top Corners */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-20">
        <svg viewBox="0 0 200 200" fill="none">
          {/* Pink Rose Top Left */}
          <circle cx="50" cy="50" r="30" fill="#fbcfe8" opacity="0.6" />
          <circle cx="50" cy="50" r="20" fill="#f9a8d4" opacity="0.7" />
          <circle cx="50" cy="50" r="10" fill="#f472b6" opacity="0.8" />
          <circle cx="80" cy="40" r="25" fill="#fbcfe8" opacity="0.5" />
          <circle cx="80" cy="40" r="15" fill="#f9a8d4" opacity="0.6" />
          <circle cx="30" cy="80" r="28" fill="#fbcfe8" opacity="0.5" />
          <circle cx="30" cy="80" r="18" fill="#f9a8d4" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 opacity-20 transform scale-x-[-1]">
        <svg viewBox="0 0 200 200" fill="none">
          {/* Pink Rose Top Right (mirrored) */}
          <circle cx="50" cy="50" r="30" fill="#fbcfe8" opacity="0.6" />
          <circle cx="50" cy="50" r="20" fill="#f9a8d4" opacity="0.7" />
          <circle cx="50" cy="50" r="10" fill="#f472b6" opacity="0.8" />
          <circle cx="80" cy="40" r="25" fill="#fbcfe8" opacity="0.5" />
          <circle cx="80" cy="40" r="15" fill="#f9a8d4" opacity="0.6" />
          <circle cx="30" cy="80" r="28" fill="#fbcfe8" opacity="0.5" />
          <circle cx="30" cy="80" r="18" fill="#f9a8d4" opacity="0.6" />
        </svg>
      </div>

      {/* Pearl Decorations */}
      <div className="absolute top-20 left-10 opacity-15">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`pearl-left-${i}`}
            className="w-3 h-3 bg-white rounded-full mb-2 shadow-lg"
            style={{
              marginLeft: `${i * 2}px`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="absolute top-20 right-10 opacity-15">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`pearl-right-${i}`}
            className="w-3 h-3 bg-white rounded-full mb-2 shadow-lg"
            style={{
              marginRight: `${i * 2}px`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Crown Watermark Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(6)].map((_, i) => (
          <svg
            key={`crown-${i}`}
            className="absolute text-amber-400"
            style={{
              left: `${(i % 3) * 40 + 10}%`,
              top: `${Math.floor(i / 3) * 50 + 20}%`,
              width: "80px",
              height: "80px",
            }}
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M50,20 L60,40 L80,35 L70,55 L90,60 L50,65 L10,60 L30,55 L20,35 L40,40 Z" />
            <circle cx="50" cy="20" r="5" />
            <circle cx="20" cy="35" r="4" />
            <circle cx="80" cy="35" r="4" />
            <rect x="15" y="60" width="70" height="8" rx="2" />
          </svg>
        ))}
      </div>

      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/50 via-transparent to-amber-50/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-rose-50/30 via-transparent to-pink-50/30" />

      {/* Radial Glow Center */}
      <div className="absolute inset-0 bg-radial-gradient from-white/20 via-transparent to-transparent opacity-40" />
    </div>
  );
}
