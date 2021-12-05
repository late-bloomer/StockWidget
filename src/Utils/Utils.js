export function findDeleteUtilsStock(options, stockList) {
  let s = new Set();
  let index = -1;
  let result = [];
  options.forEach((element) => {
    s.add(element.toLowerCase());
  });
  for (let i = 0; i < stockList.length; i++) {
    let curr = stockList[i];
    if (!s.has(curr.Symbol.toLowerCase())) {
      index = i;
      break;
    }
  }
  if (index === -1) {
    result = stockList;
  } else {
    let arr1 = stockList.slice(0, index);
    let arr2 = stockList.slice(index + 1, stockList.length);
    result = [...arr1, ...arr2];
  }
  return result;
}

export function extractSymbolArr(list) {
  let result = [];
  list.forEach((element) => {
    result.push(element.Symbol);
  });
  return result;
}
