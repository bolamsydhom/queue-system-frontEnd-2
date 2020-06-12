import { Company } from './../_model/company'
import { EventEmitter } from '@angular/core';
export class CompanyService {

    companySelected=new EventEmitter<Company>();

    companies: Company[] = [
        {
            id: 1,
            name: "vodafone",
            description: "vodafone vodafone vodafone vodafone",
            imgUrl: "../../../assets/images/image-coeur-amour.jpg"
        },
        {
            id: 2,
            name: "Orange",
            description: "Orange Orange Orange Orange",

 imgUrl: "../../../assets/images/download.jpg"
        },
        {
            id: 3,
            name: "Etsalat",
            description: "Etsalat Etsalat Etsalat Etsalat",

 imgUrl: "../../../assets/images/image-coeur-amour.jpg"
        },
        {
            id: 4,
            name: "CIB",
            description: "CIB CIB CIB CIB CIB",
 imgUrl: "../../../assets/images/image-coeur-amour.jpg"   
        },{
            id: 1,
            name: "vodafone",
            description: "vodafone vodafone vodafone vodafone",
            imgUrl: "../../../assets/images/image-coeur-amour.jpg"
        },
        {
            id: 2,
            name: "Orange",
            description: "Orange Orange Orange Orange",

 imgUrl: "../../../assets/images/download.jpg"
        },
        {
            id: 3,
            name: "Etsalat",
            description: "Etsalat Etsalat Etsalat Etsalat",

 imgUrl: "../../../assets/images/image-coeur-amour.jpg"
        },
        {
            id: 4,
            name: "CIB",
            description: "CIB CIB CIB CIB CIB",
 imgUrl: "../../../assets/images/image-coeur-amour.jpg"   
        },
        {
            id: 1,
            name: "vodafone",
            description: "vodafone vodafone vodafone vodafone",
            imgUrl: "../../../assets/images/image-coeur-amour.jpg"
        },
        {
            id: 2,
            name: "Orange",
            description: "Orange Orange Orange Orange",

 imgUrl: "../../../assets/images/download.jpg"
        },
        {
            id: 3,
            name: "Etsalat",
            description: "Etsalat Etsalat Etsalat Etsalat",

 imgUrl: "../../../assets/images/image-coeur-amour.jpg"
        },
        {
            id: 4,
            name: "CIB",
            description: "CIB CIB CIB CIB CIB",
 imgUrl: "../../../assets/images/image-coeur-amour.jpg"   
        },


    ]

    getAll() {
        return this.companies.slice();
      }

      getById(id: number) {
        return this.companies.find(p => p.id === id);
      }
}



