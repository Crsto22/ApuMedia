import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Nabvar";
import { useClientes } from "../context/ClientesContext";
import {
  User, Mail, Phone, Calendar,
  Search, Plus, Trash2, Edit2, FolderOpen
} from "lucide-react";
import ModalEliminarCliente from "../components/ModalEliminarCliente";
import ModalAgregarCliente from "../components/ModalAgregarCliente";
import ModalEditarCliente from "../components/ModalEditarCliente";
import Loading from "../components/Loading";
import FacebookIcon from "../assets/facebook.svg";
import WhatsappIcon from "../assets/whatsapp.svg";
import Alertas from "../components/Alertas";
import SkeletonGrid from "../components/SkeletonGrid";

const Clientes = () => {
  const { clientes, loading, eliminarCliente, agregarCliente, actualizarCliente } = useClientes();
  const [searchTerm, setSearchTerm] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [modalEliminarOpen, setModalEliminarOpen] = useState(false);
  const [modalAgregarOpen, setModalAgregarOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);

  // Estados para las alertas
  const [alert, setAlert] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const filteredClients = clientes.filter(client =>
    client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.telefono.includes(searchTerm)
  );

  const handleOpenEliminarModal = (cliente) => {
    setClienteSeleccionado(cliente);
    setModalEliminarOpen(true);
  };

  const handleDeleteCliente = async () => {
    if (clienteSeleccionado) {
      try {
        await eliminarCliente(clienteSeleccionado.id);
        setAlert({ type: 'success', message: 'Cliente eliminado correctamente.' });
      } catch (error) {
        setAlert({ type: 'error', message: 'Error al eliminar el cliente.' });
      }
      setModalEliminarOpen(false);
    }
  };

  const handleAgregarCliente = async (cliente) => {
    try {
      await agregarCliente(cliente);
      setAlert({ type: 'success', message: 'Cliente agregado correctamente.' });
    } catch (error) {
      setAlert({ type: 'error', message: 'Error al agregar el cliente.' });
    }
    setModalAgregarOpen(false);
  };

  const handleEditarCliente = async (updatedData) => {
    try {
      await actualizarCliente(clienteSeleccionado.id, updatedData);
      setAlert({ type: 'success', message: 'Cliente actualizado correctamente.' });
    } catch (error) {
      setAlert({ type: 'error', message: 'Error al actualizar el cliente.' });
    }
    setModalEditarOpen(false);
  };

  // Cerrar la alerta después de 3 segundos
  React.useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed inset-y-0 left-0">
        <Sidebar />
      </div>

      <div className="flex-1 ml-64">
        <Navbar />

        {/* Mostrar alertas */}
        {alert && <Alertas type={alert.type} message={alert.message} />}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-bl from-amber-500 to-red-500  p-8 mb-8 shadow-red-300 shadow-lg">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">Gestión de Clientes</h1>
                  <p className="text-amber-100">Gestiona y monitoriza todos tus clientes</p>
                </div>
                <button
                  onClick={() => setModalAgregarOpen(true)}
                  className="cursor-pointer bg-white text-red-500 px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus size={20} className="" />
                  <span>Nuevo Cliente</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Buscar clientes..."
              className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-200 transition-all duration-300 bg-white shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-4 text-gray-400" size={24} />
          </div>

          {/* Mostrar mensaje de carga */}
          {loading ? (
            <SkeletonGrid />
          ) : (
            <>
              {filteredClients.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center p-8 mt-8">
                                        <div className="bg-amber-50 rounded-full p-6 mb-6">
                                            <FolderOpen className="w-16 h-16 text-amber-500" />
                                        </div>
                                        <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                                            No hay ningun cliente registrada
                                        </h3>
                                        <div className="w-32 h-1 bg-gradient-to-r from-amber-300 to-red-400 rounded-full" />
                                    </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClients.map((client) => (
                    <div key={client.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      <div className="p-6">
                        {/* Client Header */}
                        <div className="relative mb-6">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                              <div className="relative bg-linear-to-t from-red-400 to-red-600 p-4 rounded-xl shadow-lg">
                                <User className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h2 className="text-xl font-bold text-gray-800">{client.nombre}</h2>
                              </div>
                            </div>
                            {/* Botones de Editar y Eliminar */}
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setClienteSeleccionado(client);
                                  setModalEditarOpen(true);
                                }}
                                className="p-2 bg-amber-100 text-amber-500 hover:bg-amber-200 rounded-lg cursor-pointer"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleOpenEliminarModal(client)}
                                className="p-2 bg-red-100 text-red-500 hover:bg-red-200 rounded-lg cursor-pointer"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Client Info */}
                        <div className="space-y-4 mb-6">
                          <div className="flex items-center gap-3 text-gray-600">
                            <Mail className="w-5 h-5 text-amber-500" />
                            <span className="text-sm">{client.email}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                            <Phone className="w-5 h-5 text-amber-500" />
                            <span className="text-sm">{client.telefono}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                            <Calendar className="w-5 h-5 text-amber-500" />
                            <span className="text-sm">Registro: {formatDate(client.fecha_registro)}</span>
                          </div>
                        </div>

                        {/* Social Media */}
                        <div className="border-t pt-4">
                          <h3 className="text-sm font-medium text-gray-500 mb-3">Contacto</h3>
                          {client.socialMedia.facebook || client.socialMedia.whatsapp ? (
                            <div className="flex gap-3">
                              {client.socialMedia.facebook && (
                                <a
                                  href={client.socialMedia.facebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl hover:shadow-md transition-all duration-300"
                                >
                                  <img
                                    src={FacebookIcon}
                                    alt="Facebook"
                                    className="w-6 h-6"
                                  />
                                </a>
                              )}
                              {client.socialMedia.whatsapp && (
                                <a
                                  href={client.socialMedia.whatsapp}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl hover:shadow-md transition-all duration-300"
                                >
                                  <img
                                    src={WhatsappIcon}
                                    alt="WhatsApp"
                                    className="w-6 h-6"
                                  />
                                </a>
                              )}
                            </div>
                          ) : (
                            <div className="text-center py-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
                              <p className="text-sm text-gray-500">Este cliente no tiene un contacto registrado.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      <ModalEliminarCliente
        isOpen={modalEliminarOpen}
        onClose={() => setModalEliminarOpen(false)}
        onConfirm={handleDeleteCliente}
        cliente={clienteSeleccionado}
      />

      {/* Modal de agregar cliente */}
      <ModalAgregarCliente
        isOpen={modalAgregarOpen}
        onClose={() => setModalAgregarOpen(false)}
        onSubmit={handleAgregarCliente}
      />

      {/* Modal de editar cliente */}
      <ModalEditarCliente
        isOpen={modalEditarOpen}
        onClose={() => setModalEditarOpen(false)}
        onSubmit={handleEditarCliente}
        cliente={clienteSeleccionado}
      />
    </div>
  );
};

export default Clientes;