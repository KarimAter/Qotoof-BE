interface IBeneficiary {
  name: string;
}

const beneficiaryList:IBeneficiary[]=[];

class Beneficiary implements IBeneficiary {
    name: string;
    
    constructor(name:string){
        this.name=name;
    }
    
    save(){
        beneficiaryList.push(this);
    }


    static fetchCases():IBeneficiary[]{
        return beneficiaryList
    }
}

export default Beneficiary;