# D3 (v3.5.5)
## Reading CSV Files

The d3 library provides a 'd3' object and its methods, one of which is csv(), which allows loading csv files.

```
d3.csv("data.csv", changeType, function(myArrayOfObjects) {  // the 2nd parameter can be a function for preprocessing
  myArrayOfObjects.forEach(function(d) {
    console.log(d.x + d.y);
  })
});
function changeType(data) {  // d3 reads the csv values as strings, so parse to integer for math use
  data.x = parseInt(data.x);
  data.y = +data.y;  //  shorthand for parsing to integer (unary operator)
  return data;
}
```
