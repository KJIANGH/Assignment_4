
import * as d3 from "d3";
import { drawScatterPlot } from "./drawScatterPlot";


export let drawBarChart = (barChatLayer, data, xScale, yScale, barChartWidth, barChartHeight) => {

    

    //Task 7: Complete the code to draw the bars
    //Hint:
    //1. The bars are drawn as rectangles
    //2. Add a mouseover event to the bar
    //3. The mouseover event should also highlight the corresponding points in the scatter plot
    //4. The mouseout event should remove the highlight from the corresponding points in the scatter plot 
    //5. You can refer to the code in the drawScatterPlot function

    barChatLayer.selectAll('.bar')
      .data(data) //bind the data to the circle elements
      .enter() //create placeholder for each data point
      .append('rect') //append a circle element for each data point
      .attr('class', d=>`bar ${d.station.replace(/[^a-zA-Z]/g, "")}`) //set the class names of the circle element to 'point' and the station name
      .attr("x", d => xScale(d.station))
      .attr('y', d => yScale(d.start))
      .attr("width", xScale.bandwidth()) // Width of the bar
      .attr("height", d => barChartHeight - yScale(d.start)) // Height of the bar
      .style("fill", "steelblue")
      .style("stroke", "black")
      .style("stroke-width", 2)
      .on("mouseover", (event, d) => {

        
        d3.select(event.target)
          .style("fill", "red");

        let stationClass = d.station.replace(/[^a-zA-Z]/g, "");
        d3.select(`.point.${stationClass}`)
          .style("fill", "red")
          .attr("r", 10)
          .raise();

        d3.select('.highlight-rect')
          .style("fill", "yellow")
          .attr("opacity", 0.5);


      })

      .on("mouseout", (event, d) => {
        d3.select(event.target)
          .style("fill", "steelblue");

        let stationClass = d.station.replace(/[^a-zA-Z]/g, "");
        d3.select(`.point.${stationClass}`)
          .style("fill", "steelblue")
          .lower()
          .attr("r", 5);

        d3.select('.highlight-rect')
          .attr("opacity", 0);

      });
        

    //Task 8: Connect the bar chart with the scatter plot
    //Hint:
    //1. Add a mouseover event to the bar
    //2. The mouseover event should also highlight the corresponding points in the scatter plot

  }