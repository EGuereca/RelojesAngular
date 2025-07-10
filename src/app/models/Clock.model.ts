export interface Clock {
  id: string;
  handColor: string;
  markerColor: string;
  borderColor: string;
  analogNumbersColor: string;
  digitalNumbersColor: string;
  startTime: Date;
  backgroundImage: string;          // Hora personalizada (formato HH:mm:ss)
}