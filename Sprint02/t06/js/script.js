let number = 5,
  bigInt = 5n,
  str = "Hello world!",
  bool = true,
  nullVar = null,
  und = undefined,
  obj = {},
  sym = Symbol("New symbol"),
  varFunc = function () {};

alert("number = " + typeof number +
  "\nbigInt = " + typeof bigInt +
  "\nstr = " + typeof str +
  "\nbool = " + typeof bool +
  "\nnullVar = " + typeof nullVar +
  "\nund = " + typeof und +
  "\nobj = " + typeof obj +
  "\nsym = " + typeof sym +
  "\nvarFunc = " + typeof varFunc
);
