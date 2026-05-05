import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Gift,
  ShoppingBag,
  BookOpen,
  Footprints,
  Shirt,
  Gamepad2,
  Gem,
  Flower,
} from "lucide-react";

interface Giver {
  name: string;
  nickname: string;
}

interface GiftCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  givers: Giver[];
}

const giftCategories: GiftCategory[] = [
  {
    id: "bags",
    title: "7 Royal Bags",
    icon: <ShoppingBag className="w-8 h-8" />,
    color: "from-pink-400 to-rose-400",
    givers: [
      { name: "Ate Love", nickname: "Fashion Fairy" },
      { name: "Ninang Joy", nickname: "Style Queen" },
      { name: "Tito Mark", nickname: "Bag Master" },
      { name: "Ninang Lisa", nickname: "Chic Charm" },
      { name: "Tito Sam", nickname: "Trendy Guru" },
      { name: "Ate Marie", nickname: "Glam Guide" },
      { name: "Ninong Paul", nickname: "Style Wizard" },
    ],
  },
  {
    id: "school",
    title: "7 School Materials",
    icon: <BookOpen className="w-8 h-8" />,
    color: "from-blue-400 to-indigo-400",
    givers: [
      { name: "Ninong Carlo", nickname: "Brain Booster" },
      { name: "Ate Mae", nickname: "Study Buddy" },
      { name: "Tito Jay", nickname: "Notebook King" },
      { name: "Ninang Ruby", nickname: "Smart Star" },
      { name: "Tito Ed", nickname: "Pencil Prince" },
      { name: "Ate Lyn", nickname: "Book Belle" },
      { name: "Ninong Tim", nickname: "Wisdom Keeper" },
    ],
  },
  {
    id: "shoes",
    title: "7 Shoes",
    icon: <Footprints className="w-8 h-8" />,
    color: "from-purple-400 to-pink-400",
    givers: [
      { name: "Ninang Anna", nickname: "Cinderella Step" },
      { name: "Tito Ben", nickname: "Sneaker Hero" },
      { name: "Ate Jem", nickname: "Shoe Fairy" },
      { name: "Ninong Mike", nickname: "Sole King" },
      { name: "Ninang Cath", nickname: "Walk Wonder" },
      { name: "Tito Joe", nickname: "Stride Star" },
      { name: "Ate Bella", nickname: "Step Princess" },
    ],
  },
  {
    id: "dresses",
    title: "7 Dresses",
    icon: <Shirt className="w-8 h-8" />,
    color: "from-rose-400 to-pink-500",
    givers: [
      { name: "Ate Sarah", nickname: "Princess Stylist" },
      { name: "Ninang Kate", nickname: "Royal Designer" },
      { name: "Tito Alex", nickname: "Fashion King" },
      { name: "Ninang Nina", nickname: "Dress Duchess" },
      { name: "Ate Mia", nickname: "Gown Goddess" },
      { name: "Ninong Luis", nickname: "Outfit Oracle" },
      { name: "Ninang Belle", nickname: "Chic Champion" },
    ],
  },
  {
    id: "toys",
    title: "7 Toys",
    icon: <Gamepad2 className="w-8 h-8" />,
    color: "from-amber-400 to-orange-400",
    givers: [
      { name: "Tito Ron", nickname: "Fun Master" },
      { name: "Ate Kim", nickname: "Playtime Queen" },
      { name: "Ninong Dave", nickname: "Joy Keeper" },
      { name: "Ninang Amy", nickname: "Smile Maker" },
      { name: "Tito Chris", nickname: "Game Guru" },
      { name: "Ate Jess", nickname: "Happy Helper" },
      { name: "Ninong Rick", nickname: "Play Prince" },
    ],
  },
  {
    id: "treasures",
    title: "7 Treasures",
    icon: <Gem className="w-8 h-8" />,
    color: "from-yellow-400 to-amber-500",
    givers: [
      { name: "Ninang Rose", nickname: "Golden Heart" },
      { name: "Tito Dan", nickname: "Treasure Keeper" },
      { name: "Ate Gem", nickname: "Jewel Queen" },
      { name: "Ninong Leo", nickname: "Crown Keeper" },
      { name: "Ninang Pearl", nickname: "Sparkle Star" },
      { name: "Tito Max", nickname: "Gem Guardian" },
      { name: "Ate Luna", nickname: "Diamond Dame" },
    ],
  },
  {
    id: "flowers",
    title: "7 Flowers",
    icon: <Flower className="w-8 h-8" />,
    color: "from-pink-300 to-rose-300",
    givers: [
      { name: "Ninang Grace", nickname: "Bloom Fairy" },
      { name: "Ate Lou", nickname: "Petal Princess" },
      { name: "Ninong Tom", nickname: "Garden King" },
      { name: "Ninang Lily", nickname: "Rose Maiden" },
      { name: "Tito Ray", nickname: "Blossom Boss" },
      { name: "Ate Flora", nickname: "Flower Fairy" },
      { name: "Ninong Val", nickname: "Bloom Baron" },
    ],
  },
];

