import { Service } from './service';
export interface Branch {
  branchId: number;
  branchName: string;
  start: number;
  end: number;
  services: Service[];
  companyId: number;
}
