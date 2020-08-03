describe("checkBrackets", function () {
  describe("incorrect", function () {
    it("Number is not valid data type", function() {
      assert.equal(checkBrackets(4), 0);
    });
    it("undefined is not valid data type", function() {
      assert.equal(checkBrackets(undefined), 0);
    });
    it("null is not valid data type", function() {
      assert.equal(checkBrackets(null), 0);
    });
    it("Array is not valid data type", function() {
      assert.equal(checkBrackets(["asd", "dsa"]), 0);
    });
    it("NaN is not valid data types", function() {
      assert.equal(checkBrackets(NaN), 0);
    });
  });
  describe("correct", function () {
    it("1)()(())2(() must return 2", function() {
      assert.equal(checkBrackets("1)()(())2(()"), 2);
    });
    it("((( must return 3", function() {
      assert.equal(checkBrackets(")))"), 3);
    });
    it(")))) must return 4", function() {
      assert.equal(checkBrackets("(((("), 4);
    });
    it("(()(ds((sd( must return 5", function() {
      assert.equal(checkBrackets("(()(((("), 5);
    });
    it("a()b() is ${0}", function() {
      assert.equal(checkBrackets("a()b()"), 0);
    });
    it("()()(((()) return 2", function() {
      assert.equal(checkBrackets("()()(((())"), 2);
    });
    it("(cat)(dog) return 0", function() {
      assert.equal(checkBrackets("(cat)(dog)"), 0);
    });
    it("hello(friend) must return 0", function() {
      assert.equal(checkBrackets("hello(friend)"), 0);
    });
    it("((a()b())) must return 1", function() {
      assert.equal(checkBrackets("(a + b((()))"), 1);
    });
    it("(pupi()(dupi)) must return 0", function() {
      assert.equal(checkBrackets("(pupi()(dupi))"), 0);
    });
  });
});
