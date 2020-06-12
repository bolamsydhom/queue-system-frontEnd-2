import { Branch } from './../_model/branch';
export class BranchService {
  branches: Branch[] = [
    {
      branchId: 1,
      branchName: 'Shbeen (Main Branch)',
      start: 9,
      end: 15,
      services: [{ serviceId: 1, serviceName: 'a', departmentId: 1 },
      { serviceId: 2, serviceName: 'b', departmentId: 1 },{ serviceId: 3, serviceName: 'c', departmentId: 1 },{ serviceId: 4, serviceName: 'fgh', departmentId: 1 }],
      companyId: 1
    },
    {
      branchId: 2,
      branchName: 'EL-khamsa',
      start: 8,
      end: 14,
      services: [{ serviceId: 2, serviceName: 'b', departmentId: 1 }],
      companyId: 1
    },
    {
      branchId: 3,
      branchName: 'EL-Soltan',
      start: 10,
      end: 20,
      services: [{ serviceId: 3, serviceName: 'c', departmentId: 1 }],
      companyId: 1
    },
    {
      branchId: 4,
      branchName: 'EL-Eshreeny',
      start: 9,
      end: 15,
      services: [{ serviceId: 4, serviceName: 'a', departmentId: 1 }],
      companyId: 2
    },
    {
      branchId: 5,
      branchName: 'EL-Togary',
      start: 9,
      end: 15,
      services: [{ serviceId: 5, serviceName: 'b', departmentId: 1 }],
      companyId: 2
    },
    {
      branchId: 6,
      branchName: 'fghj',
      start: 9,
      end: 15,
      services: [{ serviceId: 6, serviceName: 'c', departmentId: 1 }],
      companyId: 2
    },
    {
      branchId: 7,
      branchName: 'rtyu',
      start: 9,
      end: 15,
      services: [{ serviceId: 7, serviceName: 'a', departmentId: 1 }],
      companyId: 3
    },
    {
      branchId: 8,
      branchName: 'dcvbn',
      start: 9,
      end: 15,
      services: [{ serviceId: 8, serviceName: 'b', departmentId: 1 }],
      companyId: 3
    },
    {
      branchId: 9,
      branchName: 'rtyu',
      start: 9,
      end: 15,
      services: [{ serviceId: 9, serviceName: 'c', departmentId: 1 }],
      companyId: 3
    },
    {
      branchId: 10,
      branchName: 'bola',
      start: 9,
      end: 15,
      services: [{ serviceId: 10, serviceName: 'd', departmentId: 1 }],
      companyId: 3
    }
  ];
  // getAllBranches() {
  //   return this.branches;
  // }
  getBranchByID(id: number) {
    return this.branches.filter(b => b.branchId === id);
  }
  // getBranchByName(name: string) {
  //   return this.branches.filter(b => b.branchName === name);
  // }
  getBranchesByCompanyId(companyId: number) {
    return this.branches.filter(b => b.companyId === companyId);
  }
  getServicesByBranchId(branchId: number) {
    let branch = this.branches.filter(b => b.branchId === branchId);
    return branch[0].services;
  }
}
