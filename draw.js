
document.addEventListener('DOMContentLoaded', () => {
    // General variables
    let svg = d3.select('#canvas');

    let points = [];
    let draw = false;


    // Event listeners
    svg.on('mousedown', function () {
        // Allow drawing
        draw = true;

        //Get mouse coordinates over canvas
        const coords = d3.mouse(this);

        // Draw
        draw_point(coords[0], coords[1], false);
    });

    svg.on('mouseup', function () {
        // Disable drawing
        draw = false;
    });

    svg.on('mousemove', function () {
        //Get mouse coordinates over canvas
        const coords = d3.mouse(this);

        // Draw
        draw_point(coords[0], coords[1], true);
    });

    document.querySelector("#clear-canvas").onclick = function () {
        svg.selectAll("*").remove();
    }

    // FUNCTIONS
    /// Draw 
    function draw_point(x, y, connect) {

        if (!draw)
            return

        // Get Brush color and thickness
        const color = document.querySelector('#color-picker').value;
        const thickness = document.querySelector('#thickness-picker').value;

        // Draw circle
        svg.append('circle')
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', thickness)
            .style('fill', color);

        // Draw connecting lines
        if (connect) {
            x_prev = points[points.length - 1][0];
            y_prev = points[points.length - 1][1];

            svg.append('line')
                .attr('x1', x_prev)
                .attr('y1', y_prev)
                .attr('x2', x)
                .attr('y2', y)
                .attr('stroke-width', thickness * 2)
                .style('stroke', color);
        }

        // Save point
        points.push([x, y])
    };
});