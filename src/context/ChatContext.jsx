import { createContext, useContext, useState, useEffect } from "react";
import { ref, onValue, push, set, query, orderByChild, equalTo } from "firebase/database";
import { auth, realtimeDB } from "../firebase/FirebaseConfig";

// Crear el contexto del chat
const ChatContext = createContext();

// Proveedor del contexto
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]); // Mensajes del chat
  const [currentChatId, setCurrentChatId] = useState(null); // ID del chat actual
  const [users, setUsers] = useState([]); // Lista de usuarios disponibles
  const [loading, setLoading] = useState(false); // Estado de carga

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

  // 🔹 Obtener mensajes en tiempo real del chat actual
  useEffect(() => {
    if (!currentChatId) return; // Si no hay un chat seleccionado, no hacer nada

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
      } else {
        setMessages([]); // Si no hay mensajes, establecer un array vacío
      }
      setLoading(false);
    });

    // Limpiar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, [currentChatId]);

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

  // 🔹 Seleccionar un chat
  const selectChat = (userId) => {
    if (!auth.currentUser) return; // Validar que haya un usuario autenticado

    // Generar el ID del chat combinando los IDs de los usuarios
    const currentUserId = auth.currentUser.uid;
    const chatId = [currentUserId, userId].sort().join("_"); // Ordenar los IDs para evitar duplicados
    setCurrentChatId(chatId);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        currentChatId,
        users,
        loading,
        sendMessage,
        selectChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Hook personalizado para usar el contexto del chat
export const useChat = () => useContext(ChatContext);