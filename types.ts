export enum UserRole {
  ADMIN = 'Admin',
  TENANT = 'Tenant',
  VISITOR = 'Visitor',
  EMPLOYEE = 'Employee'
}

export enum DeviceType {
  ZKTECO_FACE = 'ZKTeco FaceDepot',
  ZKTECO_GATE = 'ZKTeco Parking Gate',
  TTLOCK_DOOR = 'TTLock Smart Lock',
  ZKTECO_CONTROLLER = 'ZKTeco Atlas Panel'
}

export enum DeviceStatus {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
  SYNCING = 'Syncing',
  ERROR = 'Error'
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  tenantCount: number;
  deviceCount: number;
  status: 'Operational' | 'Maintenance';
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  branchId: string;
  ip?: string;
  mac?: string;
  status: DeviceStatus;
  lastSync: string;
  batteryLevel?: number; // For TTLock
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  faceEnrolled: boolean;
  pinAssigned: boolean;
  accessGroups: string[];
  photoUrl?: string;
}

export interface AccessLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  deviceId: string;
  deviceName: string;
  branchId: string;
  event: 'Granted' | 'Denied' | 'Tailgating' | 'Forced Open';
  method: 'Face' | 'Card' | 'PIN' | 'App' | 'QR';
  imageUrl?: string; // Snapshot for ZKTeco
}

export interface Tenant {
  id: string;
  companyName: string;
  branchId: string;
  rentedUnits: string[]; // e.g., "Office 101", "Warehouse B"
  activeContracts: number;
  status: 'Active' | 'Overdue';
}

export type ViewState = 'dashboard' | 'branches' | 'tenants' | 'access-control' | 'visitors' | 'system-docs';
