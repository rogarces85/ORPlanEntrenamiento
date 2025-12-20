# ORPlanEntrenamiento - Osorno Runner IA

Aplicación web impulsada por Inteligencia Artificial (Gemini) para generar planes de entrenamiento de running personalizados. Utiliza la metodología de Joe Friel para el cálculo de zonas cardíacas y periodización.

## 🚀 Conexión con GitHub

Para vincular este proyecto con tu repositorio remoto, ejecuta los siguientes comandos en tu terminal dentro de la carpeta del proyecto:

1. **Inicializar el repositorio local**:
   ```bash
   git init
   ```

2. **Agregar el origen remoto**:
   ```bash
   git remote add origin https://github.com/rogarces85/ORPlanEntrenamiento.git
   ```

3. **Subir los cambios**:
   ```bash
   git add .
   git commit -m "Initial commit: Osorno Runner IA v3.1"
   git branch -M main
   git push -u origin main
   ```

> [!IMPORTANT]
> **SEGURIDAD:** El archivo `.gitignore` ya está configurado para no subir archivos `.env`. Asegúrate de no incluir tus claves API directamente en el código que subas a GitHub.

## ✨ Características

- **IA Senior**: Generación de planes basados en Gemini 3 Pro.
- **Metodología Joe Friel**: Cálculo preciso de LTHR y zonas de potencia/ritmo.
- **Exportación PDF**: Documento listo para imprimir o llevar en el móvil.
- **Dashboard Adaptable**: Interfaz optimizada para móviles y escritorio.

## 🛠️ Instalación y Desarrollo

1.  Instalar dependencias:
    ```bash
    npm install
    ```
2.  Configurar API Key:
    Crea un archivo `.env` en la raíz (está ignorado por git) y añade:
    ```env
    API_KEY=tu_clave_aqui
    ```
3.  Iniciar entorno de desarrollo:
    ```bash
    npm run dev
    ```

---
Desarrollado para la comunidad de **Osorno Runner**.
