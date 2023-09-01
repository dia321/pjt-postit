const function1 = () => {
  const arr1 = [
    { a: "0", b: "1", c: "2" },
    { a: "0", b: "2", c: "2" },
    { a: "0", b: "1", c: "2" },
    { a: "0", b: "1", c: "3" },
    { a: "0", b: "1", c: "3" },
    { a: "0", b: "2", c: "2" },
  ];
  //키 array
  const keys = Object.keys(arr1[0]);
  //키 array 길이
  const keysLength = keys.length;
  let index = 0;

  //인덱스 0에서부터 기준 잡고 비교하기
  while (index + 1 < arr1.length) {
    //source: 기준 인덱스의 value 값들
    const source = [];
    for (const k of keys) source.push(arr1[index][k]);

    //arr1에서 제거해야하는 값(중복값)들의 인덱스 array
    const willBePoped = [];

    for (let i = index + 1; i < arr1.length; i++) {
      for (let j = 0; j < keysLength + 1; j++) {
        if (j === keysLength) {
          willBePoped.push(i);
          break;
        }
        if (arr1[i][keys[j]] !== source[j]) break;
      }
    }

    //내림차순으로 뒤집어서 뒤에서부터 splice하기
    willBePoped.sort((a, b) => b - a);
    for (const poppingIdx of willBePoped) arr1.splice(poppingIdx, 1);
    index++;
  }
  console.log(arr1);

  return arr1;
};

function1();

const function2 = (specKey, specValue) => {
  const arr2 = [
    { a: 1, b: 2 },
    { a: 2, b: 3 },
    { a: 3, b: 4 },
    { a: 3, b: 5 },
    { a: 5, b: 3 },
  ];
  return arr2.filter((f) => f[specKey] !== specValue);
};

function2();

const function3 = () => {
  const arr2 = [
    { a: 1, b: 2 },
    { a: 2, b: 3 },
    { a: 3, b: 4 },
    { a: 3, b: 5 },
    { a: 5, b: 3 },
  ];
  const arr3 = [2, 3];

  //arr1에서 제거해야하는 값(중복값)들의 인덱스 array
  const willBePoped = [];

  for (let i = index + 1; i < arr2.length; i++) {
    for (let j = 0; j < keysLength + 1; j++) {
      if (j === keysLength) {
        willBePoped.push(i);
        break;
      }
      if (arr2[i][keys[j]] !== source[j]) break;
    }
  }

  //내림차순으로 뒤집어서 뒤에서부터 splice하기
  willBePoped.sort((a, b) => b - a);
  for (const poppingIdx of willBePoped) arr2.splice(poppingIdx, 1);
  index++;
};
