import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";


@Component({
  selector: 'app-graph2',
  templateUrl: './graph2.component.html',
  styleUrls: ['./graph2.component.css']
})
export class Graph2Component implements OnInit {
  data;
  data2;
  data3;
  constructor() { 
   this.data = [{
        "sale": "202",
        "year": "2000"
    }, {
        "sale": "215",
        "year": "2001"
    }, {
        "sale": "179",
        "year": "2002"
    }, {
        "sale": "199",
        "year": "2003"
    }, {
        "sale": "134",
        "year": "2003"
    }, {
        "sale": "176",
        "year": "2010"
    }];


  this.data2 = [{
        "sale": "152",
        "year": "2000"
    }, {
        "sale": "189",
        "year": "2002"
    }, {
        "sale": "179",
        "year": "2004"
    }, {
        "sale": "199",
        "year": "2006"
    }, {
        "sale": "134",
        "year": "2008"
    }, {
        "sale": "176",
        "year": "2010"
    }];

    this.data3 = [{
      "sale": "204",
      "year": "2000"
  }, {
      "sale": "115",
      "year": "2001"
  }, {
      "sale": "109",
      "year": "2002"
  }, {
      "sale": "159",
      "year": "2003"
  }, {
      "sale": "184",
      "year": "2003"
  }, {
      "sale": "106",
      "year": "2010"
  }];
  }

  ngOnInit() {
    this.createGraph();
     setTimeout(()=>{
        
     },2000)
    }

   createGraph(){
    console.log(d3);
    let vis = d3.select("#visualisation"),
    WIDTH = 5000,
    HEIGHT = 500,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    },
    xScale = d3.scaleLinear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1000, 2010]),
    yScale = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([134, 215]),
    xAxis = d3.axisBottom()
    .scale(xScale),
    yAxis = d3.axisLeft()
    .scale(yScale);
    //.orient("left");

vis.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);
vis.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);
let lineGen = d3.line()
    .x(function(d) {
        return xScale(d.year);
    })
    .y(function(d) {
        return yScale(d.sale);
    })
    .curve(d3.curveBasis);
vis.append('svg:path')
    .attr('d', lineGen(this.data))
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
vis.append('svg:path')
    .attr('d', lineGen(this.data2))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
vis.append('svg:path')
    .attr('d', lineGen(this.data3))
    .attr('stroke', 'red')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
   }
}
