import { useState, useEffect } from "react";

const QRScanner = ({ studentId }) => {
  const [QrReader, setQrReader] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(true); // To prevent multiple scans

  useEffect(() => {
    import("@blackbox-vision/react-qr-reader")
      .then((module) => {
        setQrReader(() => module.QrReader);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ QR Scanner Import Error:", err);
        setError("Failed to load QR scanner.");
        setLoading(false);
      });
  }, []);

  const handleScan = (result, scanError) => {
    if (result && isScanning) {
      setIsScanning(false); // Prevent multiple scans
      setScannedData(result.text);

      try {
        const parsedData = JSON.parse(result.text);
        if (!parsedData.sessionToken) throw new Error("Invalid QR data!");

        fetch("/api/attendance/mark-attendance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionToken: parsedData.sessionToken, studentId }),
        })
          .then((res) => res.json())
          .then((data) => alert(data.message))
          .catch(() => setError("Attendance marking failed."))
          .finally(() => setTimeout(() => setIsScanning(true), 3000)); // Re-enable scanning after 3 sec
      } catch (err) {
        setError("Invalid QR Code format.");
        setTimeout(() => setIsScanning(true), 3000); // Re-enable scanning
      }
    }

    if (scanError) {
      setError("QR Scanning Error: " + scanError.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold text-gray-700">Scan QR Code</h1>
      
      {loading && <p className="text-gray-500">Loading QR scanner...</p>}
      
      {QrReader ? (
        <QrReader
          onResult={handleScan}
          constraints={{ facingMode: "environment" }} // Uses back camera on mobile
          containerStyle={{ width: "300px", border: "2px solid #ddd", borderRadius: "8px" }} // Adjusted scanner style
        />
      ) : (
        !loading && <p className="text-red-500">{error || "QR scanner not available."}</p>
      )}

      {scannedData && <p className="text-green-600 font-medium">✅ Scanned: {scannedData}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default QRScanner;
