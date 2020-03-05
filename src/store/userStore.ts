import { observable } from "mobx";

const userStore = observable({
  isLogin: false,
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
