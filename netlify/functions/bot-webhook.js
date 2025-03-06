exports.handler = async (event) => {
    try {
      // Verifica que sea una solicitud POST
      if (event.httpMethod !== "POST") {
        return {
          statusCode: 405,
          body: JSON.stringify({ message: "Método no permitido" }),
        };
      }
      exports.handler = async (event) => {
        console.log("🔍 Datos recibidos:", event.body); // 🔥 Esto imprimirá lo que envía Dead Simple Chat
        try {
            const data = JSON.parse(event.body);
            
            return {
                statusCode: 200,
                body: JSON.stringify({ response: `👋 ¡Hola! Recibí tu mensaje: ${data.message}` })
            };
        } catch (error) {
            console.error("❌ Error procesando el webhook:", error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Error procesando la solicitud" })
            };
        }
    };
    
      // Parsear el contenido del mensaje del bot
      const requestBody = JSON.parse(event.body);
      console.log("Mensaje recibido del bot:", requestBody);
  
      // Extraer la información del mensaje
      const userMessage = requestBody.message || "";
      const sender = requestBody.sender || "Anónimo";
  
      // Responder al usuario con un mensaje del bot
      let botResponse = "";
  
      if (userMessage.toLowerCase().includes("hola")) {
        botResponse = `👋 ¡Hola ${sender}! ¿Cómo puedo ayudarte?`;
      } else if (userMessage.toLowerCase().includes("ayuda")) {
        botResponse = "🤖 Aquí tienes los comandos disponibles: /clear, /users, /help, /bot dime algo";
      } else {
        botResponse = `🔮 No entiendo "${userMessage}", pero seguiré aprendiendo.`;
      }
  
      return {
        statusCode: 200,
        body: JSON.stringify({ response: botResponse }),
      };
    } catch (error) {
      console.error("Error en el webhook:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error interno del servidor" }),
      };
    }
  };
  