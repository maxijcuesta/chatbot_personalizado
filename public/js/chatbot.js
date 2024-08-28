document.addEventListener('DOMContentLoaded', function () {
    // Crear el contenedor del chatbot
    var chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot';
    chatbotContainer.style.position = 'fixed';
    chatbotContainer.style.bottom = '20px';
    chatbotContainer.style.right = '20px';
    chatbotContainer.style.width = '300px';
    chatbotContainer.style.height = '400px';
    chatbotContainer.style.backgroundColor = '#fff';
    chatbotContainer.style.borderRadius = '10px';
    chatbotContainer.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    chatbotContainer.style.display = 'none'; // Inicialmente oculto
    chatbotContainer.style.flexDirection = 'column';
  
    // Header del chatbot
    var chatbotHeader = document.createElement('div');
    chatbotHeader.style.backgroundColor = '#386DBD';
    chatbotHeader.style.color = '#fff';
    chatbotHeader.style.padding = '10px';
    chatbotHeader.style.borderRadius = '10px 10px 0 0';
    chatbotHeader.textContent = 'MaxiBOT';
  
    // Contenido del chatbot (mensajes)
    var chatbotMessages = document.createElement('div');
    chatbotMessages.id = 'chatbotMessages';
    chatbotMessages.style.flexGrow = '1';
    chatbotMessages.style.padding = '10px';
    chatbotMessages.style.overflowY = 'auto';
    chatbotMessages.style.backgroundColor = '#f0f0f0';
  
    // Input del chatbot
    var chatbotInputContainer = document.createElement('div');
    chatbotInputContainer.style.display = 'flex';
    chatbotInputContainer.style.padding = '10px';
    chatbotInputContainer.style.borderTop = '1px solid #ddd';
  
    var chatbotInput = document.createElement('input');
    chatbotInput.type = 'text';
    chatbotInput.placeholder = 'Escribe tu pregunta...';
    chatbotInput.style.flexGrow = '1';
    chatbotInput.style.padding = '10px';
    chatbotInput.style.borderRadius = '5px';
    chatbotInput.style.border = '1px solid #ddd';
    chatbotInput.style.marginRight = '10px';
  
    var chatbotSendButton = document.createElement('button');
    chatbotSendButton.textContent = 'Enviar';
    chatbotSendButton.style.backgroundColor = '#386DBD';
    chatbotSendButton.style.color = '#fff';
    chatbotSendButton.style.border = 'none';
    chatbotSendButton.style.padding = '10px';
    chatbotSendButton.style.borderRadius = '5px';
  
    // Agregar el input y el botón al contenedor de input
    chatbotInputContainer.appendChild(chatbotInput);
    chatbotInputContainer.appendChild(chatbotSendButton);
  
    // Agregar todo al contenedor principal del chatbot
    chatbotContainer.appendChild(chatbotHeader);
    chatbotContainer.appendChild(chatbotMessages);
    chatbotContainer.appendChild(chatbotInputContainer);
  
    // Agregar el contenedor del chatbot al cuerpo del documento
    document.body.appendChild(chatbotContainer);
  
    // Botón de WhatsApp
    var chatbotButton = document.createElement('button');
    chatbotButton.style.position = 'fixed';
    chatbotButton.style.bottom = '20px';
    chatbotButton.style.right = '20px';
    chatbotButton.style.backgroundColor = '#25D366';
    chatbotButton.style.color = '#fff';
    chatbotButton.style.border = 'none';
    chatbotButton.style.borderRadius = '50%';
    chatbotButton.style.width = '60px';
    chatbotButton.style.height = '60px';
    chatbotButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    chatbotButton.innerHTML = '<svg width="30" height="30" fill="white" viewBox="0 0 16 16"><path d="M13.601 2.399a7.902 7.902 0 1 0-11.186 11.186l-.625 2.29a.75.75 0 0 0 .912.912l2.291-.625A7.902 7.902 0 1 0 13.601 2.4zM8 1.5a6.5 6.5 0 1 1-5.2 10.565.752.752 0 0 0-.293.157l-1.254.342.343-1.254a.752.752 0 0 0-.157-.293A6.5 6.5 0 0 1 8 1.5z"/><path d="M11.608 9.723c-.194-.097-1.147-.566-1.325-.631-.178-.064-.308-.097-.437.097-.128.194-.503.63-.617.759-.114.13-.226.146-.42.049a5.217 5.217 0 0 1-1.515-.93 5.704 5.704 0 0 1-1.06-1.328c-.112-.194-.012-.299.085-.397l.252-.297c.083-.097.168-.194.254-.291.084-.096.112-.172.168-.291.056-.119.028-.224-.014-.32-.042-.097-.368-.887-.504-1.214-.133-.32-.27-.277-.37-.283l-.31-.005a.643.643 0 0 0-.463.215c-.194.194-.741.725-.741 1.769 0 1.043.759 2.05.865 2.192.106.142 1.497 2.29 3.642 3.01.504.173.898.276 1.203.353.506.119.967.102 1.33.062.406-.046 1.25-.512 1.428-1.005.178-.493.178-.916.124-.998-.055-.083-.194-.133-.407-.23z"/></svg>';
  
    // Agregar el botón al cuerpo del documento
    document.body.appendChild(chatbotButton);
  
    // Manejar clic en el botón del chatbot
    chatbotButton.addEventListener('click', function () {
      var isChatVisible = chatbotContainer.style.display === 'flex';
      chatbotContainer.style.display = isChatVisible ? 'none' : 'flex';
    });
  });