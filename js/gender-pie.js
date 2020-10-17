var backgroundArc = d3.arc()
  .innerRadius(27)
  .outerRadius(40)
  .cornerRadius(10)
  .startAngle(0)
  .endAngle(Math.PI*2);
  
var mainArc = d3.arc()
  .innerRadius(27)
  .outerRadius(40)
  .cornerRadius(10)
  .startAngle(0)
  .endAngle(function(d) { return d/100*Math.PI* 2 });

var tooltip = d3.select("body").append("div");
  
//voters gender male 69680. female 74290
var data = [48.40]
  
var svg6 = d3.select("#demographic-gender").append("svg")
  .attr("viewBox", "0 0 100 100");
  
var charts = svg6.selectAll("g")
  .data(data)
  .enter()
  .append("g")
  .attr("transform",function(d,i) { 
     return "translate("+(i*100+50)+",45)";
  });
  
charts.append("path")
  .attr("d", backgroundArc)
  .attr("fill","#246fed")
  .on("mousemove", function(d){
            tooltip
                .attr("class", "tooltip1")
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html("Population:" + "<br>" + "74,290");
        })
      .on("mouseout", function(d){tooltip.style("display", "none");});

charts.append("path")
  .attr("d", mainArc) 
  .attr("fill","#96aff8")
  .on("mousemove", function(d){
            tooltip
        //.style("visibility", "visible")
                .attr("class", "tooltip1")
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html("Population:" + "<br>" + "69,680");
        })
      .on("mouseout", function(d){tooltip.style("display", "none");});