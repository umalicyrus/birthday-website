import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Gift,
  Camera,
  MessageCircle,
  Share2,
  Cake,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import { QRCodeModal } from "../components/QRCodeModal";
import confetti from "canvas-confetti";

export function LandingPage() {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Birthday date - you can customize this
  const birthdayDate = new Date("2026-04-20T00:00:00");

  // Celebrant gallery images
  const galleryImages = [
    "https://images.unsplash.com/photo-1545311630-51ea4a4c84de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdCUyMGhhcHB5fGVufDF8fHx8MTc3NjIyNzU0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1573574695985-ddbf1c72fb07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwbGF1Z2hpbmclMjBtZW1vcmllc3xlbnwxfHx8fDE3NzYyMzgwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1760036120418-4b9de114fd3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxlYnJhdGlvbiUyMHBhcnR5JTIwbW9tZW50c3xlbnwxfHx8fDE3NzYyMzgwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1598622443054-499119043e82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNlbGVicmF0aW9uJTIwYmFsbG9vbnN8ZW58MXx8fHwxNzc2MTk5NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  ];

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
        // Birthday has arrived!
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
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
              <img
                src="https://images.unsplash.com/photo-1616964524979-c08f6d87c7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNha2UlMjBjYW5kbGVzfGVufDF8fHx8MTc3NjE3ODY3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Birthday Celebrant"
                className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white p-3 rounded-full shadow-lg">
                <Cake className="w-6 h-6 md:w-8 md:h-8" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl mb-4 text-rose-900">
            🎉 You're Invited! 🎉
          </h1>
          <p className="text-xl md:text-3xl mb-2 text-rose-800">
            Join us in celebrating
          </p>
          <h2 className="text-3xl md:text-5xl mb-6 text-pink-600">
            Sarah's Birthday
          </h2>

          {/* Date & Time */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-4 text-rose-700">
              <Calendar className="w-5 h-5" />
              <p className="text-lg">May 15, 2026 at 6:00 PM</p>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            <button
              onClick={() => navigate("/donate")}
              className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-xl p-4 shadow-lg transition-all transform hover:scale-105 flex flex-col items-center gap-2"
            >
              <Gift className="w-6 h-6" />
              <span className="text-sm md:text-base">Send Gift</span>
            </button>

            <button
              onClick={() => navigate("/photos")}
              className="bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white rounded-xl p-4 shadow-lg transition-all transform hover:scale-105 flex flex-col items-center gap-2"
            >
              <Camera className="w-6 h-6" />
              <span className="text-sm md:text-base">Photos</span>
            </button>

            <button
              onClick={() => navigate("/messages")}
              className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white rounded-xl p-4 shadow-lg transition-all transform hover:scale-105 flex flex-col items-center gap-2"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm md:text-base">Messages</span>
            </button>

            <button
              onClick={() => setShowQR(true)}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl p-4 shadow-lg transition-all transform hover:scale-105 flex flex-col items-center gap-2"
            >
              <Share2 className="w-6 h-6" />
              <span className="text-sm md:text-base">Share</span>
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

      {/* Gallery Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-rose-900">
              Celebrating Sarah
            </h2>
            <p className="text-lg text-rose-700">
              Beautiful moments and cherished memories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl shadow-lg aspect-square"
              >
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/photos")}
              className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 inline-flex items-center gap-2"
            >
              <Camera className="w-5 h-5" />
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
                src="https://images.unsplash.com/photo-1768851142314-c4ebf49ad45b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwdmVudUUlMjBwYXJ0eSUyMGhhbGx8ZW58MXx8fHwxNzc2MjM4MDYyfDA&ixlib=rb-4.1.0&q=80&w=1080"
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
                    <p className="text-rose-700">The Grand Ballroom</p>
                    <p className="text-rose-600">123 Celebration Avenue</p>
                    <p className="text-rose-600">Downtown, City 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-rose-900">Time</h3>
                    <p className="text-rose-700">May 15, 2026</p>
                    <p className="text-rose-600">6:00 PM - 11:00 PM</p>
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
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white text-center py-4 rounded-xl shadow-lg transition-all transform hover:scale-105"
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
    </div>
  );
}
