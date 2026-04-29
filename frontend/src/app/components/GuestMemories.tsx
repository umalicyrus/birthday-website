import { useState, useRef } from "react";
import { X, Upload, Camera, Heart, Download, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Masonry from "react-responsive-masonry";
import { toast } from "sonner";

interface GuestPhoto {
  id: string;
  url: string;
  caption: string;
  likes: number;
  isLiked: boolean;
  uploadedBy: string;
  timestamp: Date;
}

interface GuestMemoriesProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GuestMemories({ isOpen, onClose }: GuestMemoriesProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<GuestPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<GuestPhoto | null>(null);
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploaderName, setUploaderName] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
          setShowUploadForm(true);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmitUpload = () => {
    if (!previewImage) return;

    const newPhoto: GuestPhoto = {
      id: Date.now().toString(),
      url: previewImage,
      caption: uploadCaption || "A special memory",
      likes: 0,
      isLiked: false,
      uploadedBy: uploaderName || "Guest",
      timestamp: new Date(),
    };

    setPhotos([newPhoto, ...photos]);
    setUploadCaption("");
    setUploaderName("");
    setPreviewImage(null);
    setShowUploadForm(false);

    toast.success("Your photo has been added! 🎉", {
      description: "Thank you for sharing this memory with Sarah!",
    });
  };

  const handleLike = (photoId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPhotos(photos.map(photo =>
      photo.id === photoId
        ? { ...photo, isLiked: !photo.isLiked, likes: photo.isLiked ? photo.likes - 1 : photo.likes + 1 }
        : photo
    ));
  };

  const handleDownload = async (url: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `guest-memory-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-pink-50 via-white to-rose-50 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-pink-100 transition-colors bg-white/20 backdrop-blur-sm p-2 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-serif text-white mb-2">Guest Memories</h2>
            <p className="text-pink-100">Share your favorite moments with Sarah</p>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
            {/* Upload Section */}
            {!showUploadForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 border border-pink-100"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl mb-2 text-rose-900">Share a Memory</h3>
                  <p className="text-gray-600 mb-6">Upload a photo to celebrate Sarah's special day</p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white px-8 py-4 rounded-xl shadow-md transition-all transform hover:scale-105 flex items-center justify-center gap-3 mx-auto"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="text-lg">Choose Photo</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Upload Form with Preview */}
            {showUploadForm && previewImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 border border-pink-100"
              >
                <h3 className="text-xl mb-4 text-rose-900">Preview Your Photo</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Image Preview */}
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                    />
                  </div>

                  {/* Form Fields */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., John Doe"
                        value={uploaderName}
                        onChange={(e) => setUploaderName(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Caption
                      </label>
                      <textarea
                        placeholder="Add a caption..."
                        value={uploadCaption}
                        onChange={(e) => setUploadCaption(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors resize-none"
                      />
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <button
                        onClick={() => {
                          setShowUploadForm(false);
                          setPreviewImage(null);
                          setUploadCaption("");
                          setUploaderName("");
                        }}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmitUpload}
                        className="flex-1 bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white px-4 py-3 rounded-xl shadow-md transition-all transform hover:scale-105"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Gallery */}
            {photos.length > 0 ? (
              <div>
                <h3 className="text-2xl mb-6 text-rose-900 font-serif">Shared Memories ({photos.length})</h3>
                <Masonry columnsCount={window.innerWidth < 640 ? 2 : 3} gutter="16px">
                  {photos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedPhoto(photo)}
                      className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-sm font-medium mb-1">{photo.caption}</p>
                        <p className="text-pink-200 text-xs">By {photo.uploadedBy}</p>
                      </div>

                      <button
                        onClick={(e) => handleLike(photo.id, e)}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors ${photo.isLiked ? 'fill-pink-500 text-pink-500' : 'text-gray-600'}`}
                        />
                      </button>

                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Heart className="w-4 h-4 text-pink-500" />
                        <span className="text-sm font-medium text-gray-700">{photo.likes}</span>
                      </div>
                    </motion.div>
                  ))}
                </Masonry>
              </div>
            ) : (
              !showUploadForm && (
                <div className="text-center py-12 text-gray-400">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-pink-300" />
                  <p className="text-lg">No guest photos yet</p>
                  <p className="text-sm">Be the first to share a memory!</p>
                </div>
              )
            )}
          </div>
        </motion.div>

        {/* Photo Lightbox */}
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white hover:text-pink-300 transition-colors z-50 bg-black/50 backdrop-blur-sm p-2 rounded-full"
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-auto rounded-2xl shadow-2xl max-h-[80vh] object-contain mx-auto"
              />

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
                      className={`w-5 h-5 ${selectedPhoto.isLiked ? 'fill-pink-400 text-pink-400' : 'text-white'}`}
                    />
                    <span className="text-white font-medium">{selectedPhoto.likes}</span>
                  </button>
                  <div className="flex-1">
                    <p className="text-white text-lg">{selectedPhoto.caption}</p>
                    <p className="text-pink-200 text-sm">Shared by {selectedPhoto.uploadedBy}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
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
      </motion.div>
    </AnimatePresence>
  );
}
