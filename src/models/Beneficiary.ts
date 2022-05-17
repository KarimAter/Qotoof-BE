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

  static editBeneficiary(currentName: string, targetName: string) {
    const index: number = beneficiaryList.findIndex(
      (ben) => ben.name === currentName
    );
    beneficiaryList[index] = new Beneficiary(targetName);
  }
  static deleteBeneficiary(name: string) {
    const index: number = beneficiaryList.findIndex(
      (ben) => ben.name === name
    );

    beneficiaryList.splice(index,1)
  }

  static fetchCases(): IBeneficiary[] {
    return beneficiaryList;
  }
}

export default Beneficiary;