import React, { useState, useEffect } from "react";
import { UserCog, X, Phone } from "lucide-react";
import FacebookIcon from "../assets/facebook.svg"; // Importar SVG de Facebook
import WhatsappIcon from "../assets/whatsapp.svg"; // Importar SVG de WhatsApp

const ModalEditarCliente = ({ isOpen, onClose, onSubmit, cliente }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    hasFacebook: false,
    hasWhatsapp: false,
    facebook: "",
    whatsapp: ""
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        nombre: cliente.nombre || "",
        email: cliente.email || "",
        telefono: cliente.telefono || "",
        hasFacebook: !!cliente.socialMedia?.facebook,
        hasWhatsapp: !!cliente.socialMedia?.whatsapp,
        facebook: cliente.socialMedia?.facebook || "",
        whatsapp: cliente.socialMedia?.whatsapp?.replace("https://wa.me/", "") || ""
      });
    }
  }, [cliente]);

  if (!isOpen || !cliente) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const socialMedia = {};
    if (formData.hasFacebook) socialMedia.facebook = formData.facebook;
    if (formData.hasWhatsapp) socialMedia.whatsapp = `https://wa.me/${formData.whatsapp}`;

    const updatedClientData = {
      ...cliente,
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      socialMedia
    };

    onSubmit(updatedClientData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

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
            <div className="p-2 bg-amber-500 rounded-lg">
              <UserCog className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Editar Cliente
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
          {/* Basic Info Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Social Media Section */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="font-medium text-gray-900">Redes Sociales</h3>
            
            {/* Facebook */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="hasFacebook"
                  checked={formData.hasFacebook}
                  onChange={handleChange}
                  className="w-4 h-4 text-red-500 focus:ring-red-500 rounded cursor-pointer"
                />
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <img 
                    src={FacebookIcon} 
                    alt="Facebook" 
                    className="w-4 h-4" 
                  />
                  Facebook
                </label>
              </div>
              {formData.hasFacebook && (
                <input
                  type="url"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/perfil"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" required
                />
              )}
            </div>

            {/* WhatsApp */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="hasWhatsapp"
                  checked={formData.hasWhatsapp}
                  onChange={handleChange}
                  className="w-4 h-4 text-red-500 focus:ring-red-500 rounded cursor-pointer"
                />
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <img 
                    src={WhatsappIcon} 
                    alt="WhatsApp" 
                    className="w-4 h-4" 
                  />
                  WhatsApp
                </label>
              </div>
              {formData.hasWhatsapp && (
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="912345678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" required
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button"
              onClick={onClose} 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 
                       transition-colors duration-200 font-medium cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-red-500 text-white 
                       rounded-lg hover:bg-red-700 transition-colors 
                       duration-200 font-medium shadow-sm cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarCliente;