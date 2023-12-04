let arr = [
  { id: 1, t: "gsd" },
  { id: 2, t: "gsd-2" },
];

let idd = 2;

let ind = arr.map((item) => {
  if (item.id === idd) {
    return {...item,t : "pokath"};
  } else {
    return item;
  }
});
console.log(ind);
