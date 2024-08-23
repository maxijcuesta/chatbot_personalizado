# My Chatbots

Este es un proyecto desarrollado en Next.js que implementa un chatbot personalizado utilizando la API de OpenAI. El chatbot está diseñado para integrarse en una página web y proporcionar respuestas automáticas a preguntas basadas en un archivo PDF que contiene información específica.

## Características

- **Chatbot con IA:** Implementa un chatbot que responde preguntas basadas en un PDF fragmentado.
- **Next.js y TypeScript:** Desarrollado utilizando Next.js para la estructura del proyecto y TypeScript para un desarrollo seguro.
- **Despliegue en Vercel:** El proyecto está desplegado en Vercel para estar siempre disponible online.

## Instalación y Configuración

1. **Clonar el Repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/my-chatbots.git
   cd my-chatbots
    ``` 
    ```bash
    npm install
    ```
    ```bash
    OPENAI_API_KEY=tu_clave_api
    ```

    Los archivos mi_informacion.pdf y los fragmentos PDF necesarios para las respuestas del chatbot no están incluidos en el repositorio. Deben estar en public/pdf/ para que el chatbot funcione correctamente.
	•	public/pdf/mi_informacion.pdf
	•	public/pdf/fragments/

## Despliegue

El proyecto está configurado para desplegarse en Vercel. Sigue los pasos a continuación para desplegarlo:

	1.	Sube el Proyecto a un Repositorio en GitHub:
	•	Sube el proyecto a un repositorio privado en GitHub para mantener los archivos sensibles fuera de GitHub público.
	2.	Desplegar en Vercel:
	•	Conecta tu cuenta de Vercel a tu repositorio de GitHub.
	•	Vercel detectará automáticamente que el proyecto es de Next.js y lo desplegará.
	3.	Archivos en Producción:
	•	Asegúrate de que los archivos PDF necesarios estén disponibles en el despliegue en Vercel en la carpeta public/pdf.

## Uso

Para iniciar el proyecto en local:
```bash
npm run dev
```
Visita http://localhost:3000 para ver el chatbot en acción.

## Contribuciones

Si deseas contribuir al proyecto, por favor, haz un fork del repositorio, crea una nueva rama y envía un pull request con tus cambios.

## Licencia

Este proyecto está bajo la Licencia MIT.