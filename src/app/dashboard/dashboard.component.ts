import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
//import * as d3 from 'd3-selection';

import { PscService } from '../../assets/PSCServices/psc-service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  width : number = 960;
  height : number =  500;
  chartRadius = this.height / 2 - 40;
  color = d3.scaleOrdinal(d3.schemeCategory10);
  svg;
  tooltip;
  PI = Math.PI;
  arcMinRadius = 10;
  arcPadding = 10;
  labelPadding = -5;
  numTicks = 10;
  numArcs: any;
  arcWidth: any;
  arc: any;

  constructor(private pscService : PscService) {

    this.PI = Math.PI,
    

    this.svg = d3.select('body').append('svg')
                .attr('width', this.width)
                .attr('height', this.height)
                .append('g')
                  .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');

    this.tooltip = d3.select('body').append('div')
                      .attr('class', 'tooltip');
   }

  ngOnInit() {
    const url = "../../assets/PSCServices/receivables.json";
    this.pscService.getReceivables(url)
      .subscribe( (data) => {
        console.log(data['body']);
        if(data['body'])
          this.drawGraph(data['body']);
      })
  }

  drawGraph(data){
    let scale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.amount) * 1.1])
    .range([0, 2 * this.PI]);
    let ticks = scale.ticks(this.numTicks).slice(0, -1);
    let keys = data.map((d, i) => d.department);
    //number of arcs
    this.numArcs = keys.length;
    this.arcWidth = (this.chartRadius - this.arcMinRadius - this.numArcs * this.arcPadding) / this.numArcs;
    this.arc = d3.arc()
      .innerRadius((d, i) => this.getInnerRadius(i))
      .outerRadius((d, i) => this.getOuterRadius(i))
      .startAngle(0)
      .endAngle((d, i) => scale(d))

    let radialAxis = this.svg.append('g')
    .attr('class', 'r axis')
    .selectAll('g')
      .data(data)
      .enter().append('g');
    radialAxis.append('circle')
      .attr('r', (d, i) => this.getOuterRadius(i) + this.arcPadding);
    radialAxis.append('text')
      .attr('x', this.labelPadding)
      .attr('y', (d, i) => - this.getOuterRadius(i) + this.arcPadding)
      .text(d => d.department);
    let axialAxis = this.svg.append('g')
      .attr('class', 'a axis')
      .selectAll('g')
        .data(ticks)
        .enter().append('g')
          .attr('transform', d => 'rotate(' + (this.rad2deg(scale(d)) - 90) + ')');
    axialAxis.append('line')
      .attr('x2', this.chartRadius);
    axialAxis.append('text')
      .attr('x', this.chartRadius + 10)
      .style('text-anchor', d => (scale(d) >= this.PI && scale(d) < 2 * this.PI ? 'end' : null))
      .attr('transform', d => 'rotate(' + (90 - this.rad2deg(scale(d))) + ',' + (this.chartRadius + 10) + ',0)')
      .text(d => d);

    //data arcs
    let arcs = this.svg.append('g')
    .attr('class', 'data')
    .selectAll('path')
      .data(data)
      .enter().append('path')
      .attr('class', 'arc')
      .style('fill', (d, i) => this.color(i))
  arcs.transition()
    .delay((d, i) => i * 200)
    .duration(1000)
    .attrTween('d', this.arcTween);
  arcs.on('mousemove', this.showTooltip)
  arcs.on('mouseout', this.hideTooltip)
  }

  arcTween(d, i) {
    let interpolate = d3.interpolate(0, d.amount);
    return t => d3.arc(interpolate(t), i);
  }
  
  showTooltip(d) {
    this.tooltip.style('left', (d3.event.pageX + 10) + 'px')
      .style('top', (d3.event.pageY - 25) + 'px')
      .style('display', 'inline-block')
      .html(d.amount);
  }

  hideTooltip() {
    this.tooltip.style('display', 'none');
  }
  rad2deg(angle) {
    return angle * 180 / this.PI;
  }
  getInnerRadius(index) {
    return this.arcMinRadius + (this.numArcs - (index + 1)) * (this.arcWidth + this.arcPadding);
  }
  getOuterRadius(index) {
    return this.getInnerRadius(index) + this.arcWidth;
  }

}
