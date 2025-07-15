interface AppConfig {
  layout:
    | {
        style: 'vertical'
        variant: 'classic' | 'classy' | 'compact' | 'dense' | 'futuristic' | 'thin' // for vertical
      }
    | {
        style: 'horizontal'
        variant: 'centered' | 'enterprise' | 'material' | 'modern' // for horizontal
      }
  navigation: {
    appearance: 'default' | 'compact' | 'dense' | 'thin'
    mode: 'side' | 'over'
    collapsed: boolean
    autoCollapse: boolean
  }
  theme: {
    radius: {
      brand: string
      sm: string
      lg: string
    }
    font: {
      sans: string
    }
    colors: {
      primary: string
      background: string
      card: string
      sidebar: string
      sidebarForeground: string
      sidebarMutedForeground: string
      sidebarPrimary: string
      sidebarPrimaryForeground: string
      sidebarSectionHeader?: string
    }
  }
}

const config: AppConfig = {
  layout: {
    style: 'horizontal',
    variant: 'modern',
  },
  navigation: {
    appearance: 'default',
    mode: 'side',
    collapsed: false,
    autoCollapse: true,
  },
  theme: {
    radius: {
      brand: '0.75rem',
      sm: '0.25rem',
      lg: '1rem',
    },
    font: {
      sans: "'Poppins', sans-serif",
    },
    colors: {
      primary: 'oklch(0.5106 0.2301 276.97)',
      background: 'oklch(0.96 0.01 260)',
      card: 'oklch(1 0 0)',
      sidebar: 'oklch(0.20 0.04 265)',
      sidebarForeground: 'oklch(0.85 0.02 265)',
      sidebarMutedForeground: 'oklch(0.65 0.03 265)',
      sidebarPrimary: 'oklch(0.27 0.05 265)',
      sidebarPrimaryForeground: 'oklch(1 0 0)',
    },
  },
}

export default config
