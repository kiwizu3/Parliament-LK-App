export default class Dim {
  constructor(name, func, isSorted = false) {
    this.name = name;
    this.func = func;
    this.isSorted = isSorted;
  }

  map(mpList) {
    return mpList.map(this.func);
  }
}
