# D3-Exit_Selections-Key_Functions (v4)
Learning D3

The data() method accepts two parameters; the data and a key function.  The key function is used to match and join the data to the elements.  (Otherwise, elements are matched to the data array sequentially.)

```
d3.selectAll("li")
  .data(nonRMovies, (d) => {
    return d.quote;  // using the quote on the data object as the key in the key function
  })
  .exit()
  .remove();
```
