const LOCAL_STORAGE_PREFIX = `QUALITY_PRE_WEBSITE_COLLECTOR-`;
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-`;

export function saveWebsites(websites) {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(websites));
}

export function loadWebsites() {
  const websiteString = localStorage.getItem(TODOS_STORAGE_KEY);

  return JSON.parse(websiteString) || [];
}

export function openModal(...elements) {
  elements.map(element => element.classList.remove('hidden'));
}
export function closeModal(...elements) {
  elements.map(element => element.classList.add('hidden'));
}
export function clearForm(...elements) {
  elements.map(element => (element.value = ''));
}
