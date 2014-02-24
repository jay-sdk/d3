d3
==

messing with d3.js

-----------
force.html (and force.csv data file)

based on tutorial in https://leanpub.com/D3-Tips-and-Tricks/read. A force lay-out network graph with bi-directional edges, click enlarges a vertex, double-click returns to normal size.

Changes from the tutorial:

1. vertex colors based on weight, so vertices with few connections are pale orangey, those with the most connections are dark red.
2. 5-band opacity levels for edge weights/values
3. lighter "bend" in the edges


-----------

racial-preferences.html (and css and js files)

based on the chord diagram example in http://bl.ocks.org/mbostock/4062006, using data from:
http://faculty.chicagobooth.edu/emir.kamenica/documents/racialPreferences.pdf

Javascript changes:

1. drawing the chart turned to a function so it can be re-used for drawing multiple charts
2. tick adjustments
3. legend addition
