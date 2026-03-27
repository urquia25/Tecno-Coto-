export interface SecretCode {
  code: string;
  description: string;
  category: 'Información' | 'Pruebas' | 'Configuración';
}

export const SECRET_CODES: SecretCode[] = [
  { code: "*#06#", description: "Muestra el número IMEI del dispositivo.", category: "Información" },
  { code: "*#*#4636#*#*", description: "Menú de prueba: Información del teléfono, estadísticas de uso y Wi-Fi.", category: "Pruebas" },
  { code: "*#*#232339#*#*", description: "Prueba de velocidad de Wi-Fi.", category: "Pruebas" },
  { code: "*#*#0842#*#*", description: "Prueba de vibración y retroiluminación.", category: "Pruebas" },
  { code: "*#*#2664#*#*", description: "Prueba de la pantalla táctil.", category: "Pruebas" },
  { code: "*#*#34971539#*#*", description: "Información detallada sobre la cámara.", category: "Información" },
  { code: "*#*#1111#*#*", description: "Versión de software FTA (Software Version).", category: "Información" },
  { code: "*#*#1234#*#*", description: "Versión de firmware (PDA y Phone).", category: "Información" },
  { code: "*#*#44336#*#*", description: "Fecha de compilación y lista de cambios.", category: "Información" },
  { code: "*#*#7780#*#*", description: "Restablecimiento de datos de fábrica (Solo partición de datos).", category: "Configuración" },
  { code: "*2767*3855#", description: "Formateo completo de fábrica (¡Cuidado! Borra todo).", category: "Configuración" },
  { code: "*#*#7594#*#*", description: "Cambiar el comportamiento del botón de encendido.", category: "Configuración" },
];

export interface ProcessInfo {
  appName: string;
  packageName: string;
  uid: number;
  importanceLevel: string;
  isSystemApp: boolean;
  cpuUsage: number;
  memoryUsage: number;
  riskLevel: 'Seguro' | 'Sospechoso' | 'Crítico';
  riskReason?: string;
  description: string;
  permissions: string[];
}
// ... rest of MOCK_PROCESSES remains the same

export const MOCK_PROCESSES: ProcessInfo[] = [
  {
    appName: "Interfaz de Sistema",
    packageName: "com.android.systemui",
    uid: 1000,
    importanceLevel: "Primer Plano",
    isSystemApp: true,
    cpuUsage: 1.2,
    memoryUsage: 124,
    riskLevel: 'Seguro',
    description: "Componente esencial de Android que gestiona la barra de estado, notificaciones y la navegación del sistema.",
    permissions: ["Sistema", "Notificaciones", "Superposición"]
  },
  {
    appName: "Servicios de Google Play",
    packageName: "com.google.android.gms",
    uid: 10010,
    importanceLevel: "Servicio",
    isSystemApp: true,
    cpuUsage: 0.8,
    memoryUsage: 256,
    riskLevel: 'Seguro',
    description: "Servicios de infraestructura para aplicaciones de Google y de terceros. Gestiona autenticación y mapas.",
    permissions: ["Ubicación", "Contactos", "Archivos"]
  },
  {
    appName: "Facebook Services",
    packageName: "com.facebook.services",
    uid: 10245,
    importanceLevel: "Segundo Plano",
    isSystemApp: false,
    cpuUsage: 0.5,
    memoryUsage: 89,
    riskLevel: 'Sospechoso',
    riskReason: "Se detectaron patrones de telemetría (análisis/métricas) constantes.",
    description: "Servicio de soporte para aplicaciones de la familia Meta. A menudo recopila datos de uso en segundo plano.",
    permissions: ["Internet", "Identidad", "Ubicación"]
  },
  {
    appName: "Daemon de Rastreo",
    packageName: "com.unknown.tracker.daemon",
    uid: 10567,
    importanceLevel: "Segundo Plano",
    isSystemApp: false,
    cpuUsage: 2.4,
    memoryUsage: 45,
    riskLevel: 'Crítico',
    riskReason: "Alto consumo de recursos con conexión a servidores de análisis no identificados.",
    description: "Proceso no identificado que parece rastrear la actividad del usuario sin consentimiento explícito.",
    permissions: ["Internet", "Cámara", "Micrófono", "Contactos"]
  },
  {
    appName: "Google Play Store",
    packageName: "com.android.vending",
    uid: 10016,
    importanceLevel: "Servicio",
    isSystemApp: true,
    cpuUsage: 0.1,
    memoryUsage: 67,
    riskLevel: 'Seguro',
    description: "Tienda oficial de aplicaciones de Android. Gestiona actualizaciones e instalaciones.",
    permissions: ["Instalar Apps", "Notificaciones"]
  },
  {
    appName: "Firefox",
    packageName: "org.mozilla.firefox",
    uid: 10890,
    importanceLevel: "Primer Plano",
    isSystemApp: false,
    cpuUsage: 5.6,
    memoryUsage: 512,
    riskLevel: 'Seguro',
    description: "Navegador web centrado en la privacidad. El alto consumo es normal durante la navegación activa.",
    permissions: ["Internet", "Cámara", "Micrófono"]
  },
  {
    appName: "TikTok Metrics",
    packageName: "com.tiktok.app.metrics",
    uid: 10999,
    importanceLevel: "Segundo Plano",
    isSystemApp: false,
    cpuUsage: 1.1,
    memoryUsage: 120,
    riskLevel: 'Sospechoso',
    riskReason: "Envío continuo de reportes de telemetría incluso cuando la app principal está cerrada.",
    description: "Módulo de análisis de datos para TikTok. Recopila información sobre el comportamiento del usuario.",
    permissions: ["Internet", "Identidad", "Ubicación"]
  }
];
