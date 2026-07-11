import { create } from 'zustand';

interface CalibrationData {
  // Page 1: Identity Studio
  name: string;
  birthdate: string;
  avatarFile: File | null;
  selectedVibes: string[];
  // Page 2: Archetype Vault
  archetype: string;
  // Page 3: Discovery Calibration
  email: string;
  phone: string;
  maxDistance: string;
}

interface CalibrationStore {
  dossier: CalibrationData;
  updateDossier: (newData: Partial<CalibrationData>) => void;
}

export const useCalibrationStore = create<CalibrationStore>((set) => ({
  dossier: {
    name: "", birthdate: "", avatarFile: null, selectedVibes: [],
    archetype: "", email: "", phone: "", maxDistance: "25",
  },
  updateDossier: (newData) => 
    set((state) => ({ dossier: { ...state.dossier, ...newData } })),
}));