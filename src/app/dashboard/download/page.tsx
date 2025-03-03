"use client"
import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import QRCode from 'qrcode';
import logo from '../../../images/IEFK25- Logo png (1).avif'


interface UserDetails {
  name: string;
  email: string;
  phone: string;
}

function DownloadPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const handleDownloadPDF = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/get-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);

        const qrData = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}`;
        const qrCodeUrl = await QRCode.toDataURL(qrData);
        setQrCode(qrCodeUrl);

        // Allow DOM to update before capturing the content
        setTimeout(() => {
          const element = document.getElementById('pdf-content');
          const options = {
            margin: 0.5,
            filename: `${data.name}-details.pdf`,
            html2canvas: { scale: 1.5 },
            jsPDF: { unit: 'cm', format: 'a5', orientation: 'portrait' },
          };
          html2pdf().set(options).from(element).save();
        }, 0);

        setError('');
      } else {
        const data = await response.json();
        setError(data.error || 'User not found');
        setUserDetails(null);
        setQrCode(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('An error occurred while fetching user data');
      setUserDetails(null);
      setQrCode(null);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-center mb-4">Download User Details</h1>
        <form onSubmit={handleDownloadPDF}>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
              Enter Mobile Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Download PDF
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* User Details Section */}
        {userDetails && (
          <div
            id="pdf-content"
            className="mt-6 p-6 border rounded-lg "
            style={{background: 'linear-gradient(90deg, rgba(198,225,196,1) 16%, rgba(81,227,23,1) 98%, rgba(0,212,255,1) 100%)'}}
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 "  style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              <img src={logo.src} alt="logo" style={{height:'100px',width:'100px'}} />
            </h2>
            <div className="text-gray-700" style={{color:'white',backgroundColor:'blue',borderRadius:'5px',display:'flex',flexDirection:'column',justifyContent:'center',padding:'5px'}}>
              <p className="mb-2"><strong style={{color:'yellow'}}>Name:</strong> {userDetails.name}</p>
              <p className="mb-2"><strong style={{color:'yellow'}}>Email:</strong> {userDetails.email}</p>
              <p className="mb-2"><strong style={{color:'yellow'}}>Phone:</strong> {userDetails.phone}</p>
            </div>
            {qrCode && (
            <div className="qr-code-container" style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
              <img src={qrCode} alt="QR Code" />
             
            </div>
          )}

          </div>
        )}
      </div>
      
    </div>
  );
}

export default DownloadPage;
