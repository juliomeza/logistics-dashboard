import React from 'react';

interface ViewContainerProps {
  children: React.ReactNode;
}

/**
 * ViewContainer proporciona una estructura estandarizada para todas las vistas del dashboard.
 * Asegura que cada vista tenga el mismo ancho y dimensiones básicas para una experiencia uniforme.
 */
const ViewContainer: React.FC<ViewContainerProps> = ({ children }) => {
  return (
    <div className="w-full max-w-full space-y-6">
      {children}
    </div>
  );
};

export default ViewContainer;