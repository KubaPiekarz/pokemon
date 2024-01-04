export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    return localStorage.getItem(key);
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    localStorage.setItem(key, value);
  }
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};
