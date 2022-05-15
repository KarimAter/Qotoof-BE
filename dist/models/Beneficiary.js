"use strict";
// interface IBenficiary {
Object.defineProperty(exports, "__esModule", { value: true });
//     benName:string;
// }
// const beneficiaryList:IBenficiary[]=[];
const beneficiaryList = [];
class Benificiary {
    constructor(name) {
        this.benName = name;
    }
    save() {
        beneficiaryList.push(this);
    }
    static fetchCases() {
        return beneficiaryList;
    }
}
exports.default = Benificiary;
