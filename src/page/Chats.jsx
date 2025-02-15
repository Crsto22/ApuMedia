import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Search, MoreVertical, Check, CheckCheck } from "lucide-react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Nabvar';

const Chats = () => {
    const { users, messages, currentChatId, selectChat, sendMessage, markMessagesAsRead } = useChat();
    const { user } = useAuth();
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, currentChatId]);

    const isNearBottom = () => {
        if (messagesContainerRef.current) {
            const container = messagesContainerRef.current;
            const threshold = 100;
            return container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
        }
        return true;
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const shouldScroll = isNearBottom();
            sendMessage(newMessage);
            setNewMessage("");
            if (shouldScroll) {
                setTimeout(scrollToBottom, 100);
            }
        }
    };

    const generateUserColor = (userId) => {
        const colors = [
            'bg-blue-500',
            'bg-emerald-500',
            'bg-indigo-500',
            'bg-rose-500',
            'bg-violet-500'
        ];
        return colors[userId.length % colors.length];
    };

    // Obtener el usuario con el que se está chateando
    const getCurrentChatUser = () => {
        if (!currentChatId || !user) return null;

        // Extraer los IDs de los usuarios del chatId
        const [uid1, uid2] = currentChatId.split("_");

        // Determinar cuál de los dos IDs no es el del usuario actual
        const otherUserId = uid1 === user.uid ? uid2 : uid1;

        // Buscar el usuario en la lista de usuarios
        return users.find(u => u.uid === otherUserId);
    };

    const currentChatUser = getCurrentChatUser();

    // Filtrar usuarios para excluir al usuario actual
    const filteredUsers = users.filter((chatUser) => chatUser.uid !== user?.uid);

    // Función para formatear la hora del mensaje
    const formatMessageTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Marcar mensajes como leídos cuando el usuario los vea
    useEffect(() => {
        if (messagesContainerRef.current && currentChatId) {
            const container = messagesContainerRef.current;
            const handleScroll = () => {
                if (isNearBottom()) {
                    // Marcar mensajes como leídos
                    const unreadMessages = messages.filter(
                        (msg) => !msg.isRead && msg.senderId !== user.uid
                    );
                    if (unreadMessages.length > 0) {
                        markMessagesAsRead(unreadMessages);
                    }
                }
            };

            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, [messages, currentChatId, user.uid, markMessagesAsRead]);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Fixed Sidebar */}
            <div className="fixed inset-y-0 left-0">
                <Sidebar />
            </div>

            {/* Main content area with margin to account for fixed sidebar */}
            <div className="flex-1 ml-64 flex flex-col h-screen">
                {/* Navbar */}
                <Navbar />

                {/* Chat container */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Users List */}
                    <div className="w-80 flex flex-col bg-white border-r border-gray-100">
                        <div className="p-4 border-b border-gray-100">
                            <h1 className="text-xl font-semibold text-gray-800 mb-4">Mensajes</h1>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar chat..."
                                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
                            {filteredUsers.map((chatUser) => (
                                <div
                                    key={chatUser.uid}
                                    onClick={() => selectChat(chatUser.uid)}
                                    className={`flex items-center px-4 py-3.5 cursor-pointer transition-all ${
                                        currentChatId?.includes(chatUser.uid)
                                            ? "bg-blue-50/50 border-l-4 border-blue-500"
                                            : "hover:bg-gray-50 border-l-4 border-transparent"
                                    }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl ${generateUserColor(chatUser.uid)} flex items-center justify-center shadow-sm`}>
                                        <span className="text-lg font-medium text-white">
                                            {chatUser.nombre.slice(0, 2).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="ml-3">
                                        <h2 className="font-medium text-gray-900">{chatUser.nombre}</h2>
                                        <p className="text-xs text-gray-500">Toca para chatear</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col bg-gray-50">
                        {currentChatId ? (
                            <>
                                {/* Chat Header */}
                                <div className="bg-white border-b border-gray-100">
                                    <div className="px-6 py-4 flex items-center">
                                        <div className="flex items-center flex-1">
                                            <div className={`w-14 h-14 rounded-2xl ${generateUserColor(currentChatUser?.uid)} flex items-center justify-center shadow-md`}>
                                                <span className="text-xl font-medium text-white">
                                                    {currentChatUser?.nombre.slice(0, 2).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {currentChatUser?.nombre}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {currentChatUser?.isOnline ? "En línea" : "Desconectado"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <button className="p-2 rounded-full hover:bg-gray-100 transition-all">
                                                <Search className="w-5 h-5 text-gray-500" />
                                            </button>
                                            <button className="p-2 rounded-full hover:bg-gray-100 transition-all">
                                                <MoreVertical className="w-5 h-5 text-gray-500" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Messages Area */}
                                <div
                                    ref={messagesContainerRef}
                                    className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300"
                                >
                                    {messages.length > 0 ? (
                                        <>
                                            {messages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    className={`flex ${msg.senderId === user.uid ? "justify-end" : "justify-start"}`}
                                                >
                                                    {msg.senderId !== user.uid && (
                                                        <div className={`w-8 h-8 rounded-lg ${generateUserColor(msg.senderId)} flex items-center justify-center mr-2 self-end mb-2`}>
                                                            <span className="text-xs font-medium text-white">
                                                                {users.find(u => u.uid === msg.senderId)?.nombre.slice(0, 2).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div
                                                        className={`group relative max-w-[60%] rounded-2xl px-4 py-2.5 shadow-sm 
                                                        ${msg.senderId === user.uid
                                                            ? "bg-blue-500 text-white rounded-br-none"
                                                            : "bg-white text-gray-800 rounded-bl-none"
                                                        }`}
                                                    >
                                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                                        <div className="flex items-center justify-end mt-1">
                                                            <span className="text-xs text-gray-300 mr-2">
                                                                {formatMessageTime(msg.timestamp)}
                                                            </span>
                                                            {msg.senderId === user.uid && (
                                                                <span className="text-xs">
                                                                    {msg.isRead ? (
                                                                        <CheckCheck className="w-4 h-4 text-blue-300" />
                                                                    ) : (
                                                                        <Check className="w-4 h-4 text-gray-300" />
                                                                    )}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div ref={messagesEndRef} />
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                                                <MessageSquare className="w-10 h-10 text-blue-500" />
                                            </div>
                                            <p className="text-gray-500 text-sm">Comienza la conversación con {currentChatUser?.nombre}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Message Input */}
                                <div className="px-6 py-4 bg-white border-t border-gray-100">
                                    <div className="flex items-center bg-gray-50 rounded-xl px-4">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder={`Mensaje para ${currentChatUser?.nombre}...`}
                                            className="flex-1 py-3.5 bg-transparent text-sm focus:outline-none"
                                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className={`ml-2 p-2.5 rounded-xl transition-all ${
                                                newMessage.trim()
                                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            }`}
                                            disabled={!newMessage.trim()}
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                                        <MessageSquare className="w-12 h-12 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-gray-900">
                                            Tus mensajes
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Selecciona un chat para comenzar una conversación
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chats;