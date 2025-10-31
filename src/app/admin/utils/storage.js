// Save data
export const setLocalData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Error saving to localStorage", err);
  }
};

// Get data
export const getLocalData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Error reading from localStorage", err);
    return null;
  }
};

// Remove data
export const removeLocalData = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Error removing from localStorage", err);
  }
};
