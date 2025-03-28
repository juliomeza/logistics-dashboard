import React from 'react';

/**
 * Contenedor estándar para tarjetas KPI (4 tarjetas en una fila)
 */
export const KpiCardGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {children}
    </div>
  );
};

/**
 * Grid de 2 columnas para gráficos y tarjetas
 */
export const TwoColumnGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {children}
    </div>
  );
};

/**
 * Grid de 3 columnas para gráficos y tarjetas
 */
export const ThreeColumnGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {children}
    </div>
  );
};

/**
 * Contenedor para una tarjeta que ocupa todo el ancho
 */
export const FullWidthSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full">
      {children}
    </div>
  );
};