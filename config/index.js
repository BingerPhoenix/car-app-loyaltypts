/**
 * Application configuration settings
 */
const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000,
  },

  // Authentication Configuration
  auth: {
    tokenKey: 'jerry_auth_token',
    refreshTokenKey: 'jerry_refresh_token',
    tokenExpiry: 60 * 60 * 1000, // 1 hour
    refreshExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days
  },

  // Form Configuration
  forms: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    maxFiles: 5,
    autosaveInterval: 30000, // 30 seconds
  },

  // Feature Flags
  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableChat: process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true',
    maintenanceMode: process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true',
    beta: {
      newDashboard: process.env.NEXT_PUBLIC_BETA_DASHBOARD === 'true',
      advancedSearch: process.env.NEXT_PUBLIC_BETA_ADVANCED_SEARCH === 'true',
    },
  },

  // Service Provider Configuration
  serviceProvider: {
    searchRadius: 50, // miles
    maxResults: 20,
    sortOptions: ['distance', 'rating', 'price'],
    filterOptions: {
      services: ['maintenance', 'repair', 'inspection', 'modification'],
      certifications: ['factory', 'specialist', 'master'],
      availability: ['today', 'thisWeek', 'nextWeek'],
    },
  },

  // Loyalty Program Configuration
  loyalty: {
    tiers: {
      bronze: {
        threshold: 0,
        benefits: ['Basic service scheduling', 'Standard insurance rates'],
      },
      silver: {
        threshold: 1000,
        benefits: ['Priority scheduling', '5% insurance discount', 'Quarterly detailing'],
      },
      gold: {
        threshold: 5000,
        benefits: ['VIP scheduling', '10% insurance discount', 'Monthly detailing'],
      },
      platinum: {
        threshold: 10000,
        benefits: ['Concierge service', '15% insurance discount', 'Unlimited detailing'],
      },
    },
    pointsExpiry: 365, // days
    earnRates: {
      service: 0.05, // 5% of service cost
      referral: 1000, // points per referral
      review: 100, // points per review
    },
  },

  // UI Configuration
  ui: {
    theme: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    animation: {
      duration: {
        fast: 150,
        normal: 250,
        slow: 350,
      },
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Error Messages
  errors: {
    network: 'Unable to connect to the server. Please check your internet connection.',
    auth: {
      invalid: 'Invalid credentials. Please try again.',
      expired: 'Your session has expired. Please log in again.',
      required: 'Authentication required. Please log in.',
    },
    form: {
      required: 'This field is required',
      invalid: 'Please enter a valid value',
      maxLength: 'Input exceeds maximum length',
      minLength: 'Input is too short',
    },
  },
};

export default config;