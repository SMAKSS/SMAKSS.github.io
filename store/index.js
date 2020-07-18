export const state = () => ({
  locales: ['en', 'fa'],
  locale: 'en',
  colors: {
    light: {
      "bg": "#ffffff",
      "bg-secondary": "#f3f5f4",
      "text-color": "rgba(0, 0, 0, 0.67)",
      "heading-color": "rgba(0, 0, 0, 0.87)",
      "link-color": "#5f6368",
      "link-hover": "#202124",
      "button-color": "#1a73e8",
      "button-hover": "#4185f4",
      "button-text": "#ffffff",
      "button-icon": "#f7f7f7",
      "button-icon-hover": "#f2f2f2",
      "footer-color": "#f8f9fb",
      "border-color": "#ddd",
      "mask-color": "rgba(0, 0, 0, 0.1)",
      "light-glow": "#f0c420",
      "settings-default": "#5f6368",
      "logo-color": "rgba(70, 70, 70, 0.75)",
      "logo-linkedin": "#0077b7",
      "logo-npm": "#231f20",
      "logo-stackoverflow-task": "#ff9800",
      "logo-stackoverflow-stack": "#757575"
    },
    dark: {
      "bg": "#091a28",
      "bg-secondary": "#071521",
      "text-color": "rgba(255, 255, 255, 0.5)",
      "heading-color": "rgba(255, 255, 255, 1)",
      "link-color": "#fdf9f3",
      "link-hover": "#41b38a",
      "button-color": "#158876",
      "button-hover": "#41b38a",
      "button-text": "#ffffff",
      "button-icon": "#f7f7f7",
      "button-icon-hover": "#f2f2f2",
      "footer-color": "#071521",
      "border-color": "#ddd",
      "mask-color": "rgba(255, 255, 255, 0.1)",
      "light-glow": "#f0c420",
      "settings-default": "#5f6368",
      "logo-color": "rgba(255, 255, 255, 1)",
      "logo-linkedin": "#0077b7",
      "logo-npm": "#231f20",
      "logo-stackoverflow-task": "#ff9800",
      "logo-stackoverflow-stack": "#757575"
    }
  }
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}
