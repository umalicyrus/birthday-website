import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  BookOpen,
  Footprints,
  Shirt,
  Gamepad2,
  Gem,
  Flower,
} from "lucide-react";
import { SparkleIcon, HeartIcon, CrownIcon } from "./PrincessIcons";

interface Giver {
  name: string;
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
      { name: "Eisha" },
      { name: "Zoe" },
      { name: "Zairi" },
      { name: "Alleiah" },
      { name: "Sofia" },
      { name: "Maxie" },
      { name: "Millan" },
    ],
  },
  {
    id: "school",
    title: "7 School Materials",
    icon: <BookOpen className="w-8 h-8" />,
    color: "from-blue-400 to-indigo-400",
    givers: [
      { name: "Prince" },
      { name: "Psalm" },
      { name: "Juan" },
      { name: "Calvin" },
      { name: "Calyx" },
      { name: "Maki and Hans" },
      { name: "Enzo and Ellie" },
    ],
  },
  {
    id: "shoes",
    title: "7 Shoes",
    icon: <Footprints className="w-8 h-8" />,
    color: "from-purple-400 to-pink-400",
    givers: [
      { name: "Janaya" },
      { name: "Bella" },
      { name: "Althea" },
      { name: "Aliyah" },
      { name: "Makayla" },
      { name: "Audree" },
      { name: "Jimrose" },
    ],
  },
  {
    id: "dresses",
    title: "7 Dresses",
    icon: <Shirt className="w-8 h-8" />,
    color: "from-rose-400 to-pink-500",
    givers: [
      { name: "Aaliyah" },
      { name: "Chelo" },
      { name: "Kwin" },
      { name: "Dae" },
      { name: "Keirra" },
      { name: "Sky" },
      { name: "Renee Ann" },
    ],
  },
  {
    id: "toys",
    title: "7 Toys",
    icon: <Gamepad2 className="w-8 h-8" />,
    color: "from-amber-400 to-orange-400",
    givers: [
      { name: "Enzo" },
      { name: "Ken Shinn" },
      { name: "Rafael" },
      { name: "Bedosh" },
      { name: "Harvey" },
      { name: "Ethan" },
      { name: "Matmat" },
    ],
  },
  {
    id: "treasures",
    title: "7 Treasures",
    icon: <Gem className="w-8 h-8" />,
    color: "from-yellow-400 to-amber-500",
    givers: [
      { name: "Ninang Emma" },
      { name: "Ninang Tallie" },
      { name: "Ninang Che Anne" },
      { name: "Ninang Atty Len" },
      { name: "Ninang Michelle" },
      { name: "Ninang Cheska" },
      { name: "Ninang Myla" },
    ],
  },
  {
    id: "flowers",
    title: "7 Flowers",
    icon: <Flower className="w-8 h-8" />,
    color: "from-pink-300 to-rose-300",
    givers: [
      { name: "Ninong Franie" },
      { name: "Ninong Doc Jojo" },
      { name: "Ninong Gewel" },
      { name: "Ninong Ricard" },
      { name: "Lolo Dulo" },
      { name: "Papa" },
      { name: "Daddy Donnie" },
      { name: "Tatay" },
    ],
  },
  {
    id: "special",
    title: "Special Gifts & Wishes",
    icon: <SparkleIcon className="w-10 h-10" />,
    color: "from-amber-300 to-yellow-400",
    givers: [
      { name: "Lola Tining" },
      { name: "Lola Inay" },
      { name: "Lola Luneth" },
      { name: "Lola Mayeth" },
      { name: "Lola Melith" },
      { name: "Tita Dang" },
      { name: "Mama Che" },
      { name: "Ate Ella" },
      { name: "Ate Fiona" },
      { name: "Ate Love Enia" },
      { name: "Ate CJ" },
      { name: "Ate Intel" },
      { name: "Ate Shandel" },
      { name: "Ate Duday" },
      { name: "Tita Rovy" },
      { name: "Ate Ynah" },
      { name: "Madam Mel" },
      { name: "Mommy Jen" },
      { name: "Yani" },
      { name: "Nanay" },
      { name: "Ninang Belle" },
      { name: "Ninang Frailyne" },
      { name: "Tita Rovy" },
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
            <div className="inline-block mb-6">
              <CrownIcon className="w-20 h-20 mx-auto" />
            </div>

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
            {giftCategories.map((category, index) => {
              const isSpecial = category.id === "special";

              return (
                <div
                  key={category.id}
                  className={`flex flex-col ${isSpecial ? "md:col-span-2 lg:col-span-3 xl:col-span-4" : ""}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: isSpecial ? 1.01 : 1.03, y: -3 }}
                    onClick={() => handleCardClick(category.id)}
                    className="cursor-pointer mb-4"
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl backdrop-blur-sm shadow-lg transition-all duration-300 ${
                        isSpecial
                          ? "bg-gradient-to-br from-amber-50/90 via-yellow-50/80 to-pink-50/90 border-2 border-amber-300 hover:border-amber-400 hover:shadow-2xl p-8"
                          : "bg-white/60 border border-pink-100 hover:border-pink-300 hover:shadow-xl p-6"
                      }`}
                    >
                      {/* Special Glowing Border Effect */}
                      {isSpecial && (
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-pink-400 opacity-30 blur-xl -z-10 rounded-2xl"
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                          }}
                        />
                      )}

                      {/* Decorative Elements */}
                      {isSpecial ? (
                        <>
                          {/* Crown decorations for special card */}
                          <div className="absolute top-4 left-4 opacity-20">
                            <CrownIcon className="w-8 h-8 text-amber-500" />
                          </div>
                          <div className="absolute top-4 right-4 opacity-20">
                            <CrownIcon className="w-8 h-8 text-amber-500" />
                          </div>
                          {/* Sparkles */}
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute"
                              style={{
                                top: `${20 + Math.random() * 60}%`,
                                left: `${10 + Math.random() * 80}%`,
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
                            >
                              <svg width="12" height="12" viewBox="0 0 20 20">
                                <path
                                  d="M10 0L11.5 8.5L20 10L11.5 11.5L10 20L8.5 11.5L0 10L8.5 8.5L10 0Z"
                                  fill="#fbbf24"
                                  opacity="0.6"
                                />
                              </svg>
                            </motion.div>
                          ))}
                        </>
                      ) : (
                        <div className="absolute top-0 right-0 w-12 h-12 opacity-20">
                          <svg viewBox="0 0 100 100" className="text-amber-400">
                            <circle
                              cx="80"
                              cy="20"
                              r="15"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Icon */}
                      <div
                        className={`${isSpecial ? "w-20 h-20" : "w-16 h-16"} mx-auto mb-3 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg`}
                      >
                        {category.icon}
                      </div>

                      {/* Title */}
                      <h3
                        className={`${isSpecial ? "text-2xl md:text-3xl" : "text-lg"} font-serif text-rose-900 text-center mb-2 ${isSpecial ? "font-bold" : ""}`}
                      >
                        {category.title}
                      </h3>

                      {isSpecial && (
                        <p className="text-center text-amber-700 italic text-sm mb-3">
                          With love from our cherished family ✨
                        </p>
                      )}

                      {/* Number Badge */}
                      <div className="flex justify-center mb-3">
                        <div
                          className={`bg-gradient-to-r ${
                            isSpecial
                              ? "from-amber-400 to-yellow-400"
                              : "from-pink-400 to-rose-400"
                          } text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm`}
                        >
                          {isSpecial
                            ? `${category.givers.length} Special Givers`
                            : "7 Givers"}
                        </div>
                      </div>

                      {/* Expand Indicator */}
                      <div
                        className={`text-center ${isSpecial ? "text-amber-600" : "text-pink-500"} text-xs font-medium`}
                      >
                        {expandedCards.has(category.id)
                          ? "Hide ▲"
                          : "View Details ▼"}
                      </div>

                      {/* Soft Glow on Hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${
                          isSpecial
                            ? "from-amber-200/30 to-yellow-200/30"
                            : "from-pink-200/20 to-amber-200/20"
                        } opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none`}
                      />
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
                          className={`backdrop-blur-sm rounded-2xl shadow-lg border p-5 ${
                            isSpecial
                              ? "bg-gradient-to-br from-amber-50/90 to-yellow-50/80 border-amber-200"
                              : "bg-white/70 border-pink-200"
                          }`}
                        >
                          <div
                            className={`flex items-center gap-3 mb-4 pb-3 border-b ${
                              isSpecial ? "border-amber-200" : "border-pink-100"
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}
                            >
                              {category.icon}
                            </div>
                            <div>
                              <h4 className="text-lg font-serif text-rose-900">
                                {category.title}
                              </h4>
                              <p
                                className={`text-xs italic ${isSpecial ? "text-amber-600" : "text-pink-500"}`}
                              >
                                {isSpecial
                                  ? "Our beloved family & friends"
                                  : "Our generous sponsors"}
                              </p>
                            </div>
                          </div>

                          {isSpecial ? (
                            // Two-column layout for special category
                            <>
                              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-3">
                                {category.givers.map((giver, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="bg-white/80 rounded-xl p-3 border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all duration-200 flex items-center gap-2"
                                  >
                                    <HeartIcon className="w-5 h-5 flex-shrink-0" />
                                    <p className="font-medium text-rose-900 text-sm">
                                      {giver.name}
                                    </p>
                                  </motion.div>
                                ))}
                              </div>

                              {/* Hide Button */}
                              <div className="flex justify-center mt-6">
                                <button
                                  onClick={() => handleCardClick(category.id)}
                                  className="px-5 py-2 rounded-full text-sm font-medium shadow-md transition-all hover:scale-105 bg-gradient-to-r from-amber-400 to-yellow-400 text-white"
                                >
                                  Hide ▲
                                </button>
                              </div>
                            </>
                          ) : (
                            // Original layout for other categories
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
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                              <div className="flex justify-center mt-6">
                                <button
                                  onClick={() => handleCardClick(category.id)}
                                  className={`px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all hover:scale-105 ${
                                    isSpecial
                                      ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-white"
                                      : "bg-gradient-to-r from-pink-400 to-rose-400 text-white"
                                  }`}
                                >
                                  Hide ▲
                                </button>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
