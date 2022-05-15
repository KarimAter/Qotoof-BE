// interface IBenficiary {

//     benName:string;
// }

// const beneficiaryList:IBenficiary[]=[];

const beneficiaryList:Benificiary[]=[];

class Benificiary  {
    benName: string;
    
    constructor(name:string){
        this.benName=name;
    }
    

    save(){
        beneficiaryList.push(this);
    }


    static fetchCases():Benificiary[]{
        return beneficiaryList
    }
}

export default Benificiary;