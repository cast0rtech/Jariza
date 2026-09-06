# ⚡ Tesla Local Stats (castor_tech)

<p align="center">
  <img src="public/logo.png" alt="castor_tech Logo" width="140" />
</p>

<p align="center">
  <b>Monitorización local, telemetría y análisis para tu vehículo Tesla en Android.</b><br>
  <i>Una alternativa 100% privada y local a Stats for Tesla, Tessie y TeslaMate — sin servidores externos, sin suscripciones y con mapas gratuitos.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Android-green?logo=android" alt="Android" />
  <img src="https://img.shields.io/badge/Capacitor-v7.0-blue?logo=capacitor" alt="Capacitor" />
  <img src="https://img.shields.io/badge/React-19-61dafb?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Maps-OpenStreetMap-brightgreen?logo=openstreetmap" alt="OpenStreetMap" />
  <img src="https://img.shields.io/badge/Brand-castor__tech-emerald" alt="castor_tech" />
  <img src="https://img.shields.io/badge/License-MIT-purple" alt="License" />
</p>

---

## 📖 Índice

1. [Descripción General](#-descripción-general)
2. [Los 6 Menús Principales](#-los-6-menús-principales)
3. [Privacidad, Google Drive y Exportación CSV](#-privacidad-google-drive-y-exportación-csv)
4. [Guía Paso a Paso para Compilar el APK en Android Studio](#-guía-paso-a-paso-para-compilar-el-apk-en-android-studio)
5. [Compilación Rápida por Consola / Terminal](#-compilación-rápida-por-consola--terminal)
6. [Instalación en el Dispositivo Móvil](#-instalación-en-el-dispositivo-móvil)
7. [Tecnologías Utilizadas](#-tecnologías-utilizadas)

---

## 🌟 Descripción General

**Tesla Local Stats** es una aplicación diseñada para propietarios de vehículos Tesla que desean el máximo control sobre sus datos de telemetría y consumo sin depender de servicios de terceros en la nube. 

A diferencia de otras apps del mercado, **Tesla Local Stats**:
- **Almacenamiento 100% Local:** Todos tus trayectos, sesiones de carga y datos de batería se guardan directamente en el almacenamiento interno de tu móvil (mediante IndexedDB con Dexie.js).
- **Sin Cuotas ni Servidores Centrales:** Conexión directa desde tu teléfono a la API oficial de Tesla.
- **Protector contra Drenaje Fantasma (*Sleep Watchdog*):** Suspende las consultas pesadas tras 15 minutos con el coche estacionado para permitir que entre en reposo profundo (*deep sleep*) y no agotar la batería de 12V ni del pack.
- **Mapas 100% Gratuitos y Sin Claves:** Visualización de rutas con **OpenStreetMap**, con opción de mapa estándar, modo oscuro y fotografía de satélite de alta resolución sin necesidad de ninguna clave de API de Google Maps.
- **Copia Opcional en Google Drive:** Función para hacer backup de tus datos y **"Liberar Espacio en el Móvil"** archivando rutas antiguas en tu propia nube personal de Google.

---

## 📱 Los 6 Menús Principales

La pantalla de inicio cuenta con un cuadro de mandos con el estado del vehículo en vivo (*En reposo*, *Conduciendo*, *Cargando*) y acceso directo a los 6 módulos:

```
┌─────────────────────────────────────────────────────────────┐
│ 🚗 Halcón Milenario (Model Y)  [🌙 En Reposo]   🔄 ☁️ 📥 ⚙️ │
│ 76% (403 km) • 43.280 km • 21°C int / 19°C ext             │
├─────────────────────────────────────────────────────────────┤
│                    MENÚS PRINCIPALES                        │
│                                                             │
│  [🔋 Batería]                [⚡ Carga]                      │
│   Nivel, autonomía y reposo    Sesiones, curvas y costes    │
│                                                             │
│  [🧭 Trayectos]              [🎛️ Comandos Vehículo]         │
│   Historial y mapa OSM         Bloqueo, clima, luces, etc.  │
│                                                             │
│  [📊 Análisis de Batería]    [🔖 Guardar Rutas]             │
│   Salud celular y degradación  Grabadora y mapa gratuito    │
└─────────────────────────────────────────────────────────────┘
```

### 1. 🔋 Batería
- Visualización gráfica del nivel de carga (SOC %).
- Autonomía homologada (WLTP) vs. autonomía real estimada según estilo de conducción.
- Control del reposo del vehículo y cálculo de pérdidas por drenaje vampírico (% y kWh por día).

### 2. ⚡ Carga
- Detección automática de Supercharger (hasta 250 kW) o cargador doméstico en corriente alterna (AC).
- Curva eléctrica en tiempo real: Potencia (kW), Tensión (V) e Intensidad (A).
- Historial completo de recargas con cálculo automático de coste estimado en euros (€).

### 3. 🧭 Trayectos
- Registro cronológico de todos tus viajes (fecha, origen, destino, km, duración y consumo en Wh/km).
- Visor de mapas interactivo con **OpenStreetMap (Leaflet)**.
- Traza de ruta coloreada según la potencia:
  - 🟢 **Verde:** Freno regenerativo recuperando energía hacia la batería.
  - 🔵 **Cian:** Velocidad de crucero eficiente.
  - 🔴 **Rojo:** Alta demanda de aceleración.
- Selector de 3 capas gratuitas (OpenStreetMap, Modo Oscuro, Satélite Esri).
- Botón **"Abrir mapa"** para exportar la ubicación a tu app de navegación favorita (OsmAnd, Organic Maps, Google Maps, Waze).

### 4. 🎛️ Comandos del Vehículo
- Control remoto directo mediante la API de Tesla:
  - 🔒 / 🔓 Bloqueo y desbloqueo de puertas.
  - 🔥 Climatización On / Off (fijar habitáculo a 21°C).
  - 💡 Ráfaga de faros y 🔊 Claxon.
  - 📦 Apertura de maletero delantero (*Frunk*) y trasero (*Trunk*).
  - 🛡️ Activación y desactivación del **Modo Centinela (*Sentry Mode*)**.

### 5. 📊 Análisis de Batería
- Cálculo del estado de salud de la batería (*State of Health* - SoH).
- Capacidad nominal utilizable actual frente a la capacidad original de fábrica.
- Tabla histórica de degradación vs. kilometraje y proyección del umbral de garantía (80%).

### 6. 🔖 Guardar Rutas
- Grabadora GPS en tiempo real para registrar nuevos recorridos punto a punto.
- Catálogo de rutas favoritas para consultar trayectos habituales y comparar eficiencias.

---

## 🔒 Privacidad, Google Drive y Exportación CSV

### ☁️ Copia de Seguridad y "Liberar Espacio" (Google Drive)
Al pulsar el icono de la nube (**☁️**) en la cabecera superior:
- **Copia de seguridad completa:** Genera y restaura copias en formato JSON que puedes guardar en tu Google Drive personal para migrar a un nuevo teléfono móvil.
- **Liberar Espacio en el Móvil:** Empaqueta los puntos GPS detallados de viajes antiguos (>30 días) para almacenarlos en Google Drive y los limpia del móvil, **conservando en tu teléfono el resumen, kilómetros, consumos y fechas de todos tus viajes**.

### 📥 Exportación Universal a CSV
Al pulsar el icono de descarga (**📥**) en la cabecera superior:
- Exporta en archivos CSV estándar (formato RFC 4180 con UTF-8 BOM, compatible de forma nativa con Microsoft Excel, LibreOffice y Google Sheets):
  - `Tesla_Viajes.csv`
  - `Tesla_Recargas.csv`
  - `Tesla_Telemetria_GPS.csv`
  - `Tesla_Salud_Bateria.csv`

---

## 🛠️ Guía Paso a Paso para Compilar el APK en Android Studio

Sigue estos sencillos pasos para compilar e instalar la aplicación en cualquier teléfono Android:

### Requisitos Previos:
- **Android Studio** instalado en tu ordenador (Ladybug / Iguana / Giraffe o superior).
- **JDK 17 o JDK 21** configurado (recomendado Eclipse Temurin 21 o el OpenJDK que incluye Android Studio).
- **Node.js** v18+ y **npm** instalados.

---

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/cast0rtech/Jariza.git
cd Jariza
```

### Paso 2: Instalar dependencias y preparar los recursos web
En la raíz del proyecto, ejecuta:
```bash
# 1. Instalar dependencias de Node
npm install

# 2. Compilar la aplicación web (React + Vite)
npm run build

# 3. Sincronizar el proyecto nativo de Android con Capacitor
npx cap sync android
```

### Paso 3: Abrir el proyecto en Android Studio
1. Inicia **Android Studio**.
2. En la ventana principal, haz clic en **Open** (Abrir).
3. Navega hasta la carpeta del proyecto y selecciona la subcarpeta `android`:
   ```
   C:\...\Jariza\android
   ```
4. Haz clic en **OK**. Android Studio comenzará a cargar el proyecto y a indexar los archivos.

### Paso 4: Verificar la versión de Java en Android Studio
Para evitar incompatibilidades de versión:
1. En Android Studio, ve al menú superior:  
   **File** > **Settings** (en Windows/Linux) o **Android Studio** > **Settings** (en macOS).
2. En el panel lateral izquierdo, navega hasta:  
   **Build, Execution, Deployment** > **Build Tools** > **Gradle**.
3. En el desplegable **Gradle JDK**, asegúrate de tener seleccionado **Java 17** o **Java 21** (o el runtime embebido `jbr-21` / `Temurin-21`).
4. Haz clic en **Apply** y **OK**.

### Paso 5: Sincronizar Gradle
1. En la esquina superior derecha de Android Studio, pulsa el botón del elefante con una flecha azul: **"Sync Project with Gradle Files"**.
2. Espera a que la barra inferior indique `BUILD SUCCESSFUL`.

### Paso 6: Compilar el archivo APK
1. En la barra de menús superior, selecciona:  
   **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
2. Android Studio comenzará a compilar el proyecto. Esto puede tardar entre 1 y 3 minutos en la primera ocasión.
3. Una vez finalizado, aparecerá una notificación emergente en la esquina inferior derecha:
   > **APK(s) generated successfully for 1 module.**  
   > `locate`
4. Haz clic sobre la palabra azul **locate**.

### Paso 7: Ubicación del archivo APK generado
Se abrirá automáticamente el explorador de archivos mostrando tu archivo instalable:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## ⚡ Compilación Rápida por Consola / Terminal

Si prefieres compilar directamente desde PowerShell o la terminal sin necesidad de abrir la interfaz gráfica de Android Studio:

```powershell
# 1. Compilar los archivos web y sincronizar con Capacitor
npm run build
npx cap sync android

# 2. Entrar en la carpeta de Android y ejecutar Gradle
cd android
.\gradlew.bat assembleDebug
```

El archivo APK se generará inmediatamente en:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📲 Instalación en el Dispositivo Móvil

1. **Transferir el APK:**  
   Envía el archivo `app-debug.apk` a tu teléfono Android (por cable USB, enviándotelo por Google Drive, Telegram o WhatsApp Web).
2. **Habilitar orígenes desconocidos:**  
   Si es la primera vez que instalas un APK externo, Android te pedirá confirmar el permiso *"Permitir instalación de aplicaciones de fuentes desconocidas"*. Acéptalo.
3. **Abrir la app:**  
   Toca el archivo para instalarlo. Verás el icono nativo verde de **castor_tech** en tu menú de aplicaciones.

---

## 🎨 Icono de la Aplicación (`castor_tech`)

La app incluye el logotipo oficial de **castor_tech** con el enchufe verde inferior y tipografía gótica en todas las resoluciones nativas de pantalla de Android:
- `mipmap-mdpi` (48x48 px)
- `mipmap-hdpi` (72x72 px)
- `mipmap-xhdpi` (96x96 px)
- `mipmap-xxhdpi` (144x144 px)
- `mipmap-xxxhdpi` (192x192 px)
- Soporte para **Adaptive Icons** modernos de Android 8+ (`ic_launcher_foreground.png`).

---

## 💻 Tecnologías Utilizadas

- **Frontend:** React 19, TypeScript, Tailwind CSS.
- **Motor Móvil Híbrido:** Capacitor 7.
- **Base de Datos Local:** Dexie.js (IndexedDB nativo en el navegador y WebView).
- **Mapas:** Leaflet con teselas de **OpenStreetMap** (100% gratuitas y libres de claves de API).
- **Iconografía:** Lucide React.
- **Herramienta de Construcción:** Vite 6, Gradle 8.11, Android SDK 35.

---

<p align="center">
  Desarrollado con ❤️ para la comunidad Tesla por <b>castor_tech</b>
</p>
