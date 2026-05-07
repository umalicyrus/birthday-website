// import { useState, useEffect } from "react";
// import {
//   fetchBirthdayMessages,
//   insertBirthdayMessage,
//   subscribeToPhotos,
//   BirthdayMessage,
// } from "../../lib/supabase";
// import { motion } from "motion/react";
// import { Send, Heart, MessageCircle } from "lucide-react";

// /**
//  * Example component showing how to use Supabase in your React app
//  *
//  * Features demonstrated:
//  * - Fetching data from Supabase
//  * - Inserting data to Supabase
//  * - Real-time subscriptions
//  * - Error handling
//  * - Loading states
//  */
// export function SupabaseExample() {
//   const [messages, setMessages] = useState<BirthdayMessage[]>([]);
//   const [name, setName] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Load messages when component mounts
//   useEffect(() => {
//     loadMessages();

//     // Set up real-time subscription
//     const subscription = subscribeToPhotos((payload) => {
//       console.log("Real-time update received:", payload);
//       // You can update your UI based on the payload
//       // For example, if a new photo is added, you might want to reload photos
//     });

//     // Cleanup subscription when component unmounts
//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   async function loadMessages() {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await fetchBirthdayMessages();
//       setMessages(data);
//     } catch (err) {
//       setError(
//         "Failed to load messages. Please check your Supabase configuration.",
//       );
//       console.error("Error loading messages:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     if (!name.trim() || !message.trim()) {
//       setError("Please fill in all fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       await insertBirthdayMessage({
//         name: name.trim(),
//         message: message.trim(),
//       });

//       // Clear form
//       setName("");
//       setMessage("");

//       // Reload messages to show the new one
//       await loadMessages();
//     } catch (err) {
//       setError("Failed to send message. Please try again.");
//       console.error("Error inserting message:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 p-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <MessageCircle className="w-12 h-12 mx-auto mb-4 text-pink-500" />
//           <h2 className="text-3xl font-serif text-rose-900 mb-2">
//             Supabase Example
//           </h2>
//           <p className="text-pink-600">
//             This component demonstrates real-time database integration
//           </p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
//           >
//             {error}
//           </motion.div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="mb-8">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Your Name
//               </label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your name"
//                 className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors"
//                 disabled={loading}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Your Message
//               </label>
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Write your birthday wish..."
//                 rows={4}
//                 className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors resize-none"
//                 disabled={loading}
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white py-4 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Send className="w-5 h-5" />
//               {loading ? "Sending..." : "Send Message"}
//             </button>
//           </div>
//         </form>

//         {/* Messages List */}
//         <div>
//           <h3 className="text-xl font-serif text-rose-900 mb-4 flex items-center gap-2">
//             <Heart className="w-5 h-5 text-pink-500" />
//             Birthday Messages ({messages.length})
//           </h3>

//           {loading && messages.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               Loading messages...
//             </div>
//           ) : messages.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               No messages yet. Be the first to send a birthday wish!
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {messages.map((msg, index) => (
//                 <motion.div
//                   key={msg.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all"
//                 >
//                   <div className="flex items-start gap-3">
//                     {/* Avatar */}
//                     <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
//                       {msg.name.charAt(0).toUpperCase()}
//                     </div>

//                     {/* Content */}
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between mb-1">
//                         <h4 className="font-semibold text-rose-900">
//                           {msg.name}
//                         </h4>
//                         <span className="text-xs text-gray-500">
//                           {msg.created_at
//                             ? new Date(msg.created_at).toLocaleDateString()
//                             : "Just now"}
//                         </span>
//                       </div>
//                       <p className="text-gray-700 leading-relaxed">
//                         {msg.message}
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Info Box */}
//         <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//           <p className="text-sm text-blue-800">
//             <strong>Note:</strong> This is a demo component. To use it:
//             <br />
//             1. Set up your Supabase credentials in{" "}
//             <code className="bg-blue-100 px-1 rounded">.env.local</code>
//             <br />
//             2. Create the required tables using the SQL in{" "}
//             <code className="bg-blue-100 px-1 rounded">SUPABASE_SETUP.md</code>
//             <br />
//             3. Import this component wherever you need Supabase functionality
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SupabaseExample;
