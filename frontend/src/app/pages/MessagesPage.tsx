import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, MessageCircle, Heart, Send } from "lucide-react";

interface Message {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

export function MessagesPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      name: "Emily Johnson",
      message: "Happy Birthday Sarah! May this year bring you endless joy and success! 🎉🎂",
      timestamp: new Date("2026-04-10T10:30:00"),
    },
    {
      id: "2",
      name: "Michael Brown",
      message: "Wishing you a fantastic birthday filled with love and laughter! 🎈",
      timestamp: new Date("2026-04-11T14:20:00"),
    },
    {
      id: "3",
      name: "Lisa Anderson",
      message: "Hope your special day is as wonderful as you are! Happy Birthday! 💝",
      timestamp: new Date("2026-04-12T09:15:00"),
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !message) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      name: name,
      message: message,
      timestamp: new Date(),
    };

    setMessages([newMessage, ...messages]);
    setName("");
    setMessage("");
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
          <h1 className="text-xl md:text-2xl text-rose-900">Birthday Wishes</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl shadow-lg p-6 md:p-8 mb-8 text-white text-center">
          <MessageCircle className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl mb-2">{messages.length}</h2>
          <p className="text-lg opacity-90">Birthday Wishes</p>
        </div>

        {/* Message Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl mb-6 text-rose-900 flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-500" />
            Leave a Birthday Wish
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-700">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2 text-gray-700">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your birthday wish..."
                rows={4}
                required
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white py-4 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Birthday Wish
            </button>
          </form>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          <h2 className="text-2xl text-rose-900 mb-4">All Birthday Wishes</h2>

          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
              style={{
                animation: index < 3 ? `fadeIn 0.5s ease-in ${index * 0.1}s backwards` : "none",
              }}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0 text-white text-lg">
                  {msg.name.charAt(0).toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-rose-900">{msg.name}</h3>
                    <span className="text-sm text-gray-500">
                      {msg.timestamp.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}