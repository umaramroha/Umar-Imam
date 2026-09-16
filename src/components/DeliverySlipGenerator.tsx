import React, { useState } from 'react';
import html2canvas from 'html2canvas';

interface FormData {
  customerName: string;
  trackingNumber: string;
  courier: string;
  amount: string;
  paymentType: string;
  status: string;
}

const couriers = ['Sureship', 'EKART', 'India Post', 'Blue Dart'];
const paymentTypes = ['COD', 'Prepaid'];
const statuses = [
  'Shipped',
  'In Transit',
  'Out for Delivery',
  'Delivered',
  'Ready to Dispatch',
  'Network Delay',
  'Redirected'
];

const statusMessages: Record<string, string> = {
  'Shipped': 'Your medicine parcel has been shipped and is on its way to you.',
  'In Transit': 'Your medicine parcel is currently in transit.',
  'Out for Delivery': 'Your medicine parcel is out for delivery.',
  'Delivered': 'Your medicine parcel has been delivered successfully.',
  'Ready to Dispatch': 'Your medicine parcel is ready to be dispatched.',
  'Network Delay': 'Your medicine parcel is in transit, but delivery may be delayed due to a network issue.',
  'Redirected': 'Your medicine parcel has been redirected and is currently being processed for delivery.'
};

const courierUrls: Record<string, string> = {
  'Sureship': 'https://www.sureship.in/track?label=AWB&awbs=',
  'EKART': 'https://www.ekartlogistics.com/ekartlogistics-web/shipmenttrack/',
  'India Post': 'https://www.indiapost.gov.in/',
  'Blue Dart': 'https://www.bluedart.com/?'
};

