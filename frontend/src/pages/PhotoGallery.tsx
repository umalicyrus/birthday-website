import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Upload, ArrowLeft, X, Download } from "lucide-react";
import Masonry from "react-responsive-masonry";

interface Photo {
  id: string;
  url: string;
  caption: string;
}

export function PhotoGallery() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGJpcnRoZGF5JTIwcGFydHl8ZW58MXx8fHwxNzc2MTc4NjczfDA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Happy moments together! 🎉",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1616964524979-c08f6d87c7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNha2UlMjBjYW5kbGVzfGVufDF8fHx8MTc3NjE3ODY3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Make a wish! 🎂",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1598622443054-499119043e82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNlbGVicmF0aW9uJTIwYmFsbG9vbnN8ZW58MXx8fHwxNzc2MTk5NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Beautiful decorations 🎈",
    },
  ]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [uploadCaption, setUploadCaption] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          const newPhoto: Photo = {
            id: Date.now().toString(),
            url: event.target.result as string,
            caption: uploadCaption || "Uploaded photo",
          };
          setPhotos([newPhoto, ...photos]);
          setUploadCaption("");
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-xl md:text-2xl text-rose-900">Photo Gallery</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl mb-4 text-rose-900">Upload Your Photos</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Add a caption..."
              value={uploadCaption}
              onChange={(e) => setUploadCaption(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white px-6 py-3 rounded-xl shadow-md transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Photo</span>
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Share your favorite memories with the birthday celebrant!
          </p>
        </div>

        {/* Photo Grid */}
        {photos.length > 0 ? (
          <Masonry columnsCount={window.innerWidth < 768 ? 2 : 3} gutter="16px">
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-auto object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white p-4 text-sm">{photo.caption}</p>
                </div>
              </div>
            ))}
          </Masonry>
        ) : (
          <div className="text-center py-16 text-gray-400">
            {/* <Camera className="w-16 h-16 mx-auto mb-4" /> */}
            <p>No photos yet. Be the first to upload!</p>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mt-4 flex items-center justify-between">
              <p className="text-white text-lg">{selectedPhoto.caption}</p>
              <button className="text-white hover:text-gray-300 transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
