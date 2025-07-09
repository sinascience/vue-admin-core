// Define the shape of our configuration for type safety
interface AppConfig {
  layout: {
    // Use literal types to ensure only valid style names can be used
    style: 'vertical' | 'horizontal'
  }
}

// Export the configuration object
const config: AppConfig = {
  layout: {
    style: 'vertical', // Set the default layout
  },
}

export default config