export default function DeliverySlipGenerator() {
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    trackingNumber: '',
    courier: '',
    amount: '',
    paymentType: '',
    status: ''
  });

  const [generated, setGenerated] = useState(false);
  const [trackingUrl, setTrackingUrl] = useState('');
  const [copyLinkMsg, setCopyLinkMsg] = useState('');
  const [copyImageMsg, setCopyImageMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateTrackingUrl = (courier: string, trackingNumber: string): string => {
    const baseUrl = courierUrls[courier];
    return `${baseUrl}${trackingNumber}`;
  };

  const handleGenerateSlip = () => {
    const { customerName, trackingNumber, courier, status } = formData;

    if (!customerName.trim() || !trackingNumber.trim() || !courier || !status) {
      alert('Please fill all required fields');
      return;
    }

    const url = generateTrackingUrl(courier, trackingNumber);
    setTrackingUrl(url);
    setGenerated(true);
    setCopyLinkMsg('');
    setCopyImageMsg('');
  };

  const handleReset = () => {
    setFormData({
      customerName: '',
      trackingNumber: '',
      courier: '',
      amount: '',
      paymentType: '',
      status: ''
    });
    setGenerated(false);
    setTrackingUrl('');
    setCopyLinkMsg('');
    setCopyImageMsg('');
  };

  const getSlipElement = (): HTMLElement | null => {
    return document.getElementById('slip-preview');
  };

  const generateCanvas = async (): Promise<HTMLCanvasElement | null> => {
    const element = getSlipElement();
    if (!element) return null;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      return canvas;
    } catch (error) {
      console.error('Error generating canvas:', error);
      return null;
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(trackingUrl);
      setCopyLinkMsg('✓ Tracking link copied!');
      setTimeout(() => setCopyLinkMsg(''), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const handleCopyImage = async () => {
    const canvas = await generateCanvas();
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        
        if (navigator.clipboard && navigator.clipboard.write) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopyImageMsg('✓ Image copied!');
          setTimeout(() => setCopyImageMsg(''), 2000);
        } else {
          setCopyImageMsg('Image copying is not supported by this browser. Please use Download Image.');
          setTimeout(() => setCopyImageMsg(''), 3000);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error copying image:', error);
      setCopyImageMsg('Image copying is not supported by this browser. Please use Download Image.');
      setTimeout(() => setCopyImageMsg(''), 3000);
    }
  };

  const handleDownloadImage = async () => {
    const canvas = await generateCanvas();
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `Hashmi-Dawakhana-Delivery-Slip-${formData.trackingNumber}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleShareImage = async () => {
    const canvas = await generateCanvas();
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], 'delivery-slip.png', { type: 'image/png' });

        if (navigator.share && navigator.canShare) {
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: 'Hashmi Dawakhana Delivery Slip',
              text: 'Your delivery slip from Hashmi Dawakhana'
            });
            return;
          }
        }

        alert('Image sharing is not supported on this device. Please use Download Image or Copy Image.');
      }, 'image/png');
    } catch (error) {
      console.error('Error sharing image:', error);
      alert('Image sharing is not supported on this device. Please use Download Image or Copy Image.');
    }
  };

  const { customerName, trackingNumber, courier, amount, paymentType, status } = formData;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-700">HASHMI DAWAKHANA</h1>
          <p className="text-gray-600 mt-1">Delivery Update from Dr. Hashmi</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="Pintu Verma"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tracking Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="trackingNumber"
                  value={formData.trackingNumber}
                  onChange={handleInputChange}
                  placeholder="ITTC0000000122"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Courier <span className="text-red-500">*</span>
                </label>
                <select
                  name="courier"
                  value={formData.courier}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select Courier</option>
                  {couriers.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (Optional)
                </label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="1400"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Type
                </label>
                <select
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select Payment Type</option>
                  {paymentTypes.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select Status</option>
                  {statuses.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleGenerateSlip}
                  className="flex-1 bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Generate Slip
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Slip Preview */}
          <div className="space-y-6">
            {generated && (
              <>
                {/* Slip Image Preview */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Slip Preview</h2>
                  
                  <div 
                    id="slip-preview"
                    className="bg-white rounded-xl p-8 border-2 border-gray-100"
                    style={{ 
                      width: '100%',
                      maxWidth: '500px',
                      margin: '0 auto'
                    }}
                  >
                    {/* Branding */}
                    <div className="text-center mb-6 pb-6 border-b-2 border-red-700">
                      <h1 className="text-3xl font-bold text-red-700 mb-1">HASHMI DAWAKHANA</h1>
                      <p className="text-gray-600 text-sm">Delivery Update from Dr. Hashmi</p>
                    </div>

                    {/* Customer Message */}
                    <div className="mb-6">
                      <p className="text-lg text-gray-800 mb-3">
                        <strong>Dear {customerName},</strong>
                      </p>
                      <p className="text-gray-700">{statusMessages[status]}</p>
                    </div>

                    {/* Details */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Courier:</span>
                        <span className="font-semibold text-gray-800">{courier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tracking No:</span>
                        <span className="font-semibold text-gray-800 break-all">{trackingNumber}</span>
                      </div>
                      {amount && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-semibold text-gray-800">
                            ₹{amount} ({paymentType})
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Contact */}
                    <div className="text-center mb-6 pb-6 border-t-2 border-gray-100">
                      <p className="text-gray-600 mb-2">For more information, contact:</p>
                      <p className="text-xl font-bold text-gray-800">+91 980 891 6228</p>
                    </div>

                    {/* Footer */}
                    <div className="text-center">
                      <p className="text-gray-700">
                        Thank you for trusting Dr. Hashmi – Hashmi Dawakhana. 🙏
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image Actions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">🖼️ Image Actions</h2>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleCopyImage}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      📋 Copy Image
                    </button>
                    <button
                      onClick={handleDownloadImage}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      ⬇️ Download Image
                    </button>
                    <button
                      onClick={handleShareImage}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      📤 Share Image
                    </button>
                  </div>
                  {copyImageMsg && (
                    <p className="mt-3 text-green-600 font-medium">{copyImageMsg}</p>
                  )}
                </div>

                {/* Tracking Link Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">📦 Tracking Link</h2>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={trackingUrl}
                      readOnly
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
                    >
                      📋 Copy Link
                    </button>
                  </div>
                  {copyLinkMsg && (
                    <p className="mt-3 text-green-600 font-medium">{copyLinkMsg}</p>
                  )}
                </div>
              </>
            )}

            {!generated && (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-500">
                <p className="text-lg">Slip preview will appear here</p>
                <p className="text-sm mt-2">Fill in the form and click "Generate Slip"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
