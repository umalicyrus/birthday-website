import { useEffect, useRef, useState } from "react";
import { X, Download, Copy, Check } from "lucide-react";
import QRCode from "qrcode";

interface QRCodeModalProps {
  onClose: () => void;
}

export function QRCodeModal({ onClose }: QRCodeModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const inviteUrl = window.location.origin;

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        inviteUrl,
        {
          width: 300,
          margin: 2,
          color: {
            dark: "#7c3aed", // Purple
            light: "#ffffff",
          },
        },
        (error) => {
          if (error) console.error(error);
        }
      );
    }
  }, [inviteUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const url = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "birthday-invitation-qr.png";
      link.href = url;
      link.click();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl mb-2 text-purple-900">Share Invitation</h2>
          <p className="text-gray-600">Scan QR code or share the link</p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <canvas ref={canvasRef} />
          </div>
        </div>

        {/* URL Display */}
        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-700">Invitation Link</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inviteUrl}
              readOnly
              className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm"
            />
            <button
              onClick={handleCopyLink}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          {copied && (
            <p className="text-sm text-green-600 mt-2 text-center">Link copied to clipboard!</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white py-3 rounded-xl shadow-md transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download QR
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Birthday Invitation",
                  text: "You're invited to Sarah's birthday celebration!",
                  url: inviteUrl,
                });
              } else {
                handleCopyLink();
              }
            }}
            className="bg-rose-400 hover:bg-rose-500 text-white py-3 rounded-xl shadow-md transition-all transform hover:scale-105"
          >
            Share Link
          </button>
        </div>
      </div>
    </div>
  );
}