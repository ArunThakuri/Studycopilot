// Store and retrieve unit images from localStorage

const STORAGE_KEY = (unitId: string) => `studycopilot_images_${unitId}`;

export function saveUnitImages(unitId: string, images: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY(unitId), JSON.stringify(images));
  } catch (e) {
    console.error('Failed to save unit images:', e);
  }
}

export function loadUnitImages(unitId: string): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY(unitId));
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load unit images:', e);
    return [];
  }
}

export function deleteUnitImages(unitId: string): void {
  localStorage.removeItem(STORAGE_KEY(unitId));
}

export function hasUnitImages(unitId: string): boolean {
  return loadUnitImages(unitId).length > 0;
}
