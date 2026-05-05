import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  X,
  Download,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Masonry from "react-responsive-masonry";
import { AnimatePresence, motion } from "motion/react";
import { PrincessBackground } from "../components/PrincessBackground";

interface Photo {
  id: string;
  url: string;
  caption: string;
  likes: number;
  isLiked: boolean;
}

const allNaiahPhotos: Photo[] = Array.from({ length: 30 }, (_, i) => ({
  id: String(i + 1),
  url: `/${i + 1}.jpg`,
  caption: [
    "Radiant smile on my special day",
    "Golden hour glow",
    "Celebrating life and love",
    "Beautiful moments captured",
    "Elegance and grace",
    "Pure joy",
    "Cherished memories",
    "Graceful moments",
    "Happiness captured",
    "Special moments",
    "Beautiful memories",
    "Joyful celebration",
    "Timeless beauty",
    "Precious moments",
    "Heartfelt smiles",
    "Magical times",
    "Sweet memories",
    "Glowing happiness",
    "Unforgettable moments",
    "Radiant joy",
    "Perfect day",
    "Beautiful soul",
    "Treasured memories",
    "Blessed moments",
    "Wonderful times",
    "Shining bright",
    "Lovely memories",
    "Happy heart",
    "Special day",
    "Pure happiness",
  ][i],
  likes: Math.floor(Math.random() * 300) + 100,
  isLiked: false,
}));

export function PhotoGallery() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<Photo[]>(allNaiahPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const displayPhotos = showFavoritesOnly
    ? photos.filter((p) => p.isLiked)
    : photos;

  const handleLike = (photoId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPhotos(
      photos.map((photo) =>
        photo.id === photoId
          ? {
              ...photo,
              isLiked: !photo.isLiked,
              likes: photo.isLiked ? photo.likes - 1 : photo.likes + 1,
            }
          : photo,
      ),
    );
  };

  const handleDownload = async (url: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `sarah-birthday-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleShare = async (photo: Photo, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Celebrating Sarah",
          text: photo.caption,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    }
  };

  const navigatePhoto = (direction: "next" | "prev") => {
    if (!selectedPhoto) return;
    const currentPhotos = displayPhotos;
    const currentIndex = currentPhotos.findIndex(
      (p) => p.id === selectedPhoto.id,
    );
    let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= currentPhotos.length) newIndex = 0;
    if (newIndex < 0) newIndex = currentPhotos.length - 1;

    setSelectedPhoto(currentPhotos[newIndex]);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      navigatePhoto("next");
    }
    if (isRightSwipe) {
      navigatePhoto("prev");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === "ArrowLeft") navigatePhoto("prev");
      if (e.key === "ArrowRight") navigatePhoto("next");
      if (e.key === "Escape") setSelectedPhoto(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Princess Magical Background */}
      <PrincessBackground />

      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-serif text-rose-900">
              Celebrating Naiah
            </h1>
            <p className="text-sm text-pink-600 mt-1">
              Beautiful moments and cherished memories
            </p>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Gallery Controls */}
        <div className="flex justify-end items-center mb-8">
          {/* Floating Favorite Filter */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-xl transition-all duration-300 border-2 ${
              showFavoritesOnly
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-300"
                : "bg-white/95 backdrop-blur-sm text-pink-600 hover:bg-pink-50 border-pink-200"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${showFavoritesOnly ? "fill-white" : ""}`}
            />
            <span>{showFavoritesOnly ? "Show All" : "Favorites Only"}</span>
            {showFavoritesOnly && (
              <span className="bg-white/30 px-2 py-0.5 rounded-full text-sm">
                {photos.filter((p) => p.isLiked).length}
              </span>
            )}
          </motion.button>
        </div>

        {/* All Photos Grid */}
        <Masonry
          columnsCount={
            window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4
          }
          gutter="16px"
        >
          {displayPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedPhoto(photo)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ boxShadow: "0 0 30px rgba(236, 72, 153, 0.5)" }}
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm">{photo.caption}</p>
              </div>

              <button
                onClick={(e) => handleLike(photo.id, e)}
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${photo.isLiked ? "fill-pink-500 text-pink-500" : "text-gray-600"}`}
                />
              </button>

              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Heart className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-medium text-gray-700">
                  {photo.likes}
                </span>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white hover:text-pink-300 transition-colors z-50 bg-black/50 backdrop-blur-sm p-2 rounded-full"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto("prev");
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-pink-300 transition-colors z-50 bg-black/50 backdrop-blur-sm p-3 rounded-full"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto("next");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-pink-300 transition-colors z-50 bg-black/50 backdrop-blur-sm p-3 rounded-full"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-auto rounded-2xl shadow-2xl max-h-[80vh] object-contain mx-auto"
              />

              {/* Photo Info Bar */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mt-4 flex items-center justify-between flex-wrap gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={(e) => handleLike(selectedPhoto.id, e)}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${selectedPhoto.isLiked ? "fill-pink-400 text-pink-400" : "text-white"}`}
                    />
                    <span className="text-white font-medium">
                      {selectedPhoto.likes}
                    </span>
                  </button>
                  <p className="text-white text-lg flex-1">
                    {selectedPhoto.caption}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleShare(selectedPhoto, e)}
                    className="text-white hover:text-pink-300 transition-colors bg-white/20 hover:bg-white/30 p-2 rounded-full"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => handleDownload(selectedPhoto.url, e)}
                    className="text-white hover:text-pink-300 transition-colors bg-white/20 hover:bg-white/30 p-2 rounded-full"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
