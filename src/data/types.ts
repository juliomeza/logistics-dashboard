import { LucideIcon } from 'lucide-react';

export interface Subsidiary {
  id: string;
  name: string;
  icon: LucideIcon; // Using Lucide icons directly
}

export interface KpiData {
  title: string;
  value: string | number;
  change?: number; // Optional percentage change
  unit?: string; // e.g., '%', '$', ''
  description?: string;
}

export interface TimeSeriesData {
  period: string; // e.g., 'Jan', 'Q1', '2023-01-01'
  [key: string]: string | number; // For multiple lines/bars (e.g., revenue: 1000, margin: 15)
}

export interface GaugeData {
    name: string;
    value: number;
    color: string; // Color for the gauge segment
}

export interface RadarData {
    subject: string; // The metric being measured (e.g., OTD, Accuracy)
    value: number;   // Value for the currently selected subsidiary
    fullMark: number; // Max value for comparison (e.g., 100 for percentages)
}


export interface SubsidiaryPerformanceData {
  subsidiaryId: string;
  subsidiaryName: string;
  revenueGrowth: number;
  profitMargin: number;
  marketShare: number;
  customerSatisfaction: number;
  grossProfit: number;
  ebitda: number;
  operatingRatio: number;
  cashConversionCycle: number;
  onTimeDelivery: number;
  orderAccuracy: number;
  warehouseUtilization: number;
  perfectOrderRate: number;
  roic: number;
  inventoryTurnover: number;
  arTurnover: number;
  apTurnover: number;
  satisfactionScore: number;
  nps: number;
  retentionRate: number;
  newAcquisition: number;
  inventoryAccuracy: number;
  transportCost: number;
  returnProcessingRate: number;
  costPerUnit: number;
}

export interface ClientData {
    id: string;
    name: string;
    revenue: number;
    satisfactionScore: number;
    nps: number;
    lastFeedback?: string;
    subsidiaryId: string;
}

export interface AlertData {
    id: string;
    severity: 'info' | 'warning' | 'error';
    message: string;
    timestamp: Date;
}

export interface CarrierData {
    id: string;
    name: string;
    onTimePerformance: number;
    costPerShipment: number;
    damageRate: number;
}

// Define specific data structures for each view if needed
// e.g., CEOViewData, CFOViewData, etc.