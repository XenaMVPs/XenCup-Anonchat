exports.handler = async (event) => {
    try {
      // 1. Verificamos que el método sea POST
      if (event.httpMethod !== "POST") {
        return {
          statusCode: 405,
          body: JSON.stringify({ message: "Método no permitido" }),
        };
      }
  
      // 2. Mostramos en logs todo lo que llega
      console.log("🔍 Datos recibidos:", event.body);
  
      // 3. Parseamos el body que envía Dead Simple Chat
      const data = JSON.parse(event.body);
  
      /**
       * Dead Simple Chat envía el mensaje dentro de:
       * data.message.message
       * Ejemplo:
       *  {
       *    message: {
       *      message: "@B4ckbiaDulce hola"
       *    },
       *    user: { username: "xenadev" },
       *    ...
       *  }
       */
      const userMessage = data.message?.message || "";
      const sender = data.user?.username || "Anónimo";
  
      console.log("📌 userMessage:", userMessage);
      console.log("📌 sender:", sender);
  
      // 4. Lógica de respuesta del Bot
      let botResponse = "";
  
      if (userMessage.toLowerCase().includes("hola")) {
        botResponse = `👋 ¡Hola ${sender}! ¿Cómo puedo ayudarte?`;
      } else if (userMessage.toLowerCase().includes("ayuda")) {
        botResponse = "🤖 Aquí tienes los comandos disponibles: /clear, /users, /help, /bot dime algo";
      } else {
        botResponse = `🔮 No entiendo "${userMessage}", pero seguiré aprendiendo.`;
      }
  
      // 5. Enviamos la respuesta al chat
      return {
        statusCode: 200,
        body: JSON.stringify({ response: botResponse })
      };
  
    } catch (error) {
      console.error("❌ Error en el webhook:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error interno del servidor" }),
      };
    }
  };
  