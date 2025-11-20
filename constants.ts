import { Branch, Device, DeviceStatus, DeviceType, User, UserRole, AccessLog, Tenant } from './types';

export const MOCK_BRANCHES: Branch[] = [
  { id: 'b1', name: 'Downtown HQ', location: 'New York, NY', tenantCount: 12, deviceCount: 45, status: 'Operational' },
  { id: 'b2', name: 'Westside Logistics', location: 'Jersey City, NJ', tenantCount: 4, deviceCount: 18, status: 'Operational' },
  { id: 'b3', name: 'Tech Park Alpha', location: 'Austin, TX', tenantCount: 25, deviceCount: 60, status: 'Operational' },
  { id: 'b4', name: 'Harbor Warehouse', location: 'Oakland, CA', tenantCount: 2, deviceCount: 10, status: 'Maintenance' },
  { id: 'b5', name: 'Executive Suites', location: 'Miami, FL', tenantCount: 8, deviceCount: 32, status: 'Operational' },
];

export const MOCK_DEVICES: Device[] = [
  { id: 'd1', name: 'Main Entrance', type: DeviceType.ZKTECO_FACE, branchId: 'b1', status: DeviceStatus.ONLINE, lastSync: '2 mins ago', ip: '192.168.1.101' },
  { id: 'd2', name: 'Warehouse Gate A', type: DeviceType.ZKTECO_GATE, branchId: 'b2', status: DeviceStatus.ONLINE, lastSync: '5 mins ago', ip: '10.0.0.45' },
  { id: 'd3', name: 'Office 302', type: DeviceType.TTLOCK_DOOR, branchId: 'b1', status: DeviceStatus.ONLINE, lastSync: '1 hour ago', batteryLevel: 85 },
  { id: 'd4', name: 'Meeting Room B', type: DeviceType.ZKTECO_FACE, branchId: 'b3', status: DeviceStatus.OFFLINE, lastSync: '2 days ago', ip: '192.168.2.50' },
  { id: 'd5', name: 'Parking Entry', type: DeviceType.ZKTECO_GATE, branchId: 'b1', status: DeviceStatus.ONLINE, lastSync: '1 min ago', ip: '192.168.1.200' },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'John Doe', role: UserRole.TENANT, email: 'john@techcorp.com', faceEnrolled: true, pinAssigned: true, accessGroups: ['General', 'Office 302'], photoUrl: 'https://picsum.photos/id/1005/200/200' },
  { id: 'u2', name: 'Sarah Connor', role: UserRole.ADMIN, email: 'admin@accessflow.com', faceEnrolled: true, pinAssigned: true, accessGroups: ['All Access'], photoUrl: 'https://picsum.photos/id/1011/200/200' },
  { id: 'u3', name: 'Mike Ross', role: UserRole.VISITOR, email: 'mike@legal.com', faceEnrolled: false, pinAssigned: true, accessGroups: ['Meeting Room B'], photoUrl: 'https://picsum.photos/id/1025/200/200' },
];

export const MOCK_LOGS: AccessLog[] = [
  { id: 'l1', timestamp: '2023-10-27T08:30:00', userId: 'u1', userName: 'John Doe', deviceId: 'd1', deviceName: 'Main Entrance', branchId: 'b1', event: 'Granted', method: 'Face' },
  { id: 'l2', timestamp: '2023-10-27T08:35:12', userId: 'u3', userName: 'Mike Ross', deviceId: 'd5', deviceName: 'Parking Entry', branchId: 'b1', event: 'Granted', method: 'QR' },
  { id: 'l3', timestamp: '2023-10-27T09:01:00', userId: 'u1', userName: 'John Doe', deviceId: 'd3', deviceName: 'Office 302', branchId: 'b1', event: 'Granted', method: 'App' },
  { id: 'l4', timestamp: '2023-10-27T10:15:22', userId: 'unknown', userName: 'Unknown', deviceId: 'd2', deviceName: 'Warehouse Gate A', branchId: 'b2', event: 'Denied', method: 'Face' },
  { id: 'l5', timestamp: '2023-10-27T11:00:00', userId: 'u2', userName: 'Sarah Connor', deviceId: 'd1', deviceName: 'Main Entrance', branchId: 'b1', event: 'Granted', method: 'Face' },
];

export const MOCK_TENANTS: Tenant[] = [
  { id: 't1', companyName: 'TechCorp Solutions', branchId: 'b1', rentedUnits: ['Office 301', 'Office 302', 'Parking A1-A5'], activeContracts: 3, status: 'Active' },
  { id: 't2', companyName: 'Global Logistics', branchId: 'b2', rentedUnits: ['Warehouse A', 'Warehouse B'], activeContracts: 2, status: 'Active' },
  { id: 't3', companyName: 'Creative Studio', branchId: 'b3', rentedUnits: ['Studio 5'], activeContracts: 1, status: 'Overdue' },
];