export function RoyalGifts() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const handleCardClick = (categoryId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  return (
    <div className="relative py-20 px-4 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Elegant White Card Container */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-pink-100 p-8 md:p-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Decorative Crown */}
            <motion.div
              className="inline-block mb-6"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                className="text-amber-400 mx-auto drop-shadow-lg"
              >
                <defs>
                  <linearGradient
                    id="crownGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
                <path
                  d="M50,15 L62,38 L85,32 L73,55 L95,62 L50,68 L5,62 L27,55 L15,32 L38,38 Z"
                  fill="url(#crownGradient)"
                  stroke="#d97706"
                  strokeWidth="1"
                />
                <circle
                  cx="50"
                  cy="15"
                  r="6"
                  fill="#fef3c7"
                  stroke="#d97706"
                  strokeWidth="1"
                />
                <circle
                  cx="15"
                  cy="32"
                  r="5"
                  fill="#fef3c7"
                  stroke="#d97706"
                  strokeWidth="1"
                />
                <circle
                  cx="85"
                  cy="32"
                  r="5"
                  fill="#fef3c7"
                  stroke="#d97706"
                  strokeWidth="1"
                />
                <rect
                  x="10"
                  y="62"
                  width="80"
                  height="10"
                  rx="3"
                  fill="url(#crownGradient)"
                  stroke="#d97706"
                  strokeWidth="1"
                />
              </svg>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl mb-4 text-rose-900 font-serif">
                7 Royal Gifts
              </h2>
              <p className="text-xl text-pink-700 italic">
                Magical treasures from our beloved family & friends
              </p>
            </motion.div>

            {/* Decorative Line */}
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-6 rounded-full" />
          </motion.div>

          {/* Gift Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {giftCategories.map((category, index) => (
              <div key={category.id} className="flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  onClick={() => handleCardClick(category.id)}
                  className="cursor-pointer mb-4"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm shadow-lg border border-pink-100 hover:border-pink-300 hover:shadow-xl transition-all duration-300 p-6">
                    {/* Subtle Gold Corner Accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 opacity-20">
                      <svg viewBox="0 0 100 100" className="text-amber-400">
                        <circle cx="80" cy="20" r="15" fill="currentColor" />
                      </svg>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-md`}
                    >
                      {category.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-serif text-rose-900 text-center mb-2">
                      {category.title}
                    </h3>

                    {/* Number Badge */}
                    <div className="flex justify-center mb-3">
                      <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                        7 Givers
                      </div>
                    </div>

                    {/* Expand Indicator */}
                    <div className="text-center text-pink-500 text-xs font-medium">
                      {expandedCards.has(category.id)
                        ? "Hide ▲"
                        : "View Details ▼"}
                    </div>

                    {/* Soft Glow on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-amber-200/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                  </div>
                </motion.div>

                {/* Expanded Details - Below Card */}
                <AnimatePresence>
                  {expandedCards.has(category.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200 p-5"
                      >
                        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-pink-100">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}
                          >
                            {category.icon}
                          </div>
                          <div>
                            <h4 className="text-lg font-serif text-rose-900">
                              {category.title}
                            </h4>
                            <p className="text-xs text-pink-500 italic">
                              Our generous sponsors
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {category.givers.map((giver, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="bg-gradient-to-r from-pink-50/80 to-rose-50/80 rounded-xl p-3 border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-300 to-rose-300 flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0">
                                  {idx + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-rose-900 text-sm truncate">
                                    {giver.name}
                                  </p>
                                  <p className="text-xs text-pink-600 italic truncate">
                                    "{giver.nickname}"
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
