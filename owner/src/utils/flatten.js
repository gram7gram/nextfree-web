const flatten = function (ob, sep = '.') {
  const toReturn = {};

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) == 'object') {
      const flatObject = flatten(ob[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + sep + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

export default flatten