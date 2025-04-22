import { useState, useEffect } from "react";
import { MainPage } from "./MainPage";
import { Check, Loader2, X, Wifi, WifiOff } from "lucide-react";

const Application: React.FC = () => {
  const [wsServer, setWsServer] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<"disconnected" | "connecting" | "connected" | "error">("disconnected");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Clean up WebSocket connection when component unmounts
  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  const connectToWs = () => {
    if (!wsServer) {
      setErrorMessage("Please enter a WebSocket server URL");
      return;
    }

    try {
      setConnectionStatus("connecting");
      setErrorMessage("");
      
      const newWs = new WebSocket(wsServer);
      
      newWs.onopen = () => {
        setConnectionStatus("connected");
        setWs(newWs);
      };
      
      newWs.onerror = (error) => {
        console.error("WebSocket error:", error);
        setConnectionStatus("error");
        setErrorMessage("Failed to connect to WebSocket server");
        setWs(null);
      };
      
      newWs.onclose = () => {
        setConnectionStatus("disconnected");
        setWs(null);
      };
      
    } catch (error) {
      console.error("Error creating WebSocket:", error);
      setConnectionStatus("error");
      setErrorMessage("Invalid WebSocket URL");
      setWs(null);
    }
  };

  const disconnect = () => {
    if (ws) {
      ws.close();
      setWs(null);
      setConnectionStatus("disconnected");
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected": return "text-emerald-500";
      case "connecting": return "text-amber-500";
      case "error": return "text-rose-500";
      default: return "text-slate-500";
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case "connected": return "Connected";
      case "connecting": return "Connecting";
      case "error": return "Connection Error";
      default: return "Disconnected";
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case "connected": return <Check className="w-4 h-4" />;
      case "connecting": return <Loader2 className="w-4 h-4 animate-spin" />;
      case "error": return <X className="w-4 h-4" />;
      default: return <WifiOff className="w-4 h-4" />;
    }
  };

  if (!ws) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md mx-auto border border-slate-100">
          <div className="flex items-center justify-center mb-6">
            <Wifi className="w-8 h-8 text-indigo-500 mr-2" />
            <h1 className="text-2xl font-semibold text-slate-800">WebSocket Connect</h1>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="ws-server" className="text-sm font-medium text-slate-700 block">Server URL</label>
              <div className="relative">
                <input
                  id="ws-server"
                  type="text"
                  value={wsServer}
                  onChange={(e) => setWsServer(e.target.value)}
                  placeholder="ws://192.168.1.2"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-1.5 ${getStatusColor()}`}>
                {getStatusIcon()}
                <span className="text-sm font-medium">{getStatusText()}</span>
              </div>
              
              <button
                onClick={connectToWs}
                disabled={connectionStatus === "connecting" || !wsServer}
                className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-md hover:shadow-lg disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {connectionStatus === "connecting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Connecting
                  </>
                ) : (
                  <>Connect</>
                )}
              </button>
            </div>

            {connectionStatus === "error" && (
              <div className="px-4 py-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-600 text-sm">
                {errorMessage || "Connection error occurred"}
              </div>
            )}

            <div className="text-xs text-slate-400 mt-8 text-center">
              Enter the Esp32 WebSocket server to connect to your application
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center shadow-sm">
          <div className="flex items-center">
            <div className={`flex items-center gap-1.5 ${getStatusColor()}`}>
              {getStatusIcon()}
              <span className="text-sm font-medium">{wsServer}</span>
            </div>
          </div>
          <button 
            onClick={disconnect}
            className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-md hover:bg-slate-200 transition-colors flex items-center gap-1.5"
          >
            <WifiOff className="w-4 h-4" />
            Disconnect
          </button>
        </div>
        <div className="flex-1">
          <MainPage ws={ws} />
        </div>
      </div>
    );
  }
};

export default Application;