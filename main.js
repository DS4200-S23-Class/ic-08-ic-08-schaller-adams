const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 1000; 
const MARGINS = {left: 100, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

// Bar Chart 

const BAR = d3.select("#vis")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// read data and create plot
d3.csv("data/data.csv").then((data) => {

const X_SCALE = d3.scaleBand() 
                    .domain(["A", "B", "C", "D", "E"]) 
                    .range([0, VIS_WIDTH])
                    .paddingInner(0.1)
                    .paddingOuter(0.10); 

const Y_SCALE = d3.scaleLinear() 
                    .domain([100000, 0]) // max is 99 so some padding  
                    .range([0, VIS_HEIGHT]); 

// plot our values
BAR.selectAll("bar")
    .data(data) // passed from .then  
    .enter()     
    .append("rect")
        .attr("x", (d) => { return ((X_SCALE(d.Category)) + MARGINS.left); }) 
        .attr("y", (d) => { return ((Y_SCALE(d.Value)) + MARGINS.top); }) 
        .attr("width", X_SCALE.bandwidth())
        .attr("height", (d) => { return (VIS_HEIGHT - Y_SCALE(d.Value)); })
        .attr("class", "bar"); 


     // Add an axis to the vis 
BAR.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE))
          .attr("font-size", '20px'); 

BAR.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (MARGINS.top) + ")") 
        .call(d3.axisLeft(Y_SCALE).ticks(4)) 
          .attr("font-size", '20px'); 
});

