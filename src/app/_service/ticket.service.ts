  export class TicketService{
  
   // object:{
  //   user,
  //   city}
  city;
  cityId;
  area;
  areaId;
  company;
  companyId;
  branch;
  branchId;
  service;
  serv
  // function(type,value){
  //   this.objec[type]=value}
  postUserData(key: string, value) {
    switch (key) {
      case 'city':
        this.city = value;
        break;
      case 'cityId':
        this.cityId = value;
        break;
      case 'area':
        this.area = value;
        break;
      case 'areaId':
        this.areaId = value;
        break;
      default:
      // code block
    }
  }

  getCityID(){
    return this.cityId;
  }
  getCompanyId(){
    return this.companyId;
  }
}