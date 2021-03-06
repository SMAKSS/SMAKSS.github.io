export const state = () => ({
  locales: ['en', 'fa'],
  locale: 'en',
  modalTrigger: false,
  colors: {
    light: {
      "background-color": "#ffffff",
      "background-color-secondary": "#f3f5f4",
      "text-color": "rgba(0, 0, 0, 0.67)",
      "heading-color": "rgba(0, 0, 0, 0.87)",
      "link": "#5f6368",
      "link-hover": "#202124",
      "button": "#1a73e8",
      "button-hover": "#4185f4",
      "button-text": "#ffffff",
      "button-icon": "#f7f7f7",
      "button-icon-hover": "#f2f2f2",
      "footer-color": "#f8f9fb",
      "border-color": "#ddd",
      "mask": "rgba(0, 0, 0, 0.1)",
      "light-glow": "#f0c420",
      "settings-default": "#5f6368",
      "settings-pillar-activated": "#5f6368",
      "logo-color": "rgba(70, 70, 70, 0.75)",
      "logo-linkedin": "#0077b7",
      "logo-npm": "#231f20",
      "logo-stackoverflow-task": "#ff9800",
      "logo-stackoverflow-stack": "#757575"
    },
    dark: {
      "background-color": "#091a28",
      "background-color-secondary": "#071521",
      "text-color": "rgba(255, 255, 255, 0.5)",
      "heading-color": "rgba(255, 255, 255, 1)",
      "link": "#fdf9f3",
      "link-hover": "#41b38a",
      "button": "#158876",
      "button-hover": "#41b38a",
      "button-text": "#ffffff",
      "button-icon": "#f7f7f7",
      "button-icon-hover": "#f2f2f2",
      "footer-color": "#071521",
      "border-color": "#ddd",
      "mask": "rgba(255, 255, 255, 0.1)",
      "light-glow": "#f0c420",
      "settings-default": "#5f6368",
      "settings-pillar-activated": "#f3f5f4",
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
  },
  SET_MODALTRIGGER(state, modalTrigger) {
    state.modalTrigger = modalTrigger
  }
}
