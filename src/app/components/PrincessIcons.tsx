import { motion } from "motion/react";

interface IconProps {
  className?: string;
}

// Cute Princess Crown Icon
export function CrownIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      transition={{ duration: 0.3 }}
    >
      <defs>
        <linearGradient id="crownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Crown body */}
      <path
        d="M50,20 L60,40 L80,35 L70,55 L90,60 L50,65 L10,60 L30,55 L20,35 L40,40 Z"
        fill="url(#crownGrad)"
        stroke="#d97706"
        strokeWidth="2"
        filter="url(#glow)"
      />

      {/* Jewels */}
      <circle
        cx="50"
        cy="20"
        r="6"
        fill="#fef3c7"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      <circle
        cx="20"
        cy="35"
        r="5"
        fill="#fbcfe8"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      <circle
        cx="80"
        cy="35"
        r="5"
        fill="#fbcfe8"
        stroke="#d97706"
        strokeWidth="1.5"
      />

      {/* Base */}
      <rect
        x="15"
        y="60"
        width="70"
        height="10"
        rx="3"
        fill="url(#crownGrad)"
        stroke="#d97706"
        strokeWidth="2"
      />

      {/* Sparkles */}
      <motion.path
        d="M25,25 L26,28 L29,29 L26,30 L25,33 L24,30 L21,29 L24,28 Z"
        fill="#fef3c7"
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  );
}

// Cute Heart Icon
export function HeartIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <defs>
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#fb7185" />
        </linearGradient>
      </defs>

      <motion.path
        d="M50,85 C50,85 15,60 15,40 C15,25 25,20 35,25 C45,30 50,40 50,40 C50,40 55,30 65,25 C75,20 85,25 85,40 C85,60 50,85 50,85 Z"
        fill="url(#heartGrad)"
        stroke="#fb7185"
        strokeWidth="2"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Shine effect */}
      <ellipse cx="35" cy="35" rx="8" ry="12" fill="white" opacity="0.4" />
    </motion.svg>
  );
}

// Cute Sparkle Icon
export function SparkleIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {/* Main star */}
      <motion.path
        d="M50,10 L55,40 L85,45 L60,55 L65,85 L50,65 L35,85 L40,55 L15,45 L45,40 Z"
        fill="url(#sparkleGrad)"
        stroke="#f59e0b"
        strokeWidth="2"
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Center */}
      <circle cx="50" cy="50" r="8" fill="#fef3c7" />
    </motion.svg>
  );
}

// Cute Camera Icon (Princess Style)
export function CameraPrincessIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      whileHover={{ scale: 1.1, y: -3 }}
    >
      <defs>
        <linearGradient id="cameraGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>

      {/* Camera body */}
      <rect
        x="20"
        y="35"
        width="60"
        height="45"
        rx="8"
        fill="url(#cameraGrad)"
        stroke="#ec4899"
        strokeWidth="2.5"
      />

      {/* Lens */}
      <circle
        cx="50"
        cy="57"
        r="15"
        fill="#fdf2f8"
        stroke="#ec4899"
        strokeWidth="2"
      />
      <circle cx="50" cy="57" r="10" fill="url(#cameraGrad)" />

      {/* Flash */}
      <rect
        x="25"
        y="25"
        width="15"
        height="12"
        rx="3"
        fill="#fef3c7"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />

      {/* Shutter button */}
      <circle
        cx="70"
        cy="45"
        r="4"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />

      {/* Sparkle */}
      <motion.path
        d="M75,30 L76,33 L79,34 L76,35 L75,38 L74,35 L71,34 L74,33 Z"
        fill="#fef3c7"
        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  );
}

