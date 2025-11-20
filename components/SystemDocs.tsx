import React from 'react';
import { Icons } from './Icons';

export const SystemDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">System Architecture & Specification</h1>
        <p className="text-slate-500 mt-2">Detailed technical breakdown of the AccessFlow Platform.</p>
      </header>

      {/* Section 1: Architecture */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Icons.Zap className="w-5 h-5 text-indigo-600" /> High-Level Architecture
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h3 className="font-medium text-slate-900">Backend Core (Node.js/NestJS)</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                    <li>**API Gateway**: RESTful endpoints protected by JWT middleware.</li>
                    <li>**Device Manager**: WebSocket server for real-time ZKTeco events.</li>
                    <li>**TTLock Service**: Wrapper around TTLock Open API for cloud key generation.</li>
                    <li>**Scheduler**: Cron jobs for cleaning up temporary visitor credentials.</li>
                </ul>
            </div>
            <div className="space-y-4">
                <h3 className="font-medium text-slate-900">Frontend (React/Vite)</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                    <li>**Admin Portal**: React 18 SPA for management.</li>
                    <li>**Visitor Kiosk**: Simplified PWA for iPad at reception.</li>
                    <li>**State Management**: React Query for server state, Context for session.</li>
                </ul>
            </div>
        </div>
      </div>

      {/* Section 2: Database */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
         <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Icons.FileText className="w-5 h-5 text-indigo-600" /> Database Schema (PostgreSQL)
          </h2>
        </div>
        <div className="p-6 overflow-x-auto">
          <div className="min-w-full bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs leading-relaxed">
            <p><span className="text-blue-400">Table</span> Tenants {'{'}</p>
            <p className="pl-4">id: UUID [PK]</p>
            <p className="pl-4">name: VARCHAR(255)</p>
            <p className="pl-4">contract_end: DATE</p>
            <p>{'}'}</p>
            <br/>
            <p><span className="text-blue-400">Table</span> Users {'{'}</p>
            <p className="pl-4">id: UUID [PK]</p>
            <p className="pl-4">tenant_id: UUID [FK]</p>
            <p className="pl-4">face_template: TEXT (Base64 blob)</p>
            <p className="pl-4">role: ENUM('admin', 'employee', 'visitor')</p>
            <p>{'}'}</p>
             <br/>
            <p><span className="text-blue-400">Table</span> Devices {'{'}</p>
            <p className="pl-4">id: UUID [PK]</p>
            <p className="pl-4">branch_id: UUID</p>
            <p className="pl-4">type: ENUM('ZK_FACE', 'TTLOCK', 'ZK_LPR')</p>
            <p className="pl-4">api_key: VARCHAR(255)</p>
            <p>{'}'}</p>
             <br/>
            <p><span className="text-blue-400">Table</span> AccessLogs {'{'}</p>
            <p className="pl-4">id: BIGINT [PK]</p>
            <p className="pl-4">timestamp: TIMESTAMPTZ</p>
            <p className="pl-4">event_type: VARCHAR(50)</p>
            <p className="pl-4">snapshot_url: VARCHAR(500)</p>
            <p>{'}'}</p>
          </div>
        </div>
      </div>

       {/* Section 3: API Integration */}
       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
         <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Icons.Shield className="w-5 h-5 text-indigo-600" /> Hardware Integration Strategy
          </h2>
        </div>
        <div className="p-6 space-y-6">
            <div>
                <h3 className="text-md font-bold text-slate-800 mb-2">ZKTeco (BioSecurity API / ADMS)</h3>
                <p className="text-sm text-slate-600">
                    We utilize the Push SDK (ADMS) protocol. Devices initiate connections to our cloud server via HTTP/HTTPS. 
                    Commands (e.g., `DATA UPDATE USER`) are queued and sent in response to device heartbeats. 
                    Logs are pushed in real-time.
                </p>
            </div>
            <div className="border-t border-slate-100 pt-4">
                <h3 className="text-md font-bold text-slate-800 mb-2">TTLock (Cloud API)</h3>
                <p className="text-sm text-slate-600">
                    Integration is purely server-to-server using TTLock Open API `v3`.
                    We use OAuth2 to authorize the admin account. 
                    eKeys and Passcodes are generated via `POST /v3/keyboardPwd/add` and synced to the lock via the Tenant's mobile app or a G2 Gateway.
                </p>
            </div>
        </div>
      </div>

    </div>
  );
};
