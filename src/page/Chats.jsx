import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Search, MoreVertical, Check, CheckCheck } from "lucide-react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Nabvar';

const Chats = () => {
  const {
    users,
    messages,
    currentChatId,
    selectChat,
    sendMessage,
    markMessagesAsRead,
    clearChat,
    unreadMessagesByChat, // Obtener los mensajes no leídos por chat
  } = useChat();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Limpiar el chat al desmontar el componente
  useEffect(() => {
    return () => {
      clearChat(); // Limpiar el estado del chat
    };
  }, [clearChat]);

  // Desplazarse al final de los mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentChatId]);

  // Enviar un mensaje
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
      setTimeout(scrollToBottom, 100);
    }
  };

  // Obtener el usuario con el que se está chateando
  const getCurrentChatUser = () => {
    if (!currentChatId || !user) return null;
    const [uid1, uid2] = currentChatId.split("_");
    const otherUserId = uid1 === user.uid ? uid2 : uid1;
    return users.find((u) => u.uid === otherUserId);
  };

  const currentChatUser = getCurrentChatUser();

  // Filtrar usuarios para excluir al usuario actual
  const filteredUsers = users.filter((chatUser) => chatUser.uid !== user?.uid);

  // Formatear la hora del mensaje
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Formatear la última vez que el usuario estuvo en línea
  const formatLastSeen = (lastSeen) => {
    if (!lastSeen) return "Desconectado";
    const now = new Date();
    const lastSeenDate = new Date(lastSeen);
    const diffInMinutes = Math.floor((now - lastSeenDate) / 60000);

    if (diffInMinutes < 1) return "En línea";
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} minutos`;
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)} horas`;
    return `Hace ${Math.floor(diffInMinutes / 1440)} días`;
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
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0">
        <Sidebar />
      </div>

      {/* Main content */}
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
              {filteredUsers.map((chatUser) => {
                // Generar el ID del chat para este usuario
                const chatId = [user.uid, chatUser.uid].sort().join("_");
                // Obtener la cantidad de mensajes no leídos para este chat
                const unreadCount = unreadMessagesByChat[chatId] || 0;

                return (
                  <div
                    key={chatUser.uid}
                    onClick={() => selectChat(chatUser.uid)}
                    className={`flex items-center px-4 py-3.5 cursor-pointer transition-all ${
                      currentChatId?.includes(chatUser.uid)
                        ? "bg-blue-50/50 border-l-4 border-amber-500"
                        : "hover:bg-gray-50 border-l-4 border-transparent"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-linear-to-bl from-red-500 to-amber-500  flex items-center justify-center shadow-sm">
                      <span className="text-lg font-medium text-white">
                        {chatUser.nombre.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h2 className="font-medium text-gray-900">{chatUser.nombre}</h2>
                      <p className="text-xs text-gray-500">Toca para chatear</p>
                    </div>
                    {unreadCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                );
              })}
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
                      <div className="w-14 h-14 rounded-2xl bg-linear-to-bl from-amber-500 to-red-500 flex items-center justify-center shadow-md">
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
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === user.uid ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[60%] rounded-2xl px-4 py-2.5 shadow-sm ${
                          msg.senderId === user.uid
                            ? "bg-amber-400 text-white rounded-br-none"
                            : "bg-white text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <div className="flex items-center justify-end mt-1">
                          <span className="text-xs text-gray-200 mr-2">
                            {formatMessageTime(msg.timestamp)}
                          </span>
                          {msg.senderId === user.uid && (
                            <span className="text-xs">
                              {msg.isRead ? (
                                <CheckCheck className="w-4 h-4 text-blue-700" />
                              ) : (
                                <Check className="w-4 h-4 text-blue-700" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
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
                          ? "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
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
                    <h3 className="text-xl font-medium text-gray-900">Tus mensajes</h3>
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
};

export default Chats;