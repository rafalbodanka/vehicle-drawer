const generateSitsArray = (numberOfSits: number) => {
    const sitsArray = [];
    for (let i = 0; i < numberOfSits; i++) {
      sitsArray.push({
        type: '',
        number: 5,
        reserved: true,
        opposite: false,
      });
    }
    return sitsArray;
  };

export default generateSitsArray