(function() {

    // Set dimensions and margins of graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Parse date & time
    var parseTime = d3.timeParse('%d-%b-%y');

    // Set ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // Define the line
    var line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); })

    // Append the svg object to the body of the page
    // Append 'group' element to svg
    // Move 'group' element to top left margin
    var svg = d3.select('body').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Get the data
    d3.csv('data.csv', function(error, data) {
        if (error) throw error;

        // Format the data
        data.forEach(function(d) {
            d.date = parseTime(d.date);
            d.close = +d.close;
        })

        // Scale the range of data
        x.domain(d3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.close;
        })]);

        // Add the line path
        svg.append('path')
            .data([data])
            .attr('class', 'line')
            .attr('d', line);

        // Add the x axis
        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x));

        // Add the y axis
        svg.append('g')
            .call(d3.axisLeft(y));
    });

})();
