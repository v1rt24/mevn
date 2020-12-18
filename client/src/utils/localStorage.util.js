export const setLocalStorage = (name, data) => {
  if (name && data) {
    localStorage.setItem(name, JSON.stringify(data));
  }
};

export const getLocalStorage = name => {
  if (name) {
    return JSON.parse(localStorage.getItem(name) || '{}');
  }
};

export const clearLocalStorage = name => {
  if (name) {
    localStorage.removeItem(name);
  }
};