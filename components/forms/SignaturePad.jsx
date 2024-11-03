import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Download, Undo } from 'lucide-react';

const SignaturePad = ({
  width = 600,
  height = 200,
  onSign,
  lineWidth = 2,
  lineColor = '#000000',
  backgroundColor = '#ffffff'
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Add initial state to history
    const initialState = ctx.getImageData(0, 0, width, height);
    setHistory([initialState]);
    setCurrentStep(0);
  }, [width, height, backgroundColor]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = lineColor;

    setIsDrawing(true);
    setIsEmpty(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.closePath();

      // Save state to history
      const newState = ctx.getImageData(0, 0, width, height);
      const newHistory = history.slice(0, currentStep + 1);

      setHistory([...newHistory, newState]);
      setCurrentStep(prev => prev + 1);

      if (onSign) {
        onSign(canvasRef.current.toDataURL());
      }
    }
    setIsDrawing(false);
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches && e.touches[0]) {
      return {
        offsetX: (e.touches[0].clientX - rect.left) * scaleX,
        offsetY: (e.touches[0].clientY - rect.top) * scaleY
      };
    }

    return {
      offsetX: (e.clientX - rect.left) * scaleX,
      offsetY: (e.clientY - rect.top) * scaleY
    };
  };

  const clear = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Reset history
    const initialState = ctx.getImageData(0, 0, width, height);
    setHistory([initialState]);
    setCurrentStep(0);
    setIsEmpty(true);

    if (onSign) {
      onSign(null);
    }
  };

  const undo = () => {
    if (currentStep > 0) {
      const ctx = canvasRef.current.getContext('2d');
      const previousState = history[currentStep - 1];
      ctx.putImageData(previousState, 0, 0);
      setCurrentStep(prev => prev - 1);

      if (currentStep === 1) {
        setIsEmpty(true);
      }

      if (onSign) {
        onSign(canvasRef.current.toDataURL());
      }
    }
  };

  const download = () => {
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="border rounded-lg touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-gray-400 text-sm">Sign here</p>
          </div>
        )}
      </motion.div>

      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={clear}
            className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 
              rounded-lg flex items-center gap-1"
            disabled={isEmpty}
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={undo}
            className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 
              rounded-lg flex items-center gap-1"
            disabled={currentStep <= 0}
          >
            <Undo className="h-4 w-4" />
            Undo
          </motion.button>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={download}
          className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 
            rounded-lg flex
        rounded-lg flex items-center gap-1"
                  disabled={isEmpty}
                >
                  <Download className="h-4 w-4" />
                  Download
                </motion.button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                Draw your signature using your mouse or touch screen
              </div>
            </div>
          );
        };

        export default SignaturePad;