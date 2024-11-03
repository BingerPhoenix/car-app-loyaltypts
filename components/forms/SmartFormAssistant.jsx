import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Lightbulb, 
  X, 
  ChevronRight, 
  ThumbsUp, 
  ThumbsDown 
} from 'lucide-react';

const SmartFormAssistant = ({
  formData,
  formErrors,
  onSuggestionApply,
  position = 'right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [feedback, setFeedback] = useState({});

  // Analyze form data and generate smart suggestions
  useEffect(() => {
    if (!formData || !formErrors) return;

    const newSuggestions = [];

    // Check for common patterns and issues
    Object.entries(formData).forEach(([field, value]) => {
      // Empty required fields
      if (!value && formErrors[field]?.type === 'required') {
        newSuggestions.push({
          id: `empty-${field}`,
          type: 'warning',
          message: `The ${field} field is required. Would you like to use a suggested value?`,
          action: {
            label: 'Use suggestion',
            handler: () => {
              const suggestions = getSmartSuggestions(field, formData);
              if (suggestions.length > 0) {
                onSuggestionApply(field, suggestions[0]);
              }
            }
          }
        });
      }

      // Invalid email format
      if (field.includes('email') && formErrors[field]?.type === 'pattern') {
        newSuggestions.push({
          id: `email-${field}`,
          type: 'error',
          message: 'The email format appears to be incorrect.',
          action: {
            label: 'Fix format',
            handler: () => {
              const correctedEmail = value.toLowerCase().replace(/\s+/g, '');
              onSuggestionApply(field, correctedEmail);
            }
          }
        });
      }

      // Phone number formatting
      if (field.includes('phone') && value) {
        const formattedPhone = formatPhoneNumber(value);
        if (formattedPhone !== value) {
          newSuggestions.push({
            id: `phone-${field}`,
            type: 'info',
            message: 'Would you like to format the phone number?',
            action: {
              label: 'Format number',
              handler: () => onSuggestionApply(field, formattedPhone)
            }
          });
        }
      }
    });

    setSuggestions(newSuggestions);
  }, [formData, formErrors]);

  const getSmartSuggestions = (field, data) => {
    // Implementation would include AI-powered suggestions based on field context
    return ['Suggested value'];
  };

  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
  };

  const handleFeedback = (suggestionId, isHelpful) => {
    setFeedback(prev => ({
      ...prev,
      [suggestionId]: isHelpful
    }));
  };

  return (
    <div className={`fixed ${position === 'right' ? 'right-4' : 'left-4'} bottom-4 z-50`}>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center 
          justify-center shadow-lg hover:bg-blue-600 transition-colors"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </motion.button>

      {/* Suggestions Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`absolute ${position === 'right' ? 'right-0' : 'left-0'} bottom-16 
              w-80 bg-white rounded-lg shadow-xl overflow-hidden`}
          >
            <div className="p-4 bg-blue-50 border-b">
              <h3 className="font-medium flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-blue-500" />
                Form Assistant
              </h3>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {suggestions.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No suggestions at the moment
                </div>
              ) : (
                <div className="p-2 space-y-2">
                  {suggestions.map((suggestion) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg ${
                        suggestion.type === 'warning' ? 'bg-yellow-50' :
                        suggestion.type === 'error' ? 'bg-red-50' :
                        'bg-blue-50'
                      }`}
                    >
                      <p className="text-sm mb-2">{suggestion.message}</p>

                      <div className="flex items-center justify-between">
                        <button
                          onClick={suggestion.action.handler}
                          className="text-xs bg-white px-2 py-1 rounded flex items-center 
                            gap-1 hover:bg-gray-50 transition-colors"
                        >
                          {suggestion.action.label}
                          <ChevronRight className="h-3 w-3" />
                        </button>

                        {!feedback[suggestion.id] && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleFeedback(suggestion.id, true)}
                              className="text-gray-400 hover:text-green-500"
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleFeedback(suggestion.id, false)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <ThumbsDown className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartFormAssistant;