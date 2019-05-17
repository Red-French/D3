# D3 (v3.5.5)
## Ordinal Scales
https://github.com/d3/d3-scale

#### .range()
Given a value x in the input domain, returns the corresponding value in the output range.
```
let scale = d3.scale.ordinal()
  .domain(["A", "B", "C"])
  .range (["Apple", "Banana", "Coconut"]);

console.log(scale("A"));  // Apple
console.log(scale("B"));  // Banana
console.log(scale("C"));  // Coconut
```

#### .rangePoints()
Subdivides the range; note: if you assign the values to x, y of an SVG element, you get a blurred line.  Use .rangeRoundPoints() below.
```
let scale2 = d3.scale.ordinal()
  .domain(["A", "B", "C", "D"])
  .rangePoints ([0, 100]);

console.log(scale2("A"));  // prints 0
console.log(scale2("B"));  // prints 33.33333...
console.log(scale2("C"));  // 66.66666...
console.log(scale2("D"));  // 100
```

#### .rangeRoundPoints()
Provides more crisp shapes than .rangePoints() when assigning values to x, y of an SVG elements.

```
let scale3 = d3.scale.ordinal()
  .domain(["A", "B", "C", "D"])
  .rangeRoundPoints ([0, 100]);

console.log(scale3("A"));  // prints 1
console.log(scale3("B"));  // prints 34
console.log(scale3("C"));  // 67
console.log(scale3("D"));  // 100
```
