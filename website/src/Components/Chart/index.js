import './index.scss';

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const TEST_DATA = [
  { id: 1, value: 12, name: 'cac' },
  { id: 2, value: 35, name: 'cut' },
  { id: 3, value: 27, name: 'ciu' },
  { id: 4, value: 86, name: 'con' },
];

const xScale = d3.scaleBand().domain(TEST_DATA.map((datum) => datum.name)).rangeRound([0, 300]).padding(0.2);
const yScale = d3.scaleLinear().domain([0, 90]).range([205, 0]); // domain -> range. [range start, range end] = draw reverse

const Chart = () => {
  const svgEl = useRef();

  const renderChart = () => {
    const chart = d3.select(svgEl.current)

    chart.selectAll('.bar')
      .data(TEST_DATA)
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('width', xScale.bandwidth())
      .attr('height', (datum) => 205 - yScale(datum.value))
      .attr('x', (datum) => xScale(datum.name))
      .attr('y', (datum) => yScale(datum.value));
  };

  useEffect(() => {
    renderChart();
  }, [])

  return <svg className='chart' ref={svgEl} />;
};

export default Chart;
