import React from "react";
import { XCircle, AlertTriangle } from "lucide-react";

const ModalEliminarCuenta = ({ isOpen, onClose, onConfirm, cuenta }) => {
  if (!isOpen || !cuenta) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl p-6 w-[32rem] shadow-2xl transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Eliminar Cuenta
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-gray-600">
            ¿Estás seguro de que deseas eliminar la cuenta de <strong className="text-gray-900 font-medium">{cuenta.servicio}</strong>?
          </p>
          <p className="text-sm text-gray-500">
            Esta acción no se puede deshacer. Se eliminarán todos los datos asociados a esta cuenta.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 
                     transition-colors duration-200 font-medium cursor-pointer"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                     transition-colors duration-200 font-medium flex items-center gap-2
                     shadow-sm shadow-red-200 cursor-pointer"
          >
            <XCircle className="w-4 h-4" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEliminarCuenta;