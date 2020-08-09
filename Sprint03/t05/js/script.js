function Calculator() {
  this.result = 0;

  this.init = (num) => {
    this.result = num;
    return this;
  };

  this.add = (num) => {
    this.result += num;
    return this;
  };

  this.sub = (num) => {
    this.result -= num;
    return this;
  };

  this.mul = (num) => {
    this.result *= num;
    return this;
  };

  this.div = (num) => {
    this.result /= num;
    return this;
  };

  this.alert = () => setTimeout(() => alert(`Result = ${this.result}`), 5000);
}
