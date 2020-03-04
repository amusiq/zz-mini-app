import { observable } from "mobx";

const userStore = observable({
  counter: 0,
  counterStore() {
    this.counter++;
  },
  increment() {
    this.counter++;
  },
  decrement() {
    this.counter--;
  },
  incrementAsync() {
    setTimeout(() => {
      this.counter++;
    }, 1000);
  }
});
export default userStore;
