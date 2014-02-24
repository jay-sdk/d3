	// data from: http://faculty.chicagobooth.edu/emir.kamenica/documents/racialPreferences.pdf
	
	var matrix_female = [
	[1238, 95, 133, 299],
	[141, 9, 16, 35],
	[221, 19, 26, 71],
	[470, 40, 55, 131]
	];
	
	var matrix_male = [
	[1238, 141, 221, 470],
	[95, 9, 19, 40],
	[133, 16, 26, 55],
	[299, 35, 71, 131]
	];
	
	var labels = ["white", "black", "hispanic", "asian"];
	
	var chord_female = d3.layout.chord()
		.padding(.05)
		.sortSubgroups(d3.descending)
		.matrix(matrix_female);
		
	var chord_male = d3.layout.chord()
		.padding(.05)
		.sortSubgroups(d3.descending)
		.matrix(matrix_male);
		
	var width = 500,
		height =500,
		innerRadius = Math.min(width, height) *.41,
		outerRadius = innerRadius * 1.1;
		
	var fill = d3.scale.ordinal()
		.domain(d3.range(4))
		.range(["#F0F0F0", "#000000", "#957244", "#FFF089"]);
		
	var svg_female = d3.select("#chart_female").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
			.attr("transform", "translate(" + width/2 + "," + height/2 + ")");
	
	var svg_male = d3.select("#chart_male").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
			.attr("transform", "translate(" + width/2 + "," + height/2 + ")");
			
	createChart(svg_female, chord_female);
	createChart(svg_male, chord_male);
	drawLegend();
			
function createChart(svg, chord){
	
	svg.append("g").selectAll("path")
		.data(chord.groups)
		.enter().append("path")
		.style("fill", function(d){ return fill(d.index); })
		.style("stroke", function(d){ return fill(d.index); })
		.attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
		.on("mouseover", fade(svg,.1))
		.on("mouseout", fade(svg,1));
		
	var ticks = svg.append("g").selectAll("g")
		.data(chord.groups)
		.enter().append("g").selectAll("g")
		.data(groupTicks)
		.enter().append("g")
		.attr("transform", function(d){
			return "rotate(" + (d.angle*180/Math.PI-90) + ")" + "translate(" + outerRadius + ",0)";
		});
		
	ticks.append("line")
		.attr("x1", 1)
		.attr("y1", 0)
		.attr("x2", 5)
		.attr("y2", 0)
		.style("stroke", "#000");
		
	ticks.append("text")
		.attr("x", 8)
		.attr("dy", ".35em")
		.attr("class", "tick")
		.attr("transform", function(d){ return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
		.style("text-anchor", function(d){ return d.angle > Math.PI ? "end" : null; })
		.text(function(d){ return d.label; });
		
	svg.append("g")
		.attr("class", "chord")
		.selectAll("path")
		.data(chord.chords)
		.enter().append("path")
		.attr("d", d3.svg.chord().radius(innerRadius))
		.style("fill", function(d){ return fill(d.target.index); })
		.style("opacity", 1);
}

function drawLegend(){
	//dimensions of legend item: width, height, spacing, radius of rounded rect
	var li = { w: 75, h: 30, s: 5, r: 3};
	
	var legend = d3.select("#legend").append("svg")
		.attr("width", labels.length * (li.w + li.s))
		.attr("height", (li.h + li.s));
		
	var g = legend.selectAll("g")
		.data(labels)
		.enter().append("g")
		.attr("transform", function(d, i){
			return "translate(" + i * (li.w + li.s) + "," + 0 + ")";
		});
		
	g.append("svg:rect")
		.attr("rx", li.r)
		.attr("ry", li.r)
		.attr("width", li.w)
		.attr("height", li.h)
		.style("fill", function(d){ return fill(d);});
		
	g.append("svg:text")
		.attr("x", li.w/2)
		.attr("y", li.h/2)
		.attr("dy", "0.35em")
		.attr("text-anchor", "middle")
		.attr("class", "shadow")
		.text(function(d) { return d; });
		
	g.append("svg:text")
		.attr("x", li.w/2)
		.attr("y", li.h/2)
		.attr("dy", "0.35em")
		.attr("text-anchor", "middle")
		.text(function(d) { return d; });
		
}
		
	//returns an array of tick angles and labels, given a group
	function groupTicks(d){
		var k = (d.endAngle - d.startAngle)/d.value;
		return d3.range(0, d.value, 25).map(function(v, i){
			return {
				angle: v*k + d.startAngle,
				label: i % 4 ? null : v
			};
		});
	}
	
	// returns an event handler for fading a given chord group
	function fade(svg, opacity){
		return function(g, i){
			svg.selectAll(".chord path")
				.filter(function(d){ return d.source.index != i && d.target.index != i; })
				.transition()
				.style("opacity", opacity);
		};
	}