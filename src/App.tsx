import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Activity, 
  Settings, 
  Info, 
  Search, 
  Cpu, 
  Database,
  Lock,
  Unlock,
  RefreshCw,
  ExternalLink,
  X,
  AlertTriangle,
  Key,
  Wrench,
  Hash,
  ChevronRight,
  AlertCircle,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { ProcessInfo, MOCK_PROCESSES, SECRET_CODES, SecretCode } from './types';

export default function App() {
  const [processes, setProcesses] = useState<ProcessInfo[]>(MOCK_PROCESSES);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<ProcessInfo | null>(null);
  const [vpnActive, setVpnActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'monitor' | 'tools'>('monitor');

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setProcesses([...MOCK_PROCESSES].sort(() => Math.random() - 0.5));
    }, 2500);
  };

  const filteredProcesses = processes.filter(p => 
    p.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.appName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Seguro': return 'text-emerald-400';
      case 'Sospechoso': return 'text-amber-400';
      case 'Crítico': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getRiskBg = (level: string) => {
    switch (level) {
      case 'Seguro': return 'bg-emerald-500/10 border-emerald-500/20';
      case 'Sospechoso': return 'bg-amber-500/10 border-amber-500/20';
      case 'Crítico': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 p-4 md:p-8 font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Shield className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">DroidGuard AI</h1>
            <p className="text-slate-500 text-sm font-medium">Monitor de Privacidad del Sistema</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            <button 
              onClick={() => setActiveTab('monitor')}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                activeTab === 'monitor' ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-500 hover:text-slate-300"
              )}
            >
              Monitor
            </button>
            <button 
              onClick={() => setActiveTab('tools')}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                activeTab === 'tools' ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-500 hover:text-slate-300"
              )}
            >
              Herramientas
            </button>
          </div>
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500",
            vpnActive ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "bg-slate-800/50 border-slate-700 text-slate-500"
          )}>
            {vpnActive ? <Lock size={16} /> : <Unlock size={16} />}
            <span className="text-[10px] font-bold uppercase tracking-wider">Cortafuegos {vpnActive ? 'Activo' : 'Inactivo'}</span>
            <button 
              onClick={() => setVpnActive(!vpnActive)}
              className={cn(
                "ml-2 w-8 h-4 rounded-full relative transition-colors duration-300",
                vpnActive ? "bg-blue-500" : "bg-slate-700"
              )}
            >
              <div className={cn(
                "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-300",
                vpnActive ? "left-4.5" : "left-0.5"
              )} />
            </button>
          </div>
        </div>
      </header>

      {activeTab === 'monitor' ? (
        <>
          {/* Stats Grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="glass-card p-6 rounded-3xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Procesos Activos</p>
                <p className="text-2xl font-mono font-bold text-white">{processes.length}</p>
              </div>
            </div>
            <div className="glass-card p-6 rounded-3xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <ShieldAlert size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Riesgos Detectados</p>
                <p className="text-2xl font-mono font-bold text-white">
                  {processes.filter(p => p.riskLevel !== 'Seguro').length}
                </p>
              </div>
            </div>
            <div className="glass-card p-6 rounded-3xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Estado del Sistema</p>
                <p className="text-2xl font-bold text-white">Protegido</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="max-w-5xl mx-auto">
            <div className="glass-card rounded-[2rem] overflow-hidden relative">
              {isScanning && <div className="scan-line" />}
              
              <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Filtrar por nombre o paquete..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleScan}
                  disabled={isScanning}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <RefreshCw className={cn("w-4 h-4", isScanning && "animate-spin")} />
                  {isScanning ? 'Escaneando...' : 'Escaneo Profundo'}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold border-b border-white/5">
                      <th className="px-6 py-4">Aplicación / Paquete</th>
                      <th className="px-6 py-4">UID</th>
                      <th className="px-6 py-4">Uso de Recursos</th>
                      <th className="px-6 py-4">Nivel de Riesgo</th>
                      <th className="px-6 py-4 text-right">Detalles</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredProcesses.map((process, idx) => (
                      <motion.tr 
                        key={process.packageName}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                        onClick={() => setSelectedProcess(process)}
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center",
                              process.isSystemApp ? "bg-slate-800 text-slate-400" : "bg-blue-500/10 text-blue-400"
                            )}>
                              {process.isSystemApp ? <Settings size={14} /> : <Activity size={14} />}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white truncate max-w-[200px]">{process.appName}</p>
                              <p className="text-[10px] text-slate-500 font-mono truncate max-w-[180px]">{process.packageName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-xs font-mono text-slate-400">{process.uid}</span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <Cpu size={12} className="text-slate-500" />
                              <span className="text-xs font-mono">{process.cpuUsage}%</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Database size={12} className="text-slate-500" />
                              <span className="text-xs font-mono">{process.memoryUsage}MB</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider",
                            getRiskBg(process.riskLevel),
                            getRiskColor(process.riskLevel)
                          )}>
                            <div className={cn("w-1.5 h-1.5 rounded-full", process.riskLevel === 'Seguro' ? 'bg-emerald-400' : process.riskLevel === 'Sospechoso' ? 'bg-amber-400' : 'bg-red-400')} />
                            {process.riskLevel}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-all">
                            <Info size={18} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </>
      ) : (
        <main className="max-w-5xl mx-auto space-y-8">
          {/* Guía de Detención de Procesos Críticos */}
          <section className="glass-card rounded-[2.5rem] p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400">
                <AlertCircle size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Guía de Detención: Archivos Críticos</h2>
                <p className="text-slate-500 text-sm">Pasos seguros para manejar amenazas en el sistema</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-blue-400 shrink-0 border border-white/10">1</div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <span className="font-bold text-white">Identificación:</span> Verifica si el proceso es de "Usuario" o "Sistema". Los procesos de sistema con UID &lt; 10000 son críticos.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-blue-400 shrink-0 border border-white/10">2</div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <span className="font-bold text-white">Forzar Detención:</span> Para apps de usuario sospechosas, ve a <span className="italic">Ajustes &gt; Aplicaciones</span> y selecciona "Forzar detención".
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-blue-400 shrink-0 border border-white/10">3</div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <span className="font-bold text-white">Inhabilitación:</span> Si la app no se puede desinstalar, intenta "Inhabilitar" para que no se ejecute al inicio.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-blue-400 shrink-0 border border-white/10">4</div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <span className="font-bold text-white">Modo Seguro:</span> Si el proceso persiste, reinicia en "Modo Seguro" para evitar que apps de terceros se carguen.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-blue-400 shrink-0 border border-white/10">5</div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <span className="font-bold text-white">Servicio Técnico:</span> Para procesos de sistema infectados, se recomienda un <span className="text-amber-400">Reflasheo de Firmware</span> oficial.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Herramientas de Servicio (Códigos Secretos) */}
          <section className="glass-card rounded-[2.5rem] p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Terminal size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Códigos de Servicio Técnico</h2>
                <p className="text-slate-500 text-sm">Herramientas de diagnóstico para soporte técnico</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SECRET_CODES.map((item, idx) => (
                <motion.div 
                  key={item.code}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.08] transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <code className="text-blue-400 font-mono font-bold text-lg tracking-wider">{item.code}</code>
                    <span className={cn(
                      "text-[8px] font-bold uppercase px-2 py-0.5 rounded-md border",
                      item.category === 'Información' ? "border-blue-500/30 text-blue-400 bg-blue-500/5" :
                      item.category === 'Pruebas' ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5" :
                      "border-red-500/30 text-red-400 bg-red-500/5"
                    )}>
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-3">
              <AlertTriangle size={18} className="text-amber-400 shrink-0" />
              <p className="text-[10px] text-slate-400 leading-relaxed">
                <span className="font-bold text-amber-400 uppercase">Advertencia:</span> Algunos códigos pueden variar según el fabricante (Samsung, Xiaomi, etc.) o la versión de Android. Úselos con precaución bajo supervisión técnica.
              </p>
            </div>
          </section>
        </main>
      )}

      {/* Modal de Detalles */}
      <AnimatePresence>
        {selectedProcess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProcess(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-card rounded-[2.5rem] p-8 overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProcess(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center",
                  selectedProcess.riskLevel === 'Seguro' ? 'bg-emerald-500/10 text-emerald-400' : 
                  selectedProcess.riskLevel === 'Sospechoso' ? 'bg-amber-500/10 text-amber-400' : 
                  'bg-red-500/10 text-red-400'
                )}>
                  {selectedProcess.riskLevel === 'Seguro' ? <ShieldCheck size={28} /> : <ShieldAlert size={28} />}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedProcess.appName}</h2>
                  <p className={cn("text-sm font-medium", getRiskColor(selectedProcess.riskLevel))}>
                    Análisis de Riesgo: {selectedProcess.riskLevel}
                  </p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                {/* Descripción Detallada */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Info size={14} className="text-blue-400" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Descripción de la Aplicación</p>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedProcess.description}
                  </p>
                </div>

                {/* Motivo del Riesgo */}
                {selectedProcess.riskReason && (
                  <div className={cn("rounded-2xl p-5 border", getRiskBg(selectedProcess.riskLevel))}>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle size={14} className={getRiskColor(selectedProcess.riskLevel)} />
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Informe de Inteligencia Artificial</p>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed font-medium italic">
                      "{selectedProcess.riskReason}"
                    </p>
                  </div>
                )}

                {/* Permisos */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <Key size={14} className="text-blue-400" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Permisos Solicitados</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProcess.permissions.map(perm => (
                      <span key={perm} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-slate-400 font-medium">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Paquete</p>
                    <p className="text-xs font-mono text-white truncate">{selectedProcess.packageName}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Tipo de App</p>
                    <p className="text-sm font-bold text-white">{selectedProcess.isSystemApp ? 'Sistema' : 'Usuario'}</p>
                  </div>
                </div>

                {selectedProcess.isSystemApp && (
                  <div className="bg-blue-500/5 rounded-2xl p-4 border border-blue-500/10 flex gap-3">
                    <Lock size={18} className="text-blue-400 shrink-0" />
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Esta aplicación es parte crítica del sistema Android. Por seguridad, no se puede desactivar manualmente para evitar fallos globales.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  disabled={selectedProcess.isSystemApp}
                  className={cn(
                    "w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all",
                    selectedProcess.isSystemApp 
                      ? "bg-slate-800 text-slate-600 cursor-not-allowed" 
                      : "bg-white text-black hover:bg-slate-200 active:scale-95 shadow-lg shadow-white/5"
                  )}
                >
                  <ExternalLink size={16} />
                  Ir a Ajustes para Desactivar o Ajustar Permisos
                </button>
                <p className="text-[10px] text-slate-500 text-center px-4">
                  Al hacer clic, serás redirigido a la configuración de Android para esta aplicación específica.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Botón Flotante */}
      {!isScanning && activeTab === 'monitor' && (
        <motion.button 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleScan}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-600/40 z-40"
        >
          <RefreshCw size={24} />
        </motion.button>
      )}

      <footer className="max-w-5xl mx-auto mt-12 pb-8 text-center">
        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
          DroidGuard AI &copy; 2026 • Arquitectura de Privacidad Avanzada
        </p>
      </footer>
    </div>
  );
}
