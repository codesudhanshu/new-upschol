// utils/slugify.js
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // spaces to dashes
    .replace(/[^\w\-]+/g, '')    // remove non-word chars
    .replace(/\-\-+/g, '-')      // multiple dashes to one
    .replace(/^-+/, '')          // remove starting dash
    .replace(/-+$/, '');         // remove ending dash
};