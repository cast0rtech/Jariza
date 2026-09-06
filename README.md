# ⚡ Tesla Local Stats (castor_tech)

<p align="center">
  <img src="public/logo.png" alt="castor_tech Logo" width="140" />
</p>

<p align="center">
  <b>Local-first Tesla Vehicle Telemetry, Diagnostics & Analytics for Android</b><br>
  <i>A 100% private, local alternative to Stats for Tesla, Tessie, and TeslaMate — with zero tracking servers, no subscriptions, and free OpenStreetMap maps.</i>
</p>

<p align="center">
  <a href="#-tesla-local-stats-castor_tech---english"><b>🇬🇧 English Documentation</b></a> • 
  <a href="#-tesla-local-stats-castor_tech---español"><b>🇪🇸 Documentación en Español</b></a>
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

# 🇬🇧 Tesla Local Stats (castor_tech) - English

## 📖 Table of Contents (EN)
1. [Overview](#-overview)
2. [The 6 Main Dashboard Menus](#-the-6-main-dashboard-menus)
3. [Privacy, Google Drive & CSV Export](#-privacy-google-drive--csv-export)
4. [Step-by-Step Guide: Compile APK in Android Studio](#-step-by-step-guide-compile-apk-in-android-studio)
5. [Fast Terminal / Command-Line Compilation](#-fast-terminal--command-line-compilation)
6. [Installing the APK on Your Android Device](#-installing-the-apk-on-your-android-device)
7. [App Branding & Custom Icon](#-app-branding--custom-icon)
8. [Technology Stack](#-technology-stack)

---

## 🌟 Overview

**Tesla Local Stats** is an open-source, mobile-first Android application designed for Tesla owners who want complete ownership over their driving and telemetry data. 

Unlike commercial alternatives that require ongoing subscriptions and stream sensitive GPS breadcrumbs to remote third-party cloud servers, **Tesla Local Stats**:
- **Runs 100% Locally:** All telemetry, charging sessions, and drives are saved directly into your device's internal storage via IndexedDB (powered by Dexie.js).
- **Direct Tesla API Connectivity:** Connects directly from your Android phone to Tesla's official vehicle API endpoints.
- **Sleep Watchdog (Anti-Vampire Drain):** Automatically suspends background polling 15 minutes after parking, allowing the vehicle's onboard computers to enter deep sleep without draining the 12V or main traction battery.
- **100% Free Maps (No API Keys Required):** Interactive maps powered by **OpenStreetMap** (Leaflet) with street view, dark mode, and high-resolution Esri satellite imagery — zero Google Maps billing or API keys needed.
- **Optional Google Drive Sync & Storage Freeing:** Archive older trip GPS coordinates to your personal Google Drive to free up phone storage while keeping all summary statistics on the phone.

---

## 📱 The 6 Main Dashboard Menus

The main screen features a live vehicle telemetry pill (*Millennium Falcon - Model Y*), real-time status (*Asleep*, *Driving*, *Charging*), and quick navigation to all **6 core modules**:

```
┌─────────────────────────────────────────────────────────────┐
│ 🚗 Millennium Falcon (Model Y)  [🌙 Asleep]     🔄 ☁️ 📥 ⚙️ │
│ 76% (403 km) • 43,280 km • 21°C interior / 19°C exterior     │
├─────────────────────────────────────────────────────────────┤
│                         MAIN MENUS                          │
│                                                             │
│  [🔋 Battery]                [⚡ Charging]                   │
│   SOC level, range & sleep     Sessions, curves & costs (€) │
│                                                             │
│  [🧭 Drives]                 [🎛️ Vehicle Commands]         │
│   History & OSM map viewer     Locks, climate, lights, etc. │
│                                                             │
│  [📊 Battery Health]         [🔖 Saved Routes]              │
│   Cell health & degradation    Live recorder & free maps    │
└─────────────────────────────────────────────────────────────┘
```

### 1. 🔋 Battery
- Real-time State of Charge (SOC %) circular gauge.
- Rated (WLTP/EPA) range vs. actual estimated range adjusted for driving habits and ambient temperature.
- Vampire drain watchdog tracking daily and hourly kWh/% loss while parked.

### 2. ⚡ Charging
- Automatic detection of DC Superchargers (up to 250 kW) vs. Level 2 AC home chargers (7.4 kW / 11 kW).
- Live electrical graph: Power (kW), Voltage (V), and Current (A).
- Historical session log with duration, added energy, and automated **charging cost calculations in euros (€)**.

### 3. 🧭 Drives
- Chronological drive history with start/finish addresses, mileage, duration, and efficiency in **Wh/km**.
- Dynamic Leaflet **OpenStreetMap** viewer with colored power gradient polylines:
  - 🟢 **Green:** Regenerative braking returning energy back into the pack.
  - 🔵 **Cyan:** Smooth, efficient highway cruising.
  - 🔴 **Red:** Heavy acceleration and high-power draw.
- Multi-layer toggle: **OpenStreetMap**, **Dark Mode**, and **High-Resolution Satellite**.
- **"Open Map"** launcher to pass coordinates directly to native Android navigation apps (**Google Maps, OsmAnd, Organic Maps, Waze**).

### 4. 🎛️ Vehicle Commands
- Remote control triggers communicating directly with the vehicle:
  - 🔒 / 🔓 Lock and unlock doors.
  - 🔥 Climate Control On / Off (preset to 21°C).
  - 💡 Flash headlights and 🔊 honk horn.
  - 📦 Actuate front trunk (*Frunk*) and rear liftgate (*Trunk*).
  - 🛡️ Toggle **Sentry Mode** security system.

### 5. 📊 Battery Health & Diagnostics
- Battery State of Health (SoH) monitoring (nominal remaining 74.9 kWh vs. original 78.1 kWh = **95.9% health**).
- Historical degradation milestones (50 km, 12,000 km, 24,000 km, 43,280 km).
- Long-term cell longevity projection towards the 80% warranty threshold.

### 6. 🔖 Saved Routes
- Live GPS route recording engine to capture custom journeys point-by-point.
- Favorite route repository to benchmark recurring commutes and efficiency.

---

## 🔒 Privacy, Google Drive & CSV Export

### ☁️ Cloud Backup & "Free Up Storage" Feature
Accessed via the cloud icon (**☁️**) in the top header:
- **Full Database Backup (JSON):** Export or restore your entire database when migrating to a new phone.
- **"Free Up Storage" Tool:** Packages detailed GPS breadcrumbs for trips older than 30 days into a compressed archive for Google Drive and removes the raw points from local storage, **preserving all high-level drive summaries, energy figures, and dates on your phone**.

### 📥 Universal CSV Exporter
Accessed via the download icon (**📥**) in the top header:
- Exports compliant RFC 4180 CSV files with UTF-8 Byte Order Mark (BOM) for seamless viewing in Microsoft Excel, LibreOffice, and Google Sheets:
  - `Tesla_Drives.csv`
  - `Tesla_Charges.csv`
  - `Tesla_GPS_Telemetry.csv`
  - `Tesla_Battery_Health.csv`

---

## 🛠️ Step-by-Step Guide: Compile APK in Android Studio

Follow these steps to build the native Android `.apk` package:

### Prerequisites:
- **Android Studio** (Ladybug, Iguana, Hedgehog, or newer).
- **JDK 17 or JDK 21** installed (e.g., Eclipse Temurin 21 or Android Studio's built-in JBR).
- **Node.js** (v18+) and **npm**.

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/cast0rtech/Jariza.git
cd Jariza
```

### Step 2: Install Node Dependencies & Build Web Bundle
In the project root folder, run:
```bash
# 1. Install packages
npm install

# 2. Compile React + Vite production build
npm run build

# 3. Synchronize assets to the native Android platform
npx cap sync android
```

### Step 3: Open the Android Folder in Android Studio
1. Launch **Android Studio**.
2. Click **Open** on the welcome screen (or go to `File > Open...`).
3. Select the `android` subfolder inside the project:
   ```
   C:\...\Jariza\android
   ```
4. Click **OK**. Android Studio will begin indexing the Gradle project.

### Step 4: Configure the Gradle JDK in Android Studio
To ensure Gradle uses a compatible Java runtime:
1. In Android Studio, open:  
   **File** > **Settings** (Windows/Linux) or **Android Studio** > **Settings** (macOS).
2. In the left panel, navigate to:  
   **Build, Execution, Deployment** > **Build Tools** > **Gradle**.
3. Under **Gradle JDK**, choose **Java 17** or **Java 21** (such as `Temurin-21` or the bundled `jbr-21`).
4. Click **Apply** and **OK**.

### Step 5: Sync Gradle
1. In the upper right corner, click the **"Sync Project with Gradle Files"** button (elephant icon with blue arrow).
2. Wait for the sync to finish with `BUILD SUCCESSFUL`.

### Step 6: Compile the Debug APK
1. In the top application menu bar, click:  
   **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
2. Gradle will assemble and sign the debug APK.
3. Upon completion, a notification will pop up in the lower right corner:  
   > **APK(s) generated successfully for 1 module.**  
   > `locate`
4. Click the blue **locate** link.

### Step 7: Locate the Output APK File
The operating system file manager will open pointing directly to:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## ⚡ Fast Terminal / Command-Line Compilation

If you prefer building directly from PowerShell or Terminal without opening the Android Studio GUI:

```powershell
# 1. Build web distribution and sync Capacitor
npm run build
npx cap sync android

# 2. Navigate to android folder and invoke Gradle wrapper
cd android
.\gradlew.bat assembleDebug
```

The APK is produced at:  
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📲 Installing the APK on Your Android Device

1. **Transfer the APK:**  
   Transfer `app-debug.apk` to your phone via USB cable, Google Drive, WhatsApp Web, or Telegram.
2. **Allow Unknown Sources:**  
   When opening the file for the first time, Android will prompt for permission to *"Install unknown apps"*. Allow it for your file manager or browser.
3. **Launch the App:**  
   Tap **Install**. You will see the green **castor_tech** icon on your home screen or app drawer ready to launch!

---

## 🎨 App Branding & Custom Icon

The app includes the official **castor_tech** logo featuring the green circular border, bottom electrical plug, and gothic typography across all Android screen densities:
- `mipmap-mdpi` (48x48 px)
- `mipmap-hdpi` (72x72 px)
- `mipmap-xhdpi` (96x96 px)
- `mipmap-xxhdpi` (144x144 px)
- `mipmap-xxxhdpi` (192x192 px)
- Full support for modern Android 8+ **Adaptive Icons** (`ic_launcher_foreground.png`).

---

## 💻 Technology Stack

- **Frontend Framework:** React 19, TypeScript, Tailwind CSS.
- **Mobile Runtime:** Capacitor 7 (Android native bridge).
- **Local Storage Engine:** Dexie.js (IndexedDB wrapper).
- **Mapping:** Leaflet with standard **OpenStreetMap**, Dark Mode & Esri Satellite tiles (100% free, zero API key dependencies).
- **Icons:** Lucide React.
- **Build System:** Vite 6, Gradle 8.11, Android SDK 35.

---

<br/>

---

# 🇪🇸 Tesla Local Stats (castor_tech) - Español

## 📖 Índice (ES)
1. [Descripción General](#-descripción-general-es)
2. [Los 6 Menús Principales](#-los-6-menús-principales-es)
3. [Privacidad, Google Drive y Exportación CSV](#-privacidad-google-drive-y-exportación-csv-es)
4. [Guía Paso a Paso para Compilar el APK en Android Studio](#-guía-paso-a-paso-para-compilar-el-apk-en-android-studio-es)
5. [Compilación Rápida por Consola / Terminal](#-compilación-rápida-por-consola--terminal-es)
6. [Instalación en el Dispositivo Móvil](#-instalación-en-el-dispositivo-móvil-es)
7. [Personalización e Icono castor_tech](#-personalización-e-icono-castor_tech)
8. [Tecnologías Utilizadas](#-tecnologías-utilizadas-es)

---

## 🌟 Descripción General (ES)

**Tesla Local Stats** es una aplicación diseñada para propietarios de vehículos Tesla que desean el máximo control sobre sus datos de telemetría y consumo sin depender de servicios de terceros en la nube. 

A diferencia de otras apps del mercado, **Tesla Local Stats**:
- **Almacenamiento 100% Local:** Todos tus trayectos, sesiones de carga y datos de batería se guardan directamente en el almacenamiento interno de tu móvil (mediante IndexedDB con Dexie.js).
- **Sin Cuotas ni Servidores Centrales:** Conexión directa desde tu teléfono a la API oficial de Tesla.
- **Protector contra Drenaje Fantasma (*Sleep Watchdog*):** Suspende las consultas pesadas tras 15 minutos con el coche estacionado para permitir que entre en reposo profundo (*deep sleep*) y no agotar la batería de 12V ni del pack.
- **Mapas 100% Gratuitos y Sin Claves:** Visualización de rutas con **OpenStreetMap**, con opción de mapa estándar, modo oscuro y fotografía de satélite de alta resolución sin necesidad de ninguna clave de API de Google Maps.
- **Copia Opcional en Google Drive:** Función para hacer backup de tus datos y **"Liberar Espacio en el Móvil"** archivando rutas antiguas en tu propia nube personal de Google.

---

## 📱 Los 6 Menús Principales (ES)

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
- Capacidad nominal utilizable actual frente a la capacidad original de fábrica (95.9% de salud restante).
- Tabla histórica de degradación vs. kilometraje y proyección del umbral de garantía (80%).

### 6. 🔖 Guardar Rutas
- Grabadora GPS en tiempo real para registrar nuevos recorridos punto a punto.
- Catálogo de rutas favoritas para consultar trayectos habituales y comparar eficiencias.

---

## 🔒 Privacidad, Google Drive y Exportación CSV (ES)

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

## 🛠️ Guía Paso a Paso para Compilar el APK en Android Studio (ES)

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

## ⚡ Compilación Rápida por Consola / Terminal (ES)

Si prefieres compilar directamente desde PowerShell o la terminal:

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

## 📲 Instalación en el Dispositivo Móvil (ES)

1. **Transferir el APK:**  
   Envía el archivo `app-debug.apk` a tu teléfono Android (por cable USB, enviándotelo por Google Drive, Telegram o WhatsApp Web).
2. **Habilitar orígenes desconocidos:**  
   Si es la primera vez que instalas un APK externo, Android te pedirá confirmar el permiso *"Permitir instalación de aplicaciones de fuentes desconocidas"*. Acéptalo.
3. **Abrir la app:**  
   Toca el archivo para instalarlo. Verás el icono nativo verde de **castor_tech** en tu menú de aplicaciones.

---

## 🎨 Personalización e Icono castor_tech

La app incluye el logotipo oficial de **castor_tech** con el enchufe verde inferior y tipografía gótica en todas las resoluciones nativas de pantalla de Android:
- `mipmap-mdpi` (48x48 px)
- `mipmap-hdpi` (72x72 px)
- `mipmap-xhdpi` (96x96 px)
- `mipmap-xxhdpi` (144x144 px)
- `mipmap-xxxhdpi` (192x192 px)
- Soporte para **Adaptive Icons** modernos de Android 8+ (`ic_launcher_foreground.png`).

---

## 💻 Tecnologías Utilizadas (ES)

- **Frontend:** React 19, TypeScript, Tailwind CSS.
- **Motor Móvil Híbrido:** Capacitor 7.
- **Base de Datos Local:** Dexie.js (IndexedDB nativo en el navegador y WebView).
- **Mapas:** Leaflet con teselas de **OpenStreetMap** (100% gratuitas y libres de claves de API).
- **Iconografía:** Lucide React.
- **Herramienta de Construcción:** Vite 6, Gradle 8.11, Android SDK 35.

---

<p align="center">
  Developed with ❤️ for the Tesla community by <b>castor_tech</b>
</p>
