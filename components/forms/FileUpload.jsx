import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  X, 
  File, 
  Image as ImageIcon, 
  Film,
  Music,
  FileText,
  AlertCircle,
  Check
} from 'lucide-react';

const FileUpload = ({
  onUpload,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    'application/pdf': ['.pdf'],
    'video/*': ['.mp4', '.mov'],
    'audio/*': ['.mp3', '.wav']
  },
  preview = true
}) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState([]);

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return ImageIcon;
    if (type.startsWith('video/')) return Film;
    if (type.startsWith('audio/')) return Music;
    if (type === 'application/pdf') return FileText;
    return File;
  };

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      setErrors(rejectedFiles.map(({ file, errors }) => ({
        name: file.name,
        errors: errors.map(e => e.message)
      })));
    }

    // Process accepted files
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substring(7),
      preview: preview && file.type.startsWith('image/') 
        ? URL.createObjectURL(file)
        : null
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Upload each file with progress tracking
    newFiles.forEach(async ({ file, id }) => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded * 100) / event.total);
            setUploadProgress(prev => ({ ...prev, [id]: progress }));
          }
        });

        xhr.upload.addEventListener('load', () => {
          setUploadProgress(prev => ({ ...prev, [id]: 100 }));
        });

        // Simulate upload for demo
        await new Promise(resolve => setTimeout(resolve, 1500));
        onUpload?.(file);
      } catch (error) {
        setErrors(prev => [...prev, {
          name: file.name,
          errors: ['Upload failed']
        }]);
      }
    });
  }, [onUpload, preview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept
  });

  const removeFile = (idToRemove) => {
    setFiles(prev => prev.filter(({ id }) => id !== idToRemove));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[idToRemove];
      return newProgress;
    });
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center
          transition-colors cursor-pointer
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive 
            ? 'Drop the files here...'
            : 'Drag & drop files here, or click to select'
          }
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Max {maxFiles} files, up to {Math.round(maxSize / 1024 / 1024)}MB each
        </p>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.map(({ file, id, preview: filePreview }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="flex items-start gap-4">
              {filePreview ? (
                <img
                  src={filePreview}
                  alt={file.name}
                  className="w-16 h-16 rounded object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                  {React.createElement(getFileIcon(file.type), {
                    className: "h-8 w-8 text-gray-400"
                  })}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>

                {/* Progress bar */}
                <div className="mt-2 relative pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      {uploadProgress[id] === 100 ? (
                        <span className="text-xs text-green-500 flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          Complete
                        </span>
                      ) : (
                        <span className="text-xs text-blue-500">
                          Uploading... {uploadProgress[id] || 0}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex h-1.5 overflow-hidden rounded bg-gray-100">
                    <motion.div
                      className="bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress[id] || 0}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeFile(id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Errors */}
      <AnimatePresence>
        {errors.map((error, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-3"
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-medium">{error.name}</p>
              <ul className="mt-1 text-sm list-disc list-inside">
                {error.errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setErrors(prev => prev.filter((_, i) => i !== index))}
              className="ml-auto"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;