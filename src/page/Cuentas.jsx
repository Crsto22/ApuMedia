import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Nabvar';
import { User, Mail, Lock, Calendar, Plus, Search, Edit2, Trash2, Monitor, Users } from 'lucide-react';
import { useCuentas } from '../context/CuentasContext'; // Importar el contexto de cuentas
import ModalAgregarCuenta from '../components/ModalAgregarCuenta'; // Importar el modal de agregar
import ModalEditarCuenta from '../components/ModalEditarCuenta'; // Importar el modal de editar
import ModalEliminarCuenta from '../components/ModalEliminarCuenta'; // Importar el modal de eliminar
import Alertas from '../components/Alertas'; // Importar el componente de alertas
import SkeletonGrid from '../components/SkeletonGrid';
import { FolderOpen} from 'lucide-react';
const Cuentas = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [modalAgregarOpen, setModalAgregarOpen] = useState(false); // Estado para controlar el modal de agregar
    const [modalEditarOpen, setModalEditarOpen] = useState(false); // Estado para controlar el modal de editar
    const [modalEliminarOpen, setModalEliminarOpen] = useState(false); // Estado para controlar el modal de eliminar
    const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null); // Estado para almacenar la cuenta seleccionada
    const [alert, setAlert] = useState(null); // Estado para manejar las alertas
    const { cuentas, loading, agregarCuenta, actualizarCuenta, eliminarCuenta } = useCuentas(); // Usar el contexto de cuentas

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Función para manejar la creación de una nueva cuenta
    const handleAgregarCuenta = async (nuevaCuenta) => {
        try {
            await agregarCuenta(nuevaCuenta);
            setAlert({ type: 'success', message: 'Cuenta agregada correctamente.' });
        } catch (error) {
            setAlert({ type: 'error', message: 'Error al agregar la cuenta.' });
        }
        setModalAgregarOpen(false); // Cerrar el modal después de agregar
    };

    // Función para manejar la edición de una cuenta
    const handleEditarCuenta = async (cuentaActualizada) => {
        try {
            await actualizarCuenta(cuentaSeleccionada.id, cuentaActualizada);
            setAlert({ type: 'success', message: 'Cuenta actualizada correctamente.' });
        } catch (error) {
            setAlert({ type: 'error', message: 'Error al actualizar la cuenta.' });
        }
        setModalEditarOpen(false); // Cerrar el modal después de editar
    };

    // Función para manejar la eliminación de una cuenta
    const handleEliminarCuenta = async (id) => {
        try {
            await eliminarCuenta(id);
            setAlert({ type: 'success', message: 'Cuenta eliminada correctamente.' });
        } catch (error) {
            setAlert({ type: 'error', message: 'Error al eliminar la cuenta.' });
        }
        setModalEliminarOpen(false); // Cerrar el modal después de eliminar
    };

    // Función para abrir el modal de edición con la cuenta seleccionada
    const abrirModalEditar = (cuenta) => {
        setCuentaSeleccionada(cuenta);
        setModalEditarOpen(true);
    };

    // Función para abrir el modal de eliminación con la cuenta seleccionada
    const abrirModalEliminar = (cuenta) => {
        setCuentaSeleccionada(cuenta);
        setModalEliminarOpen(true);
    };

    // Filtrar cuentas según el término de búsqueda
    const filteredCuentas = cuentas.filter((cuenta) =>
        cuenta.servicio.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            {/* Fixed Sidebar */}
            <div className="fixed inset-y-0 left-0">
                <Sidebar />
            </div>

            {/* Main content area with margin to account for fixed sidebar */}
            <div className="flex-1 ml-64">
                {/* Navbar */}
                <Navbar />

                {/* Mostrar alertas */}
                {alert && <Alertas type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

                {/* Main content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header Section */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-bl from-red-500 to-amber-600 p-8 mb-8 shadow-amber-300 shadow-lg">
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-4xl font-bold text-white mb-2">Gestión de Cuentas</h1>
                                    <p className="text-blue-100">Administra tus cuentas de streaming</p>
                                </div>
                                <button
                                    onClick={() => setModalAgregarOpen(true)} // Abrir el modal al hacer clic
                                    className="cursor-pointer bg-white text-red-500 px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <Plus size={20} />
                                    <span>Nueva Cuenta</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-8">
                        <input
                            type="text"
                            placeholder="Buscar cuentas..."
                            className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-white shadow-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-4 top-4 text-gray-400" size={24} />
                    </div>

                    {/* Accounts Grid */}
                    {loading ? (
                        <SkeletonGrid /> // Mostrar esqueleto de carga
                    ) : filteredCuentas.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-8 mt-8">
                        <div className="bg-amber-50 rounded-full p-6 mb-6">
                          <FolderOpen className="w-16 h-16 text-amber-500" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                          No hay ninguna cuenta registradas
                        </h3>
                        <div className="w-32 h-1 bg-gradient-to-r from-amber-300 to-red-400 rounded-full" />
                      </div>                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCuentas.map((cuenta) => (
                                <div key={cuenta.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                    <div className="p-6">
                                        {/* Account Header */}
                                        <div className="relative mb-6">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative bg-gradient-to-t from-amber-400 to-amber-600 p-4 rounded-xl shadow-lg">
                                                        <Monitor className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <h2 className="text-xl font-bold text-gray-800">{cuenta.servicio}</h2>
                                                        <span className="text-sm text-purple-500">{cuenta.detalles.plan}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => abrirModalEditar(cuenta)} // Abrir modal de edición
                                                        className="p-2 bg-amber-100 text-amber-500 hover:bg-purple-200 rounded-lg cursor-pointer"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => abrirModalEliminar(cuenta)} // Abrir modal de eliminación
                                                        className="p-2 bg-red-100 text-red-500 hover:bg-red-200 rounded-lg cursor-pointer"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Account Info */}
                                        <div className="space-y-4 mb-6">
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Users className="w-5 h-5 text-red-500" />
                                                <span className="text-sm">Usuarios máximos: {cuenta.usuarios_maximos}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Mail className="w-5 h-5 text-red-500" />
                                                <span className="text-sm">{cuenta.credenciales.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Lock className="w-5 h-5 text-red-500" />
                                                <span className="text-sm">••••••••••••</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Calendar className="w-5 h-5 text-red-500" />
                                                <span className="text-sm">Expira: {formatDate(cuenta.fecha_expiracion)}</span>
                                            </div>
                                        </div>

                                        {/* Pricing Info */}
                                        <div className="border-t pt-4">
                                            <h3 className="text-sm font-medium text-gray-500 mb-3">Detalles de precio</h3>
                                            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm text-gray-600">Precio total:</span>
                                                    <span className="font-semibold text-red-500">S/{cuenta.precio_total}</span>
                                                </div>
                                                {cuenta.precio_por_perfil && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">Precio por perfil:</span>
                                                        <span className="font-semibold text-red-500">S/{cuenta.precio_por_perfil}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Agregar Cuenta */}
            <ModalAgregarCuenta
                isOpen={modalAgregarOpen}
                onClose={() => setModalAgregarOpen(false)}
                onSubmit={handleAgregarCuenta}
            />

            {/* Modal de Editar Cuenta */}
            <ModalEditarCuenta
                isOpen={modalEditarOpen}
                onClose={() => setModalEditarOpen(false)}
                onSubmit={handleEditarCuenta}
                cuenta={cuentaSeleccionada} // Pasar la cuenta seleccionada al modal
            />

            {/* Modal de Eliminar Cuenta */}
            <ModalEliminarCuenta
                isOpen={modalEliminarOpen}
                onClose={() => setModalEliminarOpen(false)}
                onConfirm={() => handleEliminarCuenta(cuentaSeleccionada?.id)} // Confirmar eliminación
                cuenta={cuentaSeleccionada} // Pasar la cuenta seleccionada al modal
            />
        </div>
    );
};

export default Cuentas;