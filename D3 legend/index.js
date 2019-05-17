import { select, scaleOrdinal, scaleSqrt } from 'd3';
import { colorLegend } from './colorLegend';
import { sizeLegend } from './sizeLegend';

const svg = select('svg');

const colorScale = scaleOrdinal()
  .domain(['apple', 'lemon', 'lime', 'orange'])
  .range(['#c11d1d', '#eae600', 'green', 'orange']);

svg.append('g')
    .attr('transform', `translate(180,150)`)
    .call(colorLegend, {
      colorScale,
      circleRadius: 30,
      spacing: 80,
      textOffset: 40
    });


const sizeScale = scaleSqrt()
  .domain([0, 10])
  .range([0, 50]);

svg.append('g')
    .attr('transform', `translate(600,100)`)
    .call(sizeLegend, {
      sizeScale,
      spacing: 80,
      textOffset: 10,
      numTicks: 5,
      circleFill: 'rgba(0, 0, 0, 0.5)'
    });
