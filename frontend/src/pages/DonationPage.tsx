import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Gift, DollarSign, Heart, Check } from "lucide-react";
// import confetti from "canvas-confetti";

interface Donation {
  id: string;
  name: string;
  amount: number;
  message: string;
  timestamp: Date;
}

export function DonationPage() {
  const navigate = useNavigate();
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "paypal" | "venmo"
  >("card");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: "1",
      name: "John Doe",
      amount: 50,
      message: "Happy Birthday Sarah! Wishing you all the best! 🎉",
      timestamp: new Date("2026-04-10"),
    },
    {
      id: "2",
      name: "Jane Smith",
      amount: 100,
      message: "Have an amazing day! You deserve it! 💝",
      timestamp: new Date("2026-04-12"),
    },
  ]);

  const presetAmounts = [10, 25, 50, 100];
  const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!donorName || !amount) return;

    const newDonation: Donation = {
      id: Date.now().toString(),
      name: donorName,
      amount: parseFloat(amount),
      message: message,
      timestamp: new Date(),
    };

    setDonations([newDonation, ...donations]);
    setIsSubmitted(true);

    // Celebrate!
    // confetti({
    //   particleCount: 150,
    //   spread: 100,
    //   origin: { y: 0.6 },
    // });

    // Reset form
    setTimeout(() => {
      setDonorName("");
      setAmount("");
      setMessage("");
      setIsSubmitted(false);
    }, 3000);
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
          <h1 className="text-xl md:text-2xl text-rose-900">Send a Gift</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Total Raised Section */}
        <div className="bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl shadow-lg p-6 md:p-8 mb-8 text-white text-center">
          <Gift className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl mb-2">${totalRaised}</h2>
          <p className="text-lg opacity-90">Total Gifts Received</p>
          <p className="text-sm opacity-75 mt-2">
            {donations.length} generous donors
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Donation Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl mb-6 text-purple-900 flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-500" />
              Make a Donation
            </h2>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl mb-2 text-green-600">Thank You!</h3>
                <p className="text-gray-600">
                  Your gift has been sent successfully! 🎉
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-4">
                  <label className="block text-sm mb-2 text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>

                {/* Amount Presets */}
                <div className="mb-4">
                  <label className="block text-sm mb-2 text-gray-700">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {presetAmounts.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAmount(preset.toString())}
                        className={`py-3 rounded-xl transition-all ${
                          amount === preset.toString()
                            ? "bg-pink-500 text-white shadow-md"
                            : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                        }`}
                      >
                        ${preset}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Custom amount"
                      min="1"
                      step="0.01"
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-sm mb-2 text-gray-700">
                    Add a Message (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a birthday wish..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors resize-none"
                  />
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <label className="block text-sm mb-2 text-gray-700">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`py-3 rounded-xl transition-all ${
                        paymentMethod === "card"
                          ? "bg-pink-500 text-white shadow-md"
                          : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                      }`}
                    >
                      Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={`py-3 rounded-xl transition-all ${
                        paymentMethod === "paypal"
                          ? "bg-pink-500 text-white shadow-md"
                          : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                      }`}
                    >
                      PayPal
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("venmo")}
                      className={`py-3 rounded-xl transition-all ${
                        paymentMethod === "venmo"
                          ? "bg-pink-500 text-white shadow-md"
                          : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                      }`}
                    >
                      Venmo
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white py-4 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Gift className="w-5 h-5" />
                  Send Gift of ${amount || "0"}
                </button>
              </form>
            )}
          </div>

          {/* Recent Donations */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl mb-6 text-rose-900">Recent Donations</h2>

            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {donations.map((donation) => (
                <div
                  key={donation.id}
                  className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border-l-4 border-pink-500"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-rose-900">{donation.name}</p>
                      <p className="text-sm text-gray-500">
                        {donation.timestamp.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
                      ${donation.amount}
                    </div>
                  </div>
                  {donation.message && (
                    <p className="text-gray-600 text-sm italic">
                      "{donation.message}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 bg-rose-50 border-l-4 border-rose-500 p-4 rounded-lg">
          <p className="text-sm text-rose-800">
            <strong>Note:</strong> This is a demo interface. In a real
            application, payments would be processed through a secure payment
            gateway like Stripe or PayPal. For production use, consider
            connecting to a backend service for secure payment processing.
          </p>
        </div>
      </div>
    </div>
  );
}
