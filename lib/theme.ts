export const THEME_STORAGE_KEY = 'theme'

/** Runs before paint (inlined in <head>) to apply the saved theme and avoid a flash. Defaults to dark. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');document.documentElement.classList.toggle('dark',t!=='light');}catch(e){document.documentElement.classList.add('dark');}})();`
