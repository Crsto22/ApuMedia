import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ref, onValue, push, set, update, get } from "firebase/database";
import { auth, realtimeDB } from "../firebase/FirebaseConfig";

// Crear el contexto del chat
const ChatContext = createContext();

// Proveedor del contexto
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]); // Mensajes del chat actual
  const [currentChatId, setCurrentChatId] = useState(null); // ID del chat actual
  const [users, setUsers] = useState([]); // Lista de usuarios disponibles
  const [loading, setLoading] = useState(false); // Estado de carga
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [filteredUsers, setFilteredUsers] = useState([]); // Usuarios filtrados
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0); // Contador global de mensajes no leídos
  const [unreadMessagesByChat, setUnreadMessagesByChat] = useState({}); // Contador de mensajes no leídos por chat

  // 🔹 Función para limpiar el estado del chat
  const clearChat = useCallback(() => {
    setCurrentChatId(null); // Limpiar el chat actual
    setMessages([]); // Limpiar los mensajes
  }, []);

  // 🔹 Marcar mensajes como leídos
  const markMessagesAsRead = useCallback(async (messages) => {
    try {
      const updates = {};

      // Marcar mensajes no leídos como leídos en la base de datos
      messages.forEach((msg) => {
        updates[`chats/${currentChatId}/messages/${msg.id}/isRead`] = true;
      });

      // Realizar la actualización en la base de datos
      if (Object.keys(updates).length > 0) {
        await update(ref(realtimeDB), updates);
      }

      // Actualizar el estado local
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          messages.some((m) => m.id === msg.id) ? { ...msg, isRead: true } : msg
        )
      );
    } catch (error) {
      console.error("Error al marcar mensajes como leídos:", error);
      throw error;
    }
  }, [currentChatId]);

  // 🔹 Obtener todos los usuarios de la base de datos
  useEffect(() => {
    const usersRef = ref(realtimeDB, "users");

    // Escuchar cambios en la lista de usuarios
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        // Convertir el objeto de usuarios en un array
        const usersList = Object.keys(usersData).map((key) => ({
          id: key,
          ...usersData[key],
        }));
        setUsers(usersList);
      } else {
        setUsers([]); // Si no hay usuarios, establecer un array vacío
      }
    });

    // Limpiar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  // 🔹 Filtrar usuarios en tiempo real según la búsqueda
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = users.filter((user) =>
        user.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]); // Si no hay búsqueda, no mostrar usuarios
    }
  }, [searchQuery, users]);

  // 🔹 Contar mensajes no leídos para el usuario actual (global y por chat)
  const countUnreadMessages = useCallback(async (userId) => {
    try {
      const chatsRef = ref(realtimeDB, "chats");
      const snapshot = await get(chatsRef);

      if (snapshot.exists()) {
        const chatsData = snapshot.val();
        let totalUnread = 0;
        const unreadByChat = {};

        // Recorrer todos los chats
        Object.keys(chatsData).forEach((chatId) => {
          if (chatId.includes(userId)) {
            // Verificar si el chat incluye al usuario actual
            const messages = chatsData[chatId].messages;
            let chatUnread = 0;

            // Contar mensajes no leídos donde el usuario actual es el destinatario
            Object.keys(messages).forEach((messageId) => {
              const message = messages[messageId];
              if (!message.isRead && message.senderId !== userId) {
                totalUnread++;
                chatUnread++;
              }
            });

            // Guardar el contador de mensajes no leídos por chat
            if (chatUnread > 0) {
              unreadByChat[chatId] = chatUnread;
            }
          }
        });

        // Actualizar el estado global y por chat
        setUnreadMessagesCount(totalUnread);
        setUnreadMessagesByChat(unreadByChat);

        return { totalUnread, unreadByChat };
      } else {
        setUnreadMessagesCount(0);
        setUnreadMessagesByChat({});
        return { totalUnread: 0, unreadByChat: {} };
      }
    } catch (error) {
      console.error("Error al contar mensajes no leídos:", error);
      throw error;
    }
  }, []);

  // 🔹 Actualizar el contador de mensajes no leídos (global y por chat)
  useEffect(() => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      // Contar mensajes no leídos al cargar el componente
      countUnreadMessages(userId).then(({ totalUnread, unreadByChat }) => {
        setUnreadMessagesCount(totalUnread);
        setUnreadMessagesByChat(unreadByChat);
      });

      // Escuchar cambios en los chats para actualizar el contador
      const chatsRef = ref(realtimeDB, "chats");
      const unsubscribe = onValue(chatsRef, (snapshot) => {
        if (snapshot.exists()) {
          countUnreadMessages(userId).then(({ totalUnread, unreadByChat }) => {
            setUnreadMessagesCount(totalUnread);
            setUnreadMessagesByChat(unreadByChat);
          });
        }
      });

      return () => unsubscribe(); // Limpiar suscripción
    }
  }, [countUnreadMessages]);

  // 🔹 Obtener mensajes en tiempo real del chat actual
  useEffect(() => {
    if (!currentChatId || !auth.currentUser) return; // Si no hay un chat seleccionado o usuario autenticado, no hacer nada

    // Referencia a la colección de mensajes del chat actual
    const messagesRef = ref(realtimeDB, `chats/${currentChatId}/messages`);

    // Escuchar cambios en los mensajes
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        // Convertir el objeto de mensajes en un array
        const messagesList = Object.keys(messagesData).map((key) => ({
          id: key,
          ...messagesData[key],
        }));
        setMessages(messagesList);

        // Marcar mensajes no leídos como leídos
        const unreadMessages = messagesList.filter(
          (msg) => !msg.isRead && msg.senderId !== auth.currentUser.uid
        );
        if (unreadMessages.length > 0) {
          markMessagesAsRead(unreadMessages);
        }
      } else {
        setMessages([]); // Si no hay mensajes, establecer un array vacío
      }
      setLoading(false);
    });

    // Limpiar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, [currentChatId, auth.currentUser, markMessagesAsRead]);

  // 🔹 Seleccionar un chat
  const selectChat = (userId) => {
    if (!auth.currentUser) return; // Validar que haya un usuario autenticado

    // Generar el ID del chat combinando los IDs de los usuarios
    const currentUserId = auth.currentUser.uid;
    const chatId = [currentUserId, userId].sort().join("_"); // Ordenar los IDs para evitar duplicados
    setCurrentChatId(chatId);
  };

  // 🔹 Enviar un mensaje
  const sendMessage = async (text) => {
    if (!currentChatId || !auth.currentUser) return; // Validar que haya un chat seleccionado y un usuario autenticado

    try {
      const newMessage = {
        senderId: auth.currentUser.uid,
        text,
        timestamp: new Date().toISOString(),
        isRead: false,
      };

      // Referencia a la colección de mensajes del chat actual
      const messagesRef = ref(realtimeDB, `chats/${currentChatId}/messages`);

      // Agregar el nuevo mensaje
      const newMessageRef = push(messagesRef);
      await set(newMessageRef, newMessage);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        currentChatId,
        users,
        filteredUsers,
        loading,
        searchQuery,
        unreadMessagesCount,
        unreadMessagesByChat,
        setSearchQuery,
        sendMessage,
        selectChat,
        clearChat,
        markMessagesAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Hook personalizado para usar el contexto del chat
export const useChat = () => useContext(ChatContext);