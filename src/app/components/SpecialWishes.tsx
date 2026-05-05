import { motion } from "motion/react";
import { Heart, Sparkles, Crown } from "lucide-react";

export function SpecialWishes() {
  return (
    <div className="relative py-20 px-4 z-10 overflow-hidden">
      {/* White Card Container */}
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-pink-100 p-4 md:p-6">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Hearts */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Heart className="w-8 h-8 text-pink-300 fill-pink-200" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Elegant Card */}
          <div className="relative bg-gradient-to-br from-white/60 via-pink-50/40 to-rose-50/40 rounded-2xl overflow-hidden">
            {/* Subtle Gold Corner Accents */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20">
              <svg viewBox="0 0 100 100" className="text-amber-400">
                <circle cx="80" cy="20" r="12" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none opacity-20">
              <svg viewBox="0 0 100 100" className="text-amber-400">
                <circle cx="20" cy="80" r="12" fill="currentColor" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative p-8 md:p-12 lg:p-16">
              {/* Crown Header */}
              <motion.div
                className="text-center mb-8"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Crown
                  className="w-16 h-16 mx-auto text-amber-500 mb-4"
                  strokeWidth={1.5}
                />
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-400 to-amber-400 rounded-full" />
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  <div className="w-16 h-1 bg-gradient-to-l from-transparent via-amber-400 to-amber-400 rounded-full" />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-8 text-rose-900"
              >
                Special Birthday Wishes
              </motion.h2>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center space-y-6 mb-8"
              >
                <p className="text-xl md:text-2xl text-rose-800 leading-relaxed font-light italic">
                  "May you grow kind, smart, and brave."
                </p>

                <p className="text-xl md:text-2xl text-rose-800 leading-relaxed font-light italic">
                  "Always remember you are loved beyond words."
                </p>

                <motion.div
                  className="pt-6"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500">
                    Happy 7th Birthday, Naiah! 👑✨
                  </p>
                </motion.div>
              </motion.div>

              {/* Decorative Bottom */}
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </motion.div>
                <div className="w-12 h-1 bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 rounded-full" />
                <Heart className="w-5 h-5 text-pink-400 fill-pink-300" />
                <div className="w-12 h-1 bg-gradient-to-r from-amber-400 via-rose-400 to-pink-400 rounded-full" />
                <motion.div
                  animate={{
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </motion.div>
              </div>
            </div>

            {/* Soft Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-300/30 via-amber-300/30 to-rose-300/30 opacity-50 blur-2xl -z-10 rounded-2xl" />
          </div>

          {/* Floating Quote Decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-center mt-8"
          >
            <p className="text-pink-600 italic text-base">
              With all our love, from Nanay Enya, Tatay Teody, and your entire
              royal family 💖
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
