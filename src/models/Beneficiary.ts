interface IBeneficiary {
  name: string;
}

const beneficiaryList:IBeneficiary[]=[];

class Beneficiary implements IBeneficiary {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  save() {
    beneficiaryList.push(this);
  }

  static editBeneficiary(currentName: string, targetName: string):string {
    const index: number = beneficiaryList.findIndex(
      (ben) => ben.name === currentName
    );
    if (index !== -1) {beneficiaryList[index] = new Beneficiary(targetName);return 'Name edited to '};
    return "Not found";
  }
  static deleteBeneficiary(name: string):string {
    const index: number = beneficiaryList.findIndex(
      (ben) => ben.name === name
    );

    if (index !== -1) {beneficiaryList.splice(index, 1);return 'Deleted!'};
     return "Not found";
  }

  static fetchCases(): IBeneficiary[] {
    return beneficiaryList;
  }
}

export default Beneficiary;