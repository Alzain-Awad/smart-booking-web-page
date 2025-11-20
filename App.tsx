import React, { useState, useEffect } from 'react';
import { Icons } from './components/Icons';
import { FaceEnrollmentModal } from './components/FaceEnrollmentModal';
import { SystemDocs } from './components/SystemDocs';
import { MOCK_BRANCHES, MOCK_DEVICES, MOCK_LOGS, MOCK_TENANTS, MOCK_USERS } from './constants';
import { AccessLog, Branch, DeviceType, UserRole, ViewState } from './types';
import { analyzeSecurityLogs } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [logs, setLogs] = useState<AccessLog[]>(MOCK_LOGS);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulate real-time logs
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: AccessLog = {
        id: `l${Date.now()}`,
        timestamp: new Date().toISOString(),
        userId: 'u1',
        userName: Math.random() > 0.7 ? 'John Doe' : 'Visitor 102',
        deviceId: 'd1',
        deviceName: 'Main Entrance',
        branchId: 'b1',
        event: Math.random() > 0.9 ? 'Denied' : 'Granted',
        method: 'Face'
      };
      setLogs(prev => [newLog, ...prev].slice(0, 50));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSecurityAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeSecurityLogs(logs, MOCK_BRANCHES);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const renderSidebarItem = (id: ViewState, label: string, Icon: any) => (
    <button 
      onClick={() => setView(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        view === id 
        ? 'bg-indigo-50 text-indigo-600' 
        : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
            <Icons.Shield className="w-8 h-8" />
            <span>AccessFlow</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {renderSidebarItem('dashboard', 'Dashboard', Icons.Dashboard)}
          {renderSidebarItem('branches', 'Branches', Icons.Building)}
          {renderSidebarItem('access-control', 'Access Control', Icons.Lock)}
          {renderSidebarItem('tenants', 'Tenants', Icons.Users)}
          {renderSidebarItem('system-docs', 'System Specs', Icons.FileText)}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              SC
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Sarah Connor</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 flex-shrink-0">
          <h2 className="text-lg font-semibold text-slate-800 capitalize">
            {view.replace('-', ' ')}
          </h2>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsEnrollmentOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition"
            >
              <Icons.ScanFace className="w-4 h-4" /> Remote Enroll
            </button>
          </div>
        </header>

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {view === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Tenants', val: '48', icon: Icons.Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Active Devices', val: '165', icon: Icons.Lock, color: 'text-green-600', bg: 'bg-green-50' },
                  { label: 'Events Today', val: '2,304', icon: Icons.Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Security Alerts', val: '3', icon: Icons.AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
                    <div>
                      <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold text-slate-900 mt-2">{stat.val}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Insight Section */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Icons.Zap className="text-amber-500" /> Gemini Security Core
                    </h3>
                    <button 
                      onClick={handleSecurityAnalysis}
                      disabled={isAnalyzing}
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium disabled:opacity-50"
                    >
                      {isAnalyzing ? 'Analyzing Logs...' : 'Run Security Audit'}
                    </button>
                 </div>
                 <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 min-h-[100px]">
                    {aiAnalysis ? (
                      <div className="prose prose-sm max-w-none text-slate-700">
                        <pre className="whitespace-pre-wrap font-sans">{aiAnalysis}</pre>
                      </div>
                    ) : (
                      <p className="text-slate-400 italic">AI analysis will appear here. Click "Run Security Audit" to analyze recent access patterns.</p>
                    )}
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Logs */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
                  <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">Live Access Logs</h3>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                          <tr>
                            <th className="px-6 py-3 font-medium">Time</th>
                            <th className="px-6 py-3 font-medium">User</th>
                            <th className="px-6 py-3 font-medium">Device</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {logs.slice(0, 8).map(log => (
                            <tr key={log.id} className="hover:bg-slate-50 transition">
                              <td className="px-6 py-3 text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                              <td className="px-6 py-3 font-medium text-slate-900">{log.userName}</td>
                              <td className="px-6 py-3 text-slate-600">{log.deviceName}</td>
                              <td className="px-6 py-3">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  log.event === 'Granted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {log.event}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Branch Status */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                  <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">Branch Status</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {MOCK_BRANCHES.map(branch => (
                      <div key={branch.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${branch.status === 'Operational' ? 'bg-green-500' : 'bg-orange-500'}`} />
                          <div>
                             <p className="text-sm font-medium text-slate-900">{branch.name}</p>
                             <p className="text-xs text-slate-500">{branch.location}</p>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-slate-400">{branch.deviceCount} Devices</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === 'access-control' && (
            <div className="space-y-6">
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Device Management</h3>
                    <button className="text-indigo-600 text-sm font-medium">+ Add Device</button>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-6 py-3">Device Name</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Integration</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Last Sync</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {MOCK_DEVICES.map(device => (
                        <tr key={device.id}>
                          <td className="px-6 py-4 font-medium text-slate-900">{device.name}</td>
                          <td className="px-6 py-4 text-slate-600">{device.type}</td>
                          <td className="px-6 py-4">
                            {device.type.includes('ZKTeco') ? (
                               <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">ZKTeco ADMS</span>
                            ) : (
                               <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">TTLock Cloud</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                             <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  device.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${device.status === 'Online' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                                  {device.status}
                                </span>
                          </td>
                          <td className="px-6 py-4 text-slate-500">{device.lastSync}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>
          )}

          {view === 'tenants' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_TENANTS.map(tenant => (
                <div key={tenant.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                        <Icons.Building />
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${tenant.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {tenant.status}
                      </span>
                   </div>
                   <h3 className="text-lg font-bold text-slate-900">{tenant.companyName}</h3>
                   <p className="text-sm text-slate-500 mt-1 mb-4">Branch: {MOCK_BRANCHES.find(b => b.id === tenant.branchId)?.name}</p>
                   
                   <div className="space-y-2 border-t border-slate-100 pt-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Allocated Units</p>
                      <div className="flex flex-wrap gap-2">
                        {tenant.rentedUnits.map(u => (
                          <span key={u} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">{u}</span>
                        ))}
                      </div>
                   </div>
                </div>
              ))}
            </div>
          )}

          {view === 'system-docs' && <SystemDocs />}
          
          {/* Placeholder for other views */}
          {['branches'].includes(view) && (
             <div className="text-center py-20">
               <Icons.Building className="w-16 h-16 mx-auto text-slate-200 mb-4" />
               <h3 className="text-xl font-bold text-slate-400">Module Under Construction</h3>
               <p className="text-slate-400">Select "Dashboard" or "Access Control" for active demos.</p>
             </div>
          )}

        </div>
      </main>

      <FaceEnrollmentModal isOpen={isEnrollmentOpen} onClose={() => setIsEnrollmentOpen(false)} />
    </div>
  );
};

export default App;
