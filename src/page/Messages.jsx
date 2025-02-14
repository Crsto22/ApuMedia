import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Nabvar';
import { Send, User, MoreVertical, Phone, Video, Search } from 'lucide-react';

const Messages = () => {
  const [contacts] = useState([
    {
      id: 1,
      name: "María García",
      lastMessage: "¡Nos vemos mañana!",
      lastSeen: "Hace 5 min",
      unread: 2,
      isOnline: true,
    },
    {
      id: 2,
      name: "Juan Pérez",
      lastMessage: "¿Cómo va todo?",
      lastSeen: "Hace 1 hora",
      unread: 0,
      isOnline: true,
    },
    {
      id: 3,
      name: "Ana Martínez",
      lastMessage: "Gracias por la ayuda",
      lastSeen: "Hace 2 horas",
      unread: 0,
      isOnline: false,
    },
    {
      id: 4,
      name: "Carlos Rodríguez",
      lastMessage: "¡Perfecto!",
      lastSeen: "Hace 3 horas",
      unread: 1,
      isOnline: false,
    },
  ]);

  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState([
    { id: 1, text: "¡Hola! ¿Cómo estás?", timestamp: new Date(Date.now() - 3600000), isUser: false },
    { id: 2, text: "¡Muy bien! ¿Y tú?", timestamp: new Date(Date.now() - 3500000), isUser: true },
    { id: 3, text: "Todo excelente, gracias", timestamp: new Date(Date.now() - 3400000), isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: newMessage,
          timestamp: new Date(),
          isUser: true,
        },
      ]);
      setNewMessage("");

      // Simulate response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "¡Gracias por tu mensaje!",
            timestamp: new Date(),
            isUser: false,
          },
        ]);
      }, 1000);
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatMessageTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
        <div className="bg-gray-100  p-8">
          {/* Nuevo diseño de mensajes */}
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex h-[85vh] border border-gray-100">
            {/* Contacts Sidebar */}
            <div className="w-80 border-r border-gray-100 flex flex-col bg-white">
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Mensajes</h2>
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar chat..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-gray-50"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setActiveContact(contact)}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 
                      ${activeContact.id === contact.id ? "bg-indigo-50" : ""}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-semibold shadow-sm">
                          {getInitials(contact.name)}
                        </div>
                        {contact.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{contact.lastSeen}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate mt-1">{contact.lastMessage}</p>
                      </div>
                      {contact.unread > 0 && (
                        <div className="bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                          {contact.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-semibold shadow-sm">
                        {getInitials(activeContact.name)}
                      </div>
                      {activeContact.isOnline && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">{activeContact.name}</h2>
                      <p className="text-sm text-gray-500">
                        {activeContact.isOnline ? "En línea" : activeContact.lastSeen}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Video className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-gray-50 to-white">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-end space-x-2 max-w-[70%] ${
                        message.isUser ? "flex-row-reverse space-x-reverse" : "flex-row"
                      }`}
                    >
                      {!message.isUser && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-sm shadow-sm">
                          {getInitials(activeContact.name)}
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-4 py-2 shadow-sm ${
                          message.isUser
                            ? "bg-indigo-500 text-white"
                            : "bg-white text-gray-800 border border-gray-100"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{message.text}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <p className="text-xs opacity-75">
                            {formatMessageTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={sendMessage}>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Escribe un mensaje..."
                      className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-gray-50"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-500 text-white p-2 rounded-xl hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;