// Cute Message/Chat Icon
export function MessagePrincessIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
    >
      <defs>
        <linearGradient id="msgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#f9a8d4" />
        </linearGradient>
      </defs>

      {/* Speech bubble */}
      <rect
        x="15"
        y="20"
        width="70"
        height="50"
        rx="12"
        fill="url(#msgGrad)"
        stroke="#f472b6"
        strokeWidth="2.5"
      />

      {/* Tail */}
      <path
        d="M30,70 L25,85 L40,70 Z"
        fill="url(#msgGrad)"
        stroke="#f472b6"
        strokeWidth="2"
      />

      {/* Hearts inside */}
      <circle cx="35" cy="40" r="5" fill="#f472b6" />
      <circle cx="50" cy="40" r="5" fill="#f472b6" />
      <circle cx="65" cy="40" r="5" fill="#f472b6" />

      {/* Sparkles */}
      <motion.circle
        cx="75"
        cy="25"
        r="3"
        fill="#fef3c7"
        animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
    </motion.svg>
  );
}

// Cute Share Icon (with ribbon)
export function SharePrincessIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      whileHover={{ scale: 1.1 }}
    >
      <defs>
        <linearGradient id="shareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#fb7185" />
        </linearGradient>
      </defs>

      {/* Center circle */}
      <circle
        cx="50"
        cy="50"
        r="12"
        fill="url(#shareGrad)"
        stroke="#fb7185"
        strokeWidth="2.5"
      />

      {/* Connected circles */}
      <circle
        cx="30"
        cy="30"
        r="10"
        fill="url(#shareGrad)"
        stroke="#fb7185"
        strokeWidth="2"
      />
      <circle
        cx="70"
        cy="30"
        r="10"
        fill="url(#shareGrad)"
        stroke="#fb7185"
        strokeWidth="2"
      />
      <circle
        cx="50"
        cy="75"
        r="10"
        fill="url(#shareGrad)"
        stroke="#fb7185"
        strokeWidth="2"
      />

      {/* Connection lines */}
      <line
        x1="38"
        y1="36"
        x2="44"
        y2="45"
        stroke="#fb7185"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="62"
        y1="36"
        x2="56"
        y2="45"
        stroke="#fb7185"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="62"
        x2="50"
        y2="65"
        stroke="#fb7185"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Ribbon bow */}
      <motion.path
        d="M50,20 L45,15 L50,10 L55,15 Z"
        fill="#fbbf24"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "50px 15px" }}
      />
    </motion.svg>
  );
}

// Cute Gift Box Icon
export function GiftPrincessIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <defs>
        <linearGradient id="giftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#fb7185" />
        </linearGradient>
      </defs>

      {/* Gift box */}
      <rect
        x="25"
        y="40"
        width="50"
        height="45"
        rx="5"
        fill="url(#giftGrad)"
        stroke="#fb7185"
        strokeWidth="2.5"
      />

      {/* Ribbon vertical */}
      <rect x="47" y="40" width="6" height="45" fill="#fbbf24" />

      {/* Ribbon horizontal */}
      <rect x="25" y="47" width="50" height="6" fill="#fbbf24" />

      {/* Bow */}
      <ellipse
        cx="35"
        cy="35"
        rx="8"
        ry="6"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />
      <ellipse
        cx="65"
        cy="35"
        rx="8"
        ry="6"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />
      <circle
        cx="50"
        cy="35"
        r="5"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />

      {/* Sparkle */}
      <motion.path
        d="M20,30 L21,33 L24,34 L21,35 L20,38 L19,35 L16,34 L19,33 Z"
        fill="#fef3c7"
        animate={{ opacity: [0, 1, 0], rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.svg>
  );
}

// Cute Location/Map Pin Icon
export function MapPinPrincessIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      whileHover={{ y: -3, scale: 1.1 }}
    >
      <defs>
        <linearGradient id="pinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* Pin body */}
      <path
        d="M50,15 C35,15 25,25 25,40 C25,60 50,85 50,85 C50,85 75,60 75,40 C75,25 65,15 50,15 Z"
        fill="url(#pinGrad)"
        stroke="#ec4899"
        strokeWidth="2.5"
      />

      {/* Inner heart */}
      <motion.path
        d="M50,65 C50,65 35,52 35,42 C35,35 40,32 45,35 C48,37 50,42 50,42 C50,42 52,37 55,35 C60,32 65,35 65,42 C65,52 50,65 50,65 Z"
        fill="white"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  );
}
