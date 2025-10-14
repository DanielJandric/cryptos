// Constantes globales de l'application
import { makeUtcDate } from "./utils";

export const APP_NAME = "Cycles Bitcoin 1064/364";

// Date de bascule pour marquer les points projetés
export const PROJECTION_CUTOFF = makeUtcDate(2025, 10, 14);

// Cible du compte à rebours
export const COUNTDOWN_TARGET = makeUtcDate(2026, 10, 5);

// Couleurs des séries (accessibles et contrastées)
export const SERIES_COLORS = {
  c1: "#60a5fa", // blue-400
  c2: "#a78bfa", // violet-400
  c3: "#f472b6", // pink-400
};


