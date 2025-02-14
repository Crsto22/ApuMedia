import React, { useState } from 'react';
import { X, Monitor } from 'lucide-react';

const ModalAgregarCuenta = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    servicio: '',
    usuarios_maximos: 1,
    precio_total: '',
    precio_por_perfil: '',
    detalles: {
      plan: '',
      calidad: ''
    },
    credenciales: {
      email: '',
      password: ''
    },
    fecha_expiracion: ''
  });

  const serviciosStreaming = [
    { nombre: "Netflix", planes: ["Básico", "Estándar", "Premium"], calidades: ["HD", "Full HD", "4K UHD"] },
    { nombre: "Disney+", planes: ["Básico", "Premium"], calidades: ["HD", "4K UHD"] },
    { nombre: "HBO Max", planes: ["Básico", "Estándar", "Premium"], calidades: ["HD", "Full HD", "4K UHD"] },
    { nombre: "Amazon Prime", planes: ["Prime"], calidades: ["4K UHD"] },
    { nombre: "Apple TV+", planes: ["Estándar"], calidades: ["4K UHD"] },
    { nombre: "Paramount+", planes: ["Esencial", "Premium"], calidades: ["HD", "4K UHD"] },
    { nombre: "Star+", planes: ["Básico", "Premium"], calidades: ["HD", "4K UHD"] },
    { nombre: "DirectTV Go", planes: ["Básico", "Full"], calidades: ["HD", "4K UHD"] },
    { nombre: "Spotify", planes: ["Individual", "Duo", "Familiar"], calidades: ["Alta", "Muy Alta"] },
    { nombre: "YouTube Premium", planes: ["Individual", "Familiar"], calidades: ["HD", "4K"] }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const servicioSeleccionado = serviciosStreaming.find(s => s.nombre === formData.servicio);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-xl p-6 w-[32rem] shadow-2xl transform transition-all animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-red-500 rounded-lg">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Agregar Nueva Cuenta
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Servicio y Plan */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
              <select 
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                required
              >
                <option value="">Seleccionar servicio</option>
                {serviciosStreaming.map(servicio => (
                  <option key={servicio.nombre} value={servicio.nombre}>
                    {servicio.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
              <select 
                name="detalles.plan"
                value={formData.detalles.plan}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                required
              >
                <option value="">Seleccionar plan</option>
                {servicioSeleccionado?.planes.map(plan => (
                  <option key={plan} value={plan}>{plan}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Calidad y Usuarios */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Calidad</label>
              <select 
                name="detalles.calidad"
                value={formData.detalles.calidad}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                required
              >
                <option value="">Seleccionar calidad</option>
                {servicioSeleccionado?.calidades.map(calidad => (
                  <option key={calidad} value={calidad}>{calidad}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usuarios Máximos</label>
              <input 
                type="number"
                name="usuarios_maximos"
                value={formData.usuarios_maximos}
                onChange={handleChange}
                min="1"
                max="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Precios */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio Total</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input 
                  type="number"
                  name="precio_total"
                  value={formData.precio_total}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio por Perfil</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input 
                  type="number"
                  name="precio_por_perfil"
                  value={formData.precio_por_perfil}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Credenciales */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="font-medium text-gray-900">Credenciales de Acceso</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email"
                  name="credenciales.email"
                  value={formData.credenciales.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input 
                  type="password"
                  name="credenciales.password"
                  value={formData.credenciales.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Fecha de Expiración */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Expiración</label>
            <input 
              type="date"
              name="fecha_expiracion"
              value={formData.fecha_expiracion}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-lg hover:from-amber-600 hover:to-red-600 cursor-pointer transition-colors duration-200 font-medium shadow-sm"
            >
              Agregar Cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAgregarCuenta;