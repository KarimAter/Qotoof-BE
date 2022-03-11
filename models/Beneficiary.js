const beneficiaryList=[]

module.exports = class Beneificiary {
    constructor(beneficiaryName){
        this.beneficiaryName=beneficiaryName
    }

    save(){
        beneficiaryList.push(this);
    }


    static fetchCases(){
        return beneficiaryList
    }
}