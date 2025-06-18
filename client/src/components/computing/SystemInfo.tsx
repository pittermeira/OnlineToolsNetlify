import { useState, useEffect } from "react";
import { Monitor, Wifi } from "lucide-react";
import ToolCard from "@/components/ToolCard";
export default function SystemInfo() {
  const [ipAddress, setIpAddress] = useState("Carregando...");
  const [systemInfo, setSystemInfo] = useState({
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  useEffect(() => {
    // Buscar IP real do usuário
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIpAddress(data.ip))
      .catch(() => {
        // Fallback para serviços alternativos
        fetch("https://ipapi.co/ip/")
          .then((response) => response.text())
          .then((ip) => setIpAddress(ip))
          .catch(() => setIpAddress("Não disponível"));
      });
  }, []);

  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg"))
      return "Google Chrome";
    if (userAgent.includes("Firefox")) return "Mozilla Firefox";
    if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
      return "Safari";
    if (userAgent.includes("Edg")) return "Microsoft Edge";
    if (userAgent.includes("Opera")) return "Opera";
    return "Navegador desconhecido";
  };

  const getOperatingSystem = () => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes("win")) return "Windows";
    if (platform.includes("mac")) return "macOS";
    if (platform.includes("linux")) return "Linux";
    if (platform.includes("android")) return "Android";
    if (platform.includes("iphone") || platform.includes("ipad")) return "iOS";
    return navigator.platform;
  };

  return (
    <ToolCard
      title="Informações do Sistema"
      icon={<Monitor className="text-primary w-6 h-6" />}
    >
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="font-medium">IP Address:</span>
          <span className="text-gray-600">{ipAddress}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Navegador:</span>
          <span className="text-gray-600">{getBrowserName()}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Sistema Operacional:</span>
          <span className="text-gray-600">{getOperatingSystem()}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Idioma:</span>
          <span className="text-gray-600">{systemInfo.language}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Resolução:</span>
          <span className="text-gray-600">{systemInfo.screenResolution}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Profundidade de Cor:</span>
          <span className="text-gray-600">{systemInfo.colorDepth} bits</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Cookies:</span>
          <span className="text-gray-600">
            {systemInfo.cookieEnabled ? "Habilitado" : "Desabilitado"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Status Online:</span>
          <span className="text-gray-600 flex items-center">
            <Wifi className="w-4 h-4 mr-1" />
            {systemInfo.onLine ? "Online" : "Offline"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Fuso Horário:</span>
          <span className="text-gray-600">{systemInfo.timezone}</span>
        </div>
      </div>
    </ToolCard>
  );
}
