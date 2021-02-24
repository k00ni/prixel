/**
 * Data
 */
var colors = [
    'white',
    'red',
    'green',
    'blue',
    'yellow',
];

var gridData = [];

/**
 * Functions
 */

function getNextColor(number)
{
    ++number;

    if (number > colors.length) {
        return 0;
    } else if (number < 0) {
        return 0;
    }

    return number;
}

function initGrid(rows, columns)
{
    var html = '',
        tdList = [],
        cellIds = [];

    // draws row
    for (let tr = 0; tr < rows; ++tr) {
        html = '<tr>';
        tdList = [];

        // draws column
        for (let td = 0; td < columns; ++td) {
            html += '<td ';
            html += 'id="cell-' + tr + '-' + td + '"';
            html += 'class="clickable"';
            html += 'currentColorNumber="0"';
            html += '>';
            html += '</td>';

            cellIds.push('cell-' + tr + '-' + td);
            tdList.push(0);
        }

        gridData.push(tdList);

        html += '</tr>';
        $('#grid').append(html);
    };

    // register onclick on each cell
    cellIds.forEach(cellId => {
        $('#' + cellId).on('click', cellClicked);
    });

    setInterval(loadLatestData, 500);
}

function cellClicked()
{
    var cellId = $(this).attr('id'),
        currentColor = $(this).attr('currentColorNumber');

    // get next color
    var newColorNumber = getNextColor(currentColor);
    $(this).attr('currentColorNumber', newColorNumber);

    var nextColor = colors[newColorNumber];
    $('#'+cellId).css('background-color', nextColor);

    updateGridData();
}

/**
 * Sends an AJAX request to get latest data from server.
 */
function updateGridData()
{
    // rebuild gridData
    gridData = [];

    var colors = [];

    $('#grid tr').each(function() {
        colors = [];

        $('td', this).each(function() {
            colors.push($(this).attr('currentColorNumber'));
        });

        gridData.push(colors);
    });

    // send data to server
    $.ajax({
        url: "http://localhost:8023/",
        type: 'POST',
        data: {
            'gridData': gridData
        }
    })
    .done(function(data) {
        // ...
    });
}

function loadLatestData()
{
    $.ajax({
        url: "http://localhost:8023/",
        type: 'GET'
    })
    .done(function(data) {
        updateGrid(data);
    });
}

/**
 * Draws grid based on given data object.
 *
 * Usually called when getting new data from server.
 *
 * Data may look like:
 *
 *      data = [
 *          [0, 1],
 *          [1, 1]
 *      ]
 */
function updateGrid(data)
{
    var colorNumber = 0,
        tr = 0,
        td = 0;

    $('#grid tr').each(function() {
        td = 0;
        $('td', this).each(function() {
            colorNumber = data[tr][td];

            // update color of the table cell
            $(this)
                .attr('currentColorNumber', colorNumber)
                .css('background-color', colors[colorNumber]);

            ++td;
        });

        ++tr;
    });
}
