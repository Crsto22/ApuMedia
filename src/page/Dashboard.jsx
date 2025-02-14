import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Nabvar';
import { BarChart2, TrendingUp, Users, Play, AlertCircle, Activity, DollarSign, Clock, Settings, Bell, Search, Filter, ChevronRight, MoreVertical } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="flex min-h-screen">
            {/* Fixed Sidebar */}
            <div className="fixed inset-y-0 left-0">
                <Sidebar />
            </div>

            {/* Main content area with margin to account for fixed sidebar */}
            <div className="flex-1 ml-64">
                {/* Navbar */}
                <Navbar />

                {/* Main content */}
                <div className="bg-gray-100">
                    <div className="p-8 min-h-screen">
                        {/* Header Section */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Dashboard Principal</h1>
                                <p className="text-gray-500">Bienvenido de vuelta, Admin</p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Cuentas Activas</p>
                                        <div className="flex items-baseline mt-1">
                                            <h3 className="text-2xl font-bold text-gray-900">1,234</h3>
                                            <span className="ml-2 text-xs font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                                                +12.5%
                                            </span>
                                        </div>
                                        <div className="mt-4">
                                            <div className="bg-blue-50 w-full h-2 rounded-full">
                                                <div className="bg-blue-500 w-3/4 h-2 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Más stats cards similares... */}
                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-between">
                                    <div className="w-full">
                                        <p className="text-sm font-medium text-gray-500">Ingresos Mensuales</p>
                                        <div className="flex items-baseline mt-1">
                                            <h3 className="text-2xl font-bold text-gray-900">$8,459</h3>
                                            <span className="ml-2 text-xs font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                                                +18.2%
                                            </span>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                                            <span>Meta: $10,000</span>
                                            <span>84.6%</span>
                                        </div>
                                        <div className="mt-1">
                                            <div className="bg-purple-50 w-full h-2 rounded-full">
                                                <div className="bg-purple-500 w-4/5 h-2 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Servicios Más Populares</p>
                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Netflix</span>
                                            <span className="text-sm font-medium text-gray-900">45%</span>
                                        </div>
                                        <div className="bg-red-50 w-full h-2 rounded-full">
                                            <div className="bg-red-500 w-1/2 h-2 rounded-full"></div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Disney+</span>
                                            <span className="text-sm font-medium text-gray-900">35%</span>
                                        </div>
                                        <div className="bg-blue-50 w-full h-2 rounded-full">
                                            <div className="bg-blue-500 w-1/3 h-2 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Renovaciones Pendientes</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">28</h3>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            <span className="text-gray-600">Próximas 24h (8)</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                            <span className="text-gray-600">Esta semana (12)</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-gray-600">Próxima semana (8)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                            {/* Recent Activity Section */}
                            <div className="lg:col-span-4 space-y-8">
                                {/* Recent Sales */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg font-semibold text-gray-900">Ventas Recientes</h2>
                                        <div className="flex items-center gap-4">
                                            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                                                <Filter className="w-4 h-4" />
                                                Filtrar
                                            </button>
                                            <button className="text-sm text-blue-600 hover:text-blue-700">Ver todas</button>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                                                        {['N', 'D', 'H', 'P'][i - 1]}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {['Netflix Premium', 'Disney+ Familiar', 'HBO Max', 'Prime Video'][i - 1]}
                                                        </p>
                                                        <p className="text-sm text-gray-500">ID: #0{i}923</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-gray-900">${[15.99, 12.99, 14.99, 9.99][i - 1]}</p>
                                                    <p className="text-sm text-gray-500">Hace {i} hora{i !== 1 ? 's' : ''}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Analytics Chart */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg font-semibold text-gray-900">Análisis de Ventas</h2>
                                        <select className="bg-gray-50 border-0 rounded-lg text-sm text-gray-500 p-2">
                                            <option>Últimos 7 días</option>
                                            <option>Último mes</option>
                                            <option>Último año</option>
                                        </select>
                                    </div>
                                    <div className="h-64 w-full bg-gray-50 rounded-xl flex items-center justify-center">
                                        <p className="text-gray-500">Área para gráfico de análisis</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Sidebar */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Quick Actions */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-center">
                                            <Play className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                            <span className="text-sm font-medium text-gray-700">Nueva Cuenta</span>
                                        </button>
                                        <button className="p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors text-center">
                                            <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                            <span className="text-sm font-medium text-gray-700">Nuevo Cliente</span>
                                        </button>
                                        <button className="p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors text-center">
                                            <BarChart2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                            <span className="text-sm font-medium text-gray-700">Reportes</span>
                                        </button>
                                        <button className="p-4 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors text-center">
                                            <Settings className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                                            <span className="text-sm font-medium text-gray-700">Configuración</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Upcoming Renewals */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Próximas Renovaciones</h2>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <Clock className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Netflix Premium</p>
                                                        <p className="text-xs text-gray-500">Vence en {i} día{i !== 1 ? 's' : ''}</p>
                                                    </div>
                                                </div>
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Top Services */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Servicios Top</h2>
                                    <div className="space-y-4">
                                        {[
                                            { name: 'Netflix', color: 'bg-red-500', percentage: 45 },
                                            { name: 'Disney+', color: 'bg-blue-500', percentage: 35 },
                                            { name: 'HBO Max', color: 'bg-purple-500', percentage: 20 },
                                        ].map((service) => (
                                            <div key={service.name} className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">{service.name}</span>
                                                    <span className="font-medium text-gray-900">{service.percentage}%</span>
                                                </div>
                                                <div className="bg-gray-100 h-2 rounded-full">
                                                    <div
                                                        className={`${service.color} h-2 rounded-full`}
                                                        style={{ width: `${service.percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;