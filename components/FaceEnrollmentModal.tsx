import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FaceEnrollmentModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [image, setImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when closed
      setStep(1);
      setImage(null);
      setProgress(0);
    }
  }, [isOpen]);

  const handleCapture = () => {
    // Simulate capturing an image
    setImage('https://picsum.photos/id/1005/300/300');
    setStep(2);
  };

  const handleUpload = () => {
    setStep(3);
    // Simulate processing and syncing
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStep(4);
      }
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Icons.ScanFace className="text-indigo-600" /> Remote Face Enrollment
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="text-center space-y-6">
              <div className="w-32 h-32 bg-slate-100 rounded-full mx-auto flex items-center justify-center border-4 border-slate-200 border-dashed">
                 <Icons.Camera className="w-12 h-12 text-slate-400" />
              </div>
              <p className="text-slate-600">
                Ensure your face is clearly visible. Remove glasses or masks.
                The system will generate a biometric template for ZKTeco devices.
              </p>
              <button 
                onClick={handleCapture}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Capture Photo
              </button>
            </div>
          )}

          {step === 2 && image && (
            <div className="text-center space-y-6">
               <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-indigo-100">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
               </div>
               <div className="flex gap-3">
                 <button 
                   onClick={() => setStep(1)}
                   className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition"
                 >
                   Retake
                 </button>
                 <button 
                   onClick={handleUpload}
                   className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                 >
                   Generate Template
                 </button>
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-8 py-8">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                      Processing
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-indigo-600">
                      {progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                  <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-300"></div>
                </div>
              </div>
              <p className="text-slate-500 text-sm animate-pulse">
                Extracting 3D facial map... <br/> Syncing to 5 active branches...
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6 py-4">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center text-green-600">
                <Icons.CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">Enrollment Complete</h4>
                <p className="text-slate-600 mt-2">
                  The user can now access allowed ZKTeco zones via facial recognition.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
