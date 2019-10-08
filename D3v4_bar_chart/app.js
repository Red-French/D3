const minYear = d3.min(birthData, d => {
  return d.year;
})
const maxYear = d3.max(birthData, d => {
  return d.year;
})

const chartWidth = 600;
const chartHeight = 600;
const barPadding = 10;
const barWidth = (chartWidth/12) - barPadding;
const maxBirths = d3.max(birthData, d => {
  return d.births;
});
let yScale = d3.scaleLinear()
               .domain([0, maxBirths])
               .range([chartHeight, 0]);  // flip y-axis here

d3.select('input')
  .property('min', minYear)
  .property('max', maxYear)
  .property('value', minYear);

d3.select('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight)
  .selectAll('rect')
    .data(birthData.filter(d => {
      return d.year === minYear;
    }))
  .enter()
  .append('rect')
    .attr('width', barWidth)
    .attr('height', d => {
      return yScale(d.births);
    })
    .attr('y', d => {
      return yScale(d.births)
    })
    .attr('x', (d,i) => {
      return (barWidth + barPadding) * i
    })
    .attr('fill', 'purple')

// range/input slider
d3.select('input')
  .on('input', () => {
    let year = +d3.event.target.value;
    d3.selectAll('rect')
      .data(birthData.filter((d) => {
        return d.year === year;
      }))
        .attr('height', (d) => {
          return chartHeight - yScale(d.births);
        })
        .attr('y', (d) => {
          return yScale(d.births);
        })
  })
