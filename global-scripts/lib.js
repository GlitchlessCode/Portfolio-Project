//#region -- Global Functions --
/*
These are functions that are intended to be used by any of my projects
*/

// - Async Pause -
const timer = ms => new Promise(res => setTimeout(res, ms));

// - Helpers -
function docGetID(id) {
    return document.getElementById(id);
}

function docGetClass(className) {
    return document.getElementsByClassName(className);
}

// - Dropdown Menu -
// Used for the toolbar
function dropdownToggle(toggle, array) {
    toggle = !toggle; // Invert the toggle
    if (toggle === true) { // If true, open the dropdown
        for (let n = 0; n < array.length; n++) {
            array[n].classList.add("smallDropdown");
        }
    }
    if (toggle === false) { // If false, close the dropdown
        for (let n = 0; n < array.length; n++) {
            array[n].classList.remove("smallDropdown");
        }
    }
    return toggle; // return toggle value
}

// - Add button -
// Used for toolbar
function addDropdownButton(string) {
    // Create / Get document elements
    let menuEl = docGetID("dropdownList"); 
    const listEL = document.createElement('li');
    let buttonEl = document.createElement('div');

    // Set button name
    buttonEl.append(string);

    // Modify elements
    buttonEl.classList.add("dropdownButton");
    buttonEl.classList.add("smallDropdown");
    buttonEl.setAttribute("unselectable", 'on');
    buttonEl.setAttribute("onselectstart", 'return false;');
    buttonEl.setAttribute("onmousedown", 'return false;');

    // Append new button to new list item
    listEL.append(buttonEl);

    // Append new list item(+button) to dropdown menu
    menuEl.append(listEL);

    // Return the button element
    return buttonEl;
}

// - Mouse handler -
function getMousePos(event, canvas) {
    // Create / Get variables
    let canvasOffset = canvas.getBoundingClientRect();
    let mouse = {
        x: 0,
        y: 0
    }
    event.preventDefault();
    // Get mouse position
    mouse.x = 1 + (Math.round(+event.clientX - canvasOffset.left));
    mouse.y = 1 + (Math.round(+event.clientY - canvasOffset.top));
    // return mouse position object
    return mouse;
}

// - Go to Home Page -
// Go to the home page
function gotoHome() {
    location.replace("../mainPage/")
}

// - Beveled rectangle -
CanvasRenderingContext2D.prototype.cutCorner = function (x, y, width, height, distance) {
    this.moveTo(x, y);
    this.lineTo(x + (width - distance), y);
    this.lineTo(x + width, y + distance);
    this.lineTo(x + width, y + height);
    this.lineTo(x, y + height);
    this.closePath();
}

// - Rounded Rectangle -
CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
}

// - Parellelogram [Unfinished] -
CanvasRenderingContext2D.prototype.parallelogram = function (x, y, width, height, angle, rotated) {
    // Error catching
    if (typeof rotated !== 'boolean' && rotated !== undefined) throw `ReferenceError: ${rotated} is not a Boolean`
    if (Math.abs(angle) > 44) throw `RangeError: Invalid angle (cannot be greater than 44 or less than -44, given value: ${angle})`;

    if (!rotated) {
        let offset = height * Math.tan(angle * (Math.PI / 180));
        this.beginPath();
        if (angle >= 0) {
            this.moveTo(x + offset, y);
            this.lineTo(x, y + height);
            this.lineTo(x + width - offset, y + height);
            this.lineTo(x + width, y);
        } else {
            this.moveTo(x, y);
            this.lineTo(x - offset, y + height);
            this.lineTo(x + width, y + height);
            this.lineTo(x + width + offset, y);
        }
        this.closePath();
        this.fill();
    } else {
        let offset = width * Math.tan(angle * (Math.PI / 180));
        this.beginPath();
        if (angle >= 0) {
            this.moveTo(x, y + offset);
            this.lineTo(x, y + height);
            this.lineTo(x + width, y + height - offset);
            this.lineTo(x + width, y);
        } else {
            this.moveTo(x, y);
            this.lineTo(x, y + height + offset);
            this.lineTo(x + width, y + height);
            this.lineTo(x + width, y - offset);
        }
        this.closePath();
        this.fill();
    }

}

// - Create an Image -
// Draw and image
function createImage(source, canvas2dContext, canvas) {
    // source = {
        // url: image,
        // zoom: number,
        // zoomVal: number,
        // zoomSin: number,
        // zooming: number,
        // prevZooming: number,
        // prevZoom: number,
        // x: number,
        // y: number
    // }

    // Get canvas width & height
    let width = canvas.width + (source.zoom * (canvas.width / canvas.height))
    let height = canvas.height + source.zoom;

    // Get source image coordinates
    let coords = {
        x: 0 - (source.x / canvas.width) * (width - canvas.width),
        y: 0 - (source.y / canvas.height) * (height - canvas.height)
    };

    // Draw the image
    canvas2dContext.drawImage(source.url, coords.x, coords.y, width, height);
}

// - Insertion Sort -
// Insertion sort
function insertionSort(array) {
    // Create variable
    let result = [...array];

    // For each index
    for (let a = 1; a < result.length; a++) {

        // Store the value of the current index
        let key = result[a];

        // Store the index of the previous index
        let b = a - 1;

        // While previous index is greater than or equal to 0 AND value of previous index
        while (b >= 0 && key < result[b]) {
            // Set current index to previous index
            result[b + 1] = result[b];
            // Move current and preious index back one
            b--;
        }
        result[b + 1] = key;
    }
    // Return final result
    return result;
}

// - Merge Two Arrays -
function mergeArrays(leftArray, rightArray) {
    // Create variable
    let result = new Array();

    // While left array and right array are both longer than 0
    while (leftArray.length && rightArray.length) {

        // If value of left array, index 0 is greater than value of right array, index 0
        if (leftArray[0] < rightArray[0]) {
            // Shift left array, index 0 to result array
            result.push(leftArray.shift());
        } else { //Otherwise
            // Shift right array, index 0 to result array
            result.push(rightArray.shift());
        }
    }

    // Return array composed of result array, remainder of left array or remainder of right array, whichever exists
    return [...result, ...leftArray, ...rightArray];
}

// - Merge Sort -
function mergeSort(array) {

    // if array length is less than two, return array
    if (array.length < 2) return array;

    // Otherwise, set get split point in the middle
    let split = Math.floor(array.length / 2);

    // Set left array to the first half of array
    const leftArray = array.splice(0, split);

    // return the result of merging the result of sorting the left array and the right array
    // (recursive)
    return mergeArrays(mergeSort(leftArray), mergeSort(array));
}

// - Swap Array Items In Place -
function swapItems(array, indexA, indexB) {
    // set temporary variable to value at index A
    let temp = array[indexA];
    // set value at index A to value at index B
    array[indexA] = array[indexB];
    // set value at index B to temporary variable (original value of index A)
    array[indexB] = temp;
}

// - Quick Sort Partition Sort -
function quickSortPartition(array, left, right) {
    // Set pivot point to average of left and right cursors
    let pivot = array[Math.floor((left + right) / 2)];
    // Set cursor positions
    let leftCursor = left;
    let rightCursor = right;

    // while the left cursor is to the left of, or on the same index as the right cursor
    while (leftCursor <= rightCursor) {

        // while VALUE of left cursor's position is less than that of the pivot
        while (array[leftCursor] < pivot) {
            // Move the left cursor to the right
            leftCursor++;
        }
        // while VALUE of right cursor's position is greater than that of the pivot
        while (array[rightCursor] > pivot) {
            // Move the right cursor to the left
            rightCursor--;
        }

        // if the left cursor is to the left of, or on the same index as the right cursor
        if (leftCursor <= rightCursor) {
            // Swap the values of the left cursor and the right cursor
            swapItems(array, leftCursor, rightCursor);
            // Move the left crusor to the right, and the right cursor to the left
            leftCursor++;
            rightCursor--;
        }

    }
    // Return the position of the left cursor
    return leftCursor;
}

// - Quick Sort -
function quickSort(array, left, right) {

    // if the array length is less than 2, return the array
    if (array.length < 2) return array;

    // set index to the returned value of quicksorting a partition (returned value is position of left cursor when done sorting)
    let index = quickSortPartition(array, left, right);

    // if default left position is less than that of the new left cursor position - 1
    if (left < index - 1) {
        // quick sort the array from the default left cursor to the new left cursor - 1
        // (recursive)
        quickSort(array, left, index - 1);
    }

    // if default right position is greater than that of the new left cursor position
    if (right > index) {
        // quick sort the array from the new left cursor to the default right cursor
        // (recursive)
        quickSort(array, index, right);
    }

    // return the array
    return array;
}

// - File Reading -
function readJSONFile(file) {
    // return a promise
    return new Promise(function (resolve, reject) {
        // create a xml http request
        let rawFile = new XMLHttpRequest();
        // set mime type (file type) to json
        rawFile.overrideMimeType("application/json");
        // get the file
        rawFile.open("GET", file, true);
        // if loaded
        rawFile.onload = function () {
            // if loaded FULLY
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                // resolve (returns text contained within json file)
                resolve(rawFile.responseText);
            } else { // otherwise
                // reject (throw error)
                reject({
                    status: this.status,
                    statusText: rawFile.statusText
                });
            }
        };
        // if error
        rawFile.onerror = function () {
            // reject (throw error)
            reject({
                status: this.status,
                statusText: rawFile.statusText
            });
        }
        // send request
        rawFile.send(null);
    });
}

// - Parse JSON -
function parseJSON(text) {
    let result = undefined;
    try {
        result = JSON.parse(text);
    } catch (error) {
        console.warn(error);
    }
    return result;
}

// - PVector Class -
/*
Point vector
stores an x and a y
can subtract or add two point vectors
*/
class PVector {
    x;
    y;

    constructor(x, y) {
        // Error catching
        if (arguments.length < 2) throw new TypeError(`Failed to create new 'PVector' : 2 arguments required, but only ${arguments.length} present.`);

        if (typeof x !== 'number') throw new ReferenceError(`x is not of type Number`);
        if (typeof y !== 'number') throw new ReferenceError(`y is not of type Number`);

        // Set x and y values
        this.x = x;
        this.y = y;
    }
    sub(vector) {
        // Error catching
        if (arguments.length < 1) throw new TypeError(`Failed to execute 'sub' on 'PVector' : 1 arguments required, but only ${arguments.length} present.`);

        if (vector instanceof PVector !== true) throw new ReferenceError(`Failed to execute 'sub' on 'PVector' : vector is not of type PVector`);

        // Subract x and y values
        this.x -= vector.x;
        this.y -= vector.y;
    }
    add(vector) {
        // Error catching
        if (arguments.length < 1) throw new TypeError(`Failed to execute 'add' on 'PVector' : 1 arguments required, but only ${arguments.length} present.`);

        if (vector instanceof PVector !== true) throw new ReferenceError(`Failed to execute 'add' on 'PVector' : vector is not of type PVector`);

        // Add x and y values
        this.x += vector.x;
        this.y += vector.y;
    }
}

// - Poly vs Poly Intersection -
/*
Polygon against Polygon Intersection detection
deconstructs one polygon into line segments
*/
function polyPoly(vectorArray1, vectorArray2) {
    // Error catching
    if (arguments.length < 2) throw new TypeError(`Failed to execute 'polyPoly' : 2 arguments required, but only ${arguments.length} present.`);

    if (vectorArray1 instanceof Array === true) {
        let index = 0;
        vectorArray1.forEach(element => {
            if (element instanceof PVector === false) throw new ReferenceError(`Failed to execute 'polyPoly' : element ${index} of vectorArray1 is not of type PVector`);
            index++;
        });
        if (vectorArray1.length < 3) throw new TypeError(`Failed to execute 'polyPoly' : at least 3 PVectors required in vectorArray1, but only ${vectorArray1.length} present.`);
    } else throw new ReferenceError(`Failed to execute 'polyPoly' : vectorArray1 is not of type Array`);

    if (vectorArray2 instanceof Array === true) {
        let index = 0;
        vectorArray2.forEach(element => {
            if (element instanceof PVector === false) throw new ReferenceError(`Failed to execute 'polyPoly' : element ${index} of vectorArray2 is not of type PVector`);
            index++;
        });
        if (vectorArray2.length < 3) throw new TypeError(`Failed to execute 'polyPoly' : at least 3 PVectors required in vectorArray2, but only ${vectorArray2.length} present.`);
    } else throw new ReferenceError(`Failed to execute 'polyPoly' : vectorArray2 is not of type Array`);

    // create next
    let next = 0;
    // for each PVector in the first polygon
    for (let current = 0; current < vectorArray1.length; current++) {
        // Set next index to current index + 1
        next = current + 1;
        // if next index is equal to total number of vectors + 1, set next index to 0
        if (next === vectorArray1.length) next = 0;

        // Get current, and next vertices
        let currentVert = vectorArray1[current];
        let nextVert = vectorArray1[next];

        // Check for intersections between Second polygon and individual line segments
        let collision = polyLine(vectorArray2, currentVert.x, currentVert.y, nextVert.x, nextVert.y);
        // If true, return true
        if (collision) return true;
        // Otherwise
        // Check if first vector is anywhere inside second polygon
        collision = polyPoint(vectorArray1, vectorArray2[0].x, vectorArray2[0].y);
        // If true, return true
        if (collision) return true;
    }
    // Otherwise
    // Return false
    return false;
}

// - Poly vs Line Intersection -
/*
Polygon against Line Segment Intersection detection
Deconstructs polygon into line segments
*/
function polyLine(vertices, x1, y1, x2, y2) {
    // Error catching
    if (arguments.length < 5) throw new TypeError(`Failed to execute 'polyLine' : 5 arguments required, but only ${arguments.length} present.`);

    if (vertices instanceof Array === true) {
        let index = 0;
        vertices.forEach(element => {
            if (element instanceof PVector === false) throw new ReferenceError(`Failed to execute 'polyLine' : element ${index} of vertices is not of type PVector`);
            index++;
        });
        if (vertices.length < 2) throw new TypeError(`Failed to execute 'polyLine' : at least 2 PVectors required in vertices, but only ${vertices.length} present.`);
    } else throw new ReferenceError(`Failed to execute 'polyLine' : vertices is not of type Array`);

    for (let i = 1; i < 5; i++) {
        if (typeof arguments[i] !== 'number') {
            switch (i) {
                case 1:
                    throw new ReferenceError(`Failed to execute 'polyLine' : x1 is not of type Number`);
                case 2:
                    throw new ReferenceError(`Failed to execute 'polyLine' : y1 is not of type Number`);
                case 3:
                    throw new ReferenceError(`Failed to execute 'polyLine' : x2 is not of type Number`);
                case 4:
                    throw new ReferenceError(`Failed to execute 'polyLine' : y2 is not of type Number`);
            }
        }
    }

    // Create next
    let next = 0;
    // For each PVector in the polygon
    for (let current = 0; current < vertices.length; current++) {
        // Set next index to current index + 1
        next = current + 1;
        // If next index is equal to total number of vectors + 1, set next index to 0
        if (next === vertices.length) next = 0;

        // Get current and next vertices
        let
            x3 = vertices[current].x,
            y3 = vertices[current].y,
            x4 = vertices[next].x,
            y4 = vertices[next].y;

        // Check for collision between line segment and current line segment
        let hit = lineLine(x1, y1, x2, y2, x3, y3, x4, y4);
        // If true, return true
        if (hit) return true;
    }
    // Otherwise
    // return false
    return false;
}

// - Poly vs Point Collision -
/*
Polygon against point containment detection
*/
function polyPoint(vertices, pointX, pointY) {
    // Error catching
    if (arguments.length < 3) throw new TypeError(`Failed to execute 'polyPoint' : 3 arguments required, but only ${arguments.length} present.`);

    if (typeof pointX !== 'number') throw new ReferenceError(`Failed to execute 'polyPoint' : pointX is not of type Number`);
    if (typeof pointY !== 'number') throw new ReferenceError(`Failed to execute 'polyPoint' : pointY is not of type Number`);

    if (vertices instanceof Array === true) {
        let index = 0;
        vertices.forEach(element => {
            if (element instanceof PVector === false) throw new ReferenceError(`Failed to execute 'polyPoint' : element ${index} of vertices is not of type PVector`);
            index++;
        });
        if (vertices.length < 3) throw new TypeError(`Failed to execute 'polyPoint' : at least 3 PVectors required in vertices, but only ${vertices.length} present.`);
    } else throw new ReferenceError(`Failed to execute 'polyPoint' : vertices is not of type Array`);

    // Create collision
    let collision = false;
    // Create next
    let next = 0;
    // For each PVector in polygon
    for (let current = 0; current < vertices.length; current++) {
        // Set next index to current index + 1
        next = current + 1;
        // If next index is equal to total number of vectors + 1, set next index to 0
        if (next === vertices.length) next = 0;
        // Get current and next vertices
        let currentVert = vertices[current];
        let nextVert = vertices[next];

        /*
        Vertices:
            current,
            next,
            point
        The following is adapted from
        http://www.jeffreythompson.org/collision-detection/poly-poly.php

        If:
        (   
            (   
                (
                    current vertex's y is greater than point's y
                    AND
                    next vertex's y is less than point's y
                )
                OR
                (
                    current vertex's y is less than point's y
                    AND
                    next vertex's y is greater than point's y
                )
            )
            AND
            (
                point's x is less than
                (
                    (
                        next vertex's x minus current vertex's x
                    )
                    multiplied by
                    (
                        point's y minus current vertex's y
                    )
                    divided by
                    (
                        next vertex's y minus current vertex's y
                    )
                    plus current vertex's x
                )
            )
        */
        if (((currentVert.y > pointY && nextVert.y < pointY) || (currentVert.y < pointY && nextVert.y > pointY)) && (pointX < (nextVert.x - currentVert.x) * (pointY - currentVert.y) / (nextVert.y - currentVert.y) + currentVert.x)) {
            collision = !collision;
        }
    }
    // Return collision (true/false)
    return collision;
}

// - Line vs Line Intersection -
/*
    Line Segment against Line Segment intersection detection
*/
function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    // Error catching
    if (arguments.length < 8) throw new TypeError(`Failed to execute 'lineLine' : 8 arguments required, but only ${arguments.length} present.`);

    for (let i = 0; i < 8; i++) {
        if (typeof arguments[i] !== 'number') {
            switch (i) {
                case 0:
                    throw new ReferenceError(`Failed to execute 'lineLine' : x1 is not of type Number`);
                case 1:
                    throw new ReferenceError(`Failed to execute 'lineLine' : y1 is not of type Number`);
                case 2:
                    throw new ReferenceError(`Failed to execute 'lineLine' : x2 is not of type Number`);
                case 3:
                    throw new ReferenceError(`Failed to execute 'lineLine' : y2 is not of type Number`);
                case 4:
                    throw new ReferenceError(`Failed to execute 'lineLine' : x3 is not of type Number`);
                case 5:
                    throw new ReferenceError(`Failed to execute 'lineLine' : y3 is not of type Number`);
                case 6:
                    throw new ReferenceError(`Failed to execute 'lineLine' : x4 is not of type Number`);
                case 7:
                    throw new ReferenceError(`Failed to execute 'lineLine' : y4 is not of type Number`);
            }
        }
    }

    // The following is adapted from
    // http://www.jeffreythompson.org/collision-detection/poly-poly.php
    let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    // If uA and UB are both between 0 and 1
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        // return true
        return true;
    }
    // Otherwise
    // return false
    return false;
}

// - Generate UUIDv4 -
// Taken from
// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

// - Join Strings in an Array -
// Joins multiple strings inside of an array together into one index
Array.prototype.mergeStrings = function (startIndex, joinCount, splitter) {
    // Error catching
    if (startIndex + joinCount > this.length) throw new RangeError('Invalid join count')
    // For every index in the specified range
    for (let index = startIndex + 1; index < startIndex + joinCount; index++) {
        // Join indices together
        this[startIndex] = this[startIndex] + splitter + this[index];
    }
    // Remove excess indices
    this.splice(startIndex + 1, Math.max(0, joinCount - 1));
}

// - Remap range to other range -
// Adapted from
// https://stackoverflow.com/questions/5649803/remap-or-map-function-in-javascript
function mapRange(value, oldMin, oldMax, newMin, newMax) {
    return (((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin
}

//#endregion

//#region -- Local Functions --
/*
I'm not sure why I put these here
Technically, they could each be put in their own local folders, and that would save on loading time, but I'm to lazy to do that now, so they stay here
*/

//#region - Gravity Sim -

// Checks for the press of a fake button on the canvas
function checkButtonPress(event, button, canvas) {
    !event.preventDefault();
    // get the mouse position
    mousePos = getMousePos(event, canvas);
    // If it's on the button
    if (mousePos.x > button.x && mousePos.y > button.y && mousePos.x < button.x + button.w && mousePos.y < button.y + button.h) {
        // return true
        return true;
    } else { //Otherwise
        // return false
        return false;
    }
}

// Check if shift key is held
function checkShift(shiftBool, newValue, oldValue) {
    // If shift is held
    if (shiftBool) {
        if (newValue > oldValue) {
            return 4;
        } else if (newValue < oldValue) {
            return -4;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}
//#endregion

//#region - Maze Generator -

// Generate Grid Array
// Generates a 2D array
function generateGrid(gridWidth, gridHeight) {
    let grid = new Array()
    let set = 0;
    for (let x = 0; x < gridWidth; x++) {
        grid.push(new Array());
        for (let y = 0; y < gridHeight; y++) {
            grid[x].push(new Object({
                set: set,
                x: x,
                y: y
            }));
            set++;
        }
    }
    return grid;
}

// Draw Grid

function drawGrid(canvas, canvasContext, gridArray, margin, backgroundColor) {
    // Set canvas width and height to Maze dimensions
    canvas.width = (gridArray.length * 20 - 10) + margin * 2;
    canvas.height = (gridArray[0].length * 20 - 10) + margin * 2;

    // Create background
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = backgroundColor;
    canvasContext.fillRect(margin, margin, canvas.width - margin * 2, canvas.height - margin * 2);

    // Draw cells
    canvasContext.fillStyle = backgroundColor;
    for (let x = 0; x < gridArray.length; x++) {
        for (let y = 0; y < gridArray[0].length; y++) {
            canvasContext.fillRect((x * 20) + margin, (y * 20) + margin, 10, 10);
        }
    }
    // Draw permanent walls
    canvasContext.fillStyle = 'black';
    for (let x = 0; x < gridArray.length - 1; x++) {
        for (let y = 0; y < gridArray[0].length - 1; y++) {
            canvasContext.fillRect((x * 20) + 10 + margin, (y * 20) + 10 + margin, 10, 10);
        }
    }
}

// Generate Wall Array

function generateWalls(gridArray) {
    let horizontalWalls = new Array();
    let verticalWalls = new Array();

    // Generate Horizontal Walls
    // Generates a 2D array
    for (let y = 0; y < (gridArray[0].length); y++) {
        horizontalWalls.push(new Array());
        for (let x = 0; x < (gridArray.length - 1); x++) {
            horizontalWalls[y].push(new Object({
                leftCell: gridArray[x][y],
                rightCell: (gridArray[x + 1][y])
            }));
        }
    }
    // Generate Vertical Walls
    // Generates a 2D array
    for (let x = 0; x < (gridArray.length); x++) {
        verticalWalls.push(new Array());
        for (let y = 0; y < (gridArray[0].length - 1); y++) {
            verticalWalls[x].push(new Object({
                aboveCell: gridArray[x][y],
                belowCell: (gridArray[x][y + 1])
            }));
        }
    }
    // Create wall object
    let walls = {
        horizontalWalls: horizontalWalls,
        verticalWalls: verticalWalls
    };
    // return wall object
    return walls;
}

// Draw Walls

function drawWalls(canvasContext, wallsObject, margin) {
    // Draw horizontal walls
    canvasContext.fillStyle = 'black';
    for (let y = 0; y < wallsObject.horizontalWalls.length; y++) {
        for (let x = 0; x < wallsObject.horizontalWalls[y].length; x++) {
            canvasContext.fillRect((wallsObject.horizontalWalls[y][x].leftCell.x * 20 + 10) + margin, (wallsObject.horizontalWalls[y][x].leftCell.y * 20) + margin, 10, 10);
        }
    }
    // Draw vertical walls
    for (let x = 0; x < wallsObject.verticalWalls.length; x++) {
        for (let y = 0; y < wallsObject.verticalWalls[x].length; y++) {
            canvasContext.fillRect((wallsObject.verticalWalls[x][y].aboveCell.x * 20) + margin, (wallsObject.verticalWalls[x][y].aboveCell.y * 20 + 10) + margin, 10, 10);
        }
    }
}

// Check for disconnected Cells

function checkCells(gridArray) {
    // Get set of first cell
    let cellCheck = gridArray[0][0].set
    // For each cell
    for (let x = 0; x < gridArray.length; x++) {
        for (let y = 0; y < gridArray[0].length; y++) {
            // If cell does not have the same set as the first cell, return false
            if (cellCheck != gridArray[x][y].set) return false;
        }
    }
    // Otherwise
    // return true
    return true;
}

// Calculate Decorative Squares
// Determine largest group of connected cells
function calculateSquares(gridArray) {
    let sets = new Object();
    // For each cell
    for (let x = 0; x < gridArray.length; x++) {
        for (let y = 0; y < gridArray[0].length; y++) {
            // If the value of the set is not undefined
            if (sets[gridArray[x][y].set] !== undefined) {
                // increment value of set by one
                sets[gridArray[x][y].set] = sets[gridArray[x][y].set] + 1;
            } else { //Otherwise
                // set value to one
                sets[gridArray[x][y].set] = 1;
            }

        }
    }

    // Get values and keys
    const setsArray = Object.values(sets);
    const setsKey = Object.keys(sets);
    // Get the largest set (highest value)
    const maxNum = Math.max(...setsArray);
    // Get index of largest set
    const maxNumArrayIndex = setsArray.indexOf(maxNum);
    // Get set number
    const propertyValue = +setsKey[maxNumArrayIndex]

    let result = new Array();

    // For each cell
    for (let x = 0; x < gridArray.length; x++) {
        for (let y = 0; y < gridArray[0].length; y++) {
            // If cell is in largest set
            if (gridArray[x][y].set === propertyValue) {
                // Add to result array
                result.push(gridArray[x][y]);
            }
        }
    }
    // return result array
    return result;
}

// Convert cells and walls to maze
/*
converts array of cells, and arrays of walls to single 2D array of nodes for use in A* Pathfinding algorithm
*/
function convertToMaze(wallsObject, gridSize) {
    // Create maze array
    let mazeArray = new Array();

    // Generate 2d Array
    for (let x = 0; x < (gridSize.width * 2) - 1; x++) {
        mazeArray.push(new Array());
        for (let y = 0; y < (gridSize.height * 2) - 1; y++) {
            mazeArray[x].push(new Object({
                x: x,
                y: y,
                gCost: 0,
                hCost: 0,
                fCost: 0,
                type: undefined,
                parent: undefined
            }));
            // Set cells
            if (x % 2 === 0 && y % 2 === 0) {
                mazeArray[x][y].type = 'emptyCell';
            }
            // Set permanent walls
            if (x % 2 === 1 && y % 2 === 1) {
                mazeArray[x][y].type = 'wall';
            }
            // Set remaining horizontal walls
            if (x % 2 === 1 && y % 2 === 0) {
                check_horizontal_walls: for (let arrayY = 0; arrayY < wallsObject.horizontalWalls.length; arrayY++) {
                    for (let arrayX = 0; arrayX < wallsObject.horizontalWalls[arrayY].length; arrayX++) {
                        if (wallsObject.horizontalWalls[arrayY][arrayX].leftCell.x * 2 + 1 === x && wallsObject.horizontalWalls[arrayY][arrayX].leftCell.y * 2 === y) {
                            mazeArray[x][y].type = 'wall'
                            break check_horizontal_walls;
                        }
                    }
                }
            }
            // Set remaining vertical walls
            if (x % 2 === 0 && y % 2 === 1) {
                check_vertical_walls: for (let arrayX = 0; arrayX < wallsObject.verticalWalls.length; arrayX++) {
                    for (let arrayY = 0; arrayY < wallsObject.verticalWalls[arrayX].length; arrayY++) {
                        if (wallsObject.verticalWalls[arrayX][arrayY].aboveCell.x * 2 === x && wallsObject.verticalWalls[arrayX][arrayY].aboveCell.y * 2 + 1 === y) {
                            mazeArray[x][y].type = 'wall'
                            break check_vertical_walls;
                        }
                    }
                }
            }
            // Everything left over is a cell
            if (mazeArray[x][y].type === undefined) {
                mazeArray[x][y].type = 'emptyCell';
            }
            // Top right corner is the exit
            if (x === gridSize.width * 2 - 2 && y === 0) {
                mazeArray[x][y].type = 'exitCell';
            }
            // Bottom left is the entrance
            if (x === 0 && y === gridSize.height * 2 - 2) {
                mazeArray[x][y].type = 'entranceCell';
            }

        }
    }
    // Return maze array
    return mazeArray;
}

// Find a path to the end
function findPath(startingNode, targetNode, mazeGrid) {
    // create open and closed sets
    let openSet = new Array();
    let closedSet = new Array();

    // Starting from the starting node
    // hCost (or heuristic cost) is the approximate distance (without walls) to the end
    // gCost is the exact distance to the starting node (in this case: 0)
    // fCost is gCost + hCost
    startingNode.hCost = getDistance(startingNode, targetNode);
    startingNode.fCost = startingNode.gCost + startingNode.hCost;

    // Add the starting node the the open set
    openSet.push(startingNode);
    // as long as the open set is longer than 0 (has contents)
    while (openSet.length > 0) {
        // set current node to the first item in the open set
        let node = openSet[0]
        let index = 0;

        // Starting from the second index, for every index in the open set
        for (let n = 1; n < openSet.length; n++) {
            // If the current index's fCost is lower than, or equal to the current node's fCost
            if (openSet[n].fCost <= node.fCost) {
                // If the current index's hCost is lower than the current node's hCost
                if (openSet[n].hCost < node.hCost) {
                    // Set the current node to the current index
                    node = openSet[n];
                    // Set the index value to the current index position
                    index = n;
                }
            }
        }
        // Remove the current node from the open set, and add it to the closed set
        openSet.splice(index, 1);
        closedSet.push(node);

        // If the current node is the target node (the exit)
        if (node === targetNode) {
            // retrace the path
            let path = retracePath(startingNode, targetNode);
            // create result object (path and closed set)
            let result = {
                path: path,
                closedSet: closedSet,
            }
            return result;
        }
        // Otherwise
        // for every neighbour node of the current node
        for (const neighbour of getNeighbours(mazeGrid, node)) {
            // If the neighbour node is a wall, or the neighbour is in the closed set, then skip
            if (neighbour.type === 'wall' || closedSet.includes(neighbour)) continue;
            // Otherwise
            // Set newGCost to the current node's gCost plus the distance between the current node and the neighbour
            let newGCost = node.gCost + getDistance(node, neighbour);
            // If the newGCost is less than that of the neighbour's current gCost
            if (newGCost < neighbour.gCost || !openSet.includes(neighbour)) {
                neighbour.gCost = newGCost;
                neighbour.hCost = getDistance(neighbour, targetNode);
                neighbour.parent = node;

                if (!openSet.includes(neighbour)) openSet.push(neighbour);
            }
        }
    }
}

// Retrace Final Path
// Retrace path through maze
function retracePath(startingNode, targetNode) {
    // Create array
    let path = new Array();
    // Start from end node
    let currentNode = targetNode;

    // As long as you haven't reached the first node
    while (currentNode != startingNode) {
        // add node to array
        path.push(currentNode);
        // set current node to current node's parent node
        currentNode = currentNode.parent;
    }

    path.reverse();
    return path;
}

// Get distance to a cell
// Get distance between two nodes
function getDistance(startingNode, targetNode) {
    // Get distance between starting node and target node on the x and on the y
    const dstX = Math.abs(startingNode.x - targetNode.x);
    const dstY = Math.abs(startingNode.y - targetNode.y);

    // If x distance is greater than y distance, return fourteen times y distance plus x distance minus y distance times 10
    if (dstX > dstY) return 14 * dstY + 10 * (dstX - dstY);
    // Otherwise
    // return fourteen times x distance plus y distance minus x distance times 10
    return 14 * dstX + 10 * (dstY - dstX);
}

// Get neighbours of cell
// Get neighbouring nodes of single node
function getNeighbours(mazeGrid, node) {
    // Create array
    let neighbours = new Array();

    // For every node around the single node
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            // If node is the single node, skip
            if (x === 0 && y === 0) continue;
            // If node is a corner node, skip
            if (Math.abs(x) === 1 && Math.abs(y) === 1) continue;

            let checkX = node.x + x;
            let checkY = node.y + y;
            // If the selected node is not beyond the bounds
            if (checkX >= 0 && checkX < mazeGrid.length && checkY >= 0 && checkY < mazeGrid[0].length) {
                // Add node to array
                neighbours.push(mazeGrid[checkX][checkY]);
            }
        }
    }
    // return array (Max length = 4)
    return neighbours;
}
//#endregion

//#region - Grid snapping -

// Generate 80 x 45 grid
function create80x45() {

    let array = new Array();

    for (let x = 0; x < 80; x++) {

        array.push(new Array());

        for (let y = 0; y < 45; y++) {

            array[x].push(new Object({
                x: x,
                y: y,
                type: 'white',
                active: false
            }));

        }

    }

    return array;

}
//#endregion

//#region - Fireworks -

// Firework class

class firework {
    x;
    y;
    motionX;
    motionY;
    heat;
    baseColor;
    color;

    constructor(canvas, color) {

        this.x = canvas.width / 2 + (Math.random() * 800 - 400);
        this.y = canvas.height + 10;
        this.motionX = (Math.random() * 4) - 2;
        this.motionY = -20 + (Math.random() * 6) - 3;
        this.heat = 230 + (Math.random() * 50) - 25;
        this.baseColor = color;
        this.color = 'rgb(255,255,255)';

    }
    update(deltaTime, drag) {
        this.motionY += 0.98 * deltaTime / 30;
        this.heat = this.heat / 1.05;

        let helperArray = this.baseColor.slice(4, -1).split(',');
        this.color = `rgb(${Math.min(255, +helperArray[0]+this.heat)},${Math.min(255, +helperArray[1]+this.heat)},${Math.min(255, +helperArray[2]+this.heat)})`;

        // Add drag
        this.motionX = this.motionX * Math.exp(-drag * deltaTime);
        this.motionY = this.motionY * Math.exp(-drag * deltaTime);

        this.y += Math.round(this.motionY * (deltaTime * 0.1) * 100) / 100;
        this.x += Math.round(this.motionX * (deltaTime * 0.1) * 100) / 100;
    }
}

// Firework trail class

class trail {
    x;
    y;
    motionX;
    motionY;
    color;
    size;

    constructor(firework) {

        this.x = firework.x;
        this.y = firework.y;
        this.motionX = -firework.motionX * 0.5;
        this.motionY = -firework.motionY * 0.5;
        this.color = firework.color;
        this.size = Math.max(0.01, firework.heat / 15 * 2);

    }
    update(deltaTime) {
        this.motionY += 0.98 * deltaTime / 600;
        this.size -= deltaTime / 50

        this.y += Math.round(this.motionY * 100) / 100;
        this.x += Math.round(this.motionX * 100) / 100;
    }
}

// Firework explosion class

class explosion {
    x;
    y;
    motionX;
    motionY;
    color;
    size;
    decayTime;

    constructor(firework, direction, magnitude, decayTime) {

        if (JSON.stringify(Math.sin(direction * (Math.PI / 180))).slice(-4) === 'e-16') {
            this.motionX = -magnitude;
            this.motionY = 0;
        } else if (['e-16', 'e-17'].includes(JSON.stringify(Math.cos(direction * (Math.PI / 180))).slice(-4))) {
            if (direction < 0) {
                this.motionX = 0;
                this.motionY = -magnitude;
            } else {
                this.motionX = 0;
                this.motionY = magnitude;
            }
        } else {
            this.motionX = magnitude * Math.cos(direction * (Math.PI / 180));
            this.motionY = magnitude * Math.sin(direction * (Math.PI / 180));
        }

        this.x = firework.x;
        this.y = firework.y;
        this.color = firework.color;
        this.size = 4;

        this.decayTime = decayTime;
    }

    update(deltaTime, drag) {
        // this.motionY += 0.98 * deltaTime / 30;
        this.size -= deltaTime / this.decayTime

        // Add drag
        this.motionX = this.motionX * Math.exp(-drag * deltaTime);
        this.motionY = this.motionY * Math.exp(-drag * deltaTime);

        this.y += Math.round(this.motionY * (deltaTime * 0.1) * 100) / 100;
        this.x += Math.round(this.motionX * (deltaTime * 0.1) * 100) / 100;
    }
}

// Create an explosion

async function createExplosion(fireworkExplosionArray, firework, explosionStyle) {
    switch (explosionStyle) {
        case 0:
            for (let n = -90; n < 90; n++) {
                fireworkExplosionArray.push(new explosion(firework, n * 2 + (Math.random() * 2 - 1), 6 + (Math.random() * 6 - 5.9), 80));
            }
            await timer(30);
            for (let n = -45; n < 45; n++) {
                fireworkExplosionArray.push(new explosion(firework, n * 4 + (Math.random() * 2 - 1), 4 + (Math.random() * 4 - 3.9), 80));
            }
            break;
        case 1:
            for (let n = -120; n < -60; n++) {
                fireworkExplosionArray.push(new explosion(firework, n + (Math.random() * 2 - 1), 6 + (Math.random() * 6 - 5.9), 80));
            }
            await timer(30);
            for (let n = -105; n < -85; n++) {
                fireworkExplosionArray.push(new explosion(firework, n + (Math.random() * 2 - 1), 4 + (Math.random() * 4 - 3.9), 80));
            }
            break;
        case 2:
            for (let n = -45; n < 45; n++) {
                fireworkExplosionArray.push(new explosion(firework, n * 4 + (Math.random() * 2 - 1), 6 + (Math.random() * 6 - 5.9), 80));
            }
            await timer(30);
            for (let n = -45; n < 45; n++) {
                fireworkExplosionArray.push(new explosion(firework, n * 4 + (Math.random() * 2 - 1), 4 + (Math.random() * 4 - 3.9), 80));
            }
            firework.color = 'rgb(230,230,230)'
            for (let n = -45; n < 45; n++) {
                fireworkExplosionArray.push(new explosion(firework, n * 4 + (Math.random() * 2 - 1), 8 + (Math.random() * 1 - 0.9), 80));
            }
            break;
        case 3:
            for (let n = -15; n < 15; n++) {
                fireworkExplosionArray.push(new explosion(firework, n * 6 + 180 + (Math.random() * 2 - 1), 6 + (Math.random() * 2 - 1.9), 80));
                fireworkExplosionArray.push(new explosion(firework, n * -6 + (Math.random() * 2 - 1), 6 + (Math.random() * 2 - 1.9), 80));
                fireworkExplosionArray.push(new explosion(firework, n * 6 + 183 + (Math.random() * 2 - 1), 6 + (Math.random() * 2 - 1.9), 80));
                fireworkExplosionArray.push(new explosion(firework, n * -6 + 3 + (Math.random() * 2 - 1), 6 + (Math.random() * 2 - 1.9), 80));
                await timer(0.2);
            }
    }
}
//#endregion

//#region - Minesweeper -

// Menu superclass
class menu {
    name;
    hover = false;
    active = false;
    transform = {
        posX: 0,
        posY: 0,
        width: 0,
        height: 0
    };
    decorations = {
        hoverOverlay: 0
    };

    constructor(name, posX, posY, width, height) {
        if (name) this.name = name;
        if (posX) this.transform.posX = posX;
        if (posY) this.transform.posY = posY;
        if (width) this.transform.width = width;
        if (height) this.transform.height = height;
    }

    modifyTransform(posX, posY, width, height) {
        if (posX) this.transform.posX = posX;
        if (posY) this.transform.posY = posY;
        if (width) this.transform.width = width;
        if (height) this.transform.height = height;
    }

    checkMouse(mouseObject, event, canvasBoundingBox) {
        mouseObject.x = event.clientX - canvasBoundingBox.left;
        mouseObject.y = event.clientY - canvasBoundingBox.top;

        if (mouseObject.x > this.transform.posX && mouseObject.y > this.transform.posY && mouseObject.x < this.transform.posX + this.transform.width && mouseObject.y < this.transform.posY + this.transform.height) {
            this.hover = true;
        } else {
            this.hover = false;
        }
    }

    draw(ctx, color) {
        ctx.fillStyle = color;
        ctx.fillRect(this.transform.posX, this.transform.posY, this.transform.width, this.transform.height);

        ctx.fillStyle = 'white';
        ctx.font = `${((this.transform.height - this.transform.height/6)/2.2)}px openSans`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.name, this.transform.posX + this.transform.width / 2, this.transform.posY + this.transform.height / 2);

        ctx.save();
        ctx.fillStyle = 'black';
        ctx.globalAlpha = `${this.decorations.hoverOverlay}`;
        ctx.fillRect(this.transform.posX, this.transform.posY, this.transform.width, this.transform.height);
        ctx.restore();

    }

    updateVariables(deltaTime) {
        if (this.hover && this.decorations.hoverOverlay < 0.3) {
            this.decorations.hoverOverlay += 0.004 * deltaTime;
        } else if (!this.hover && this.decorations.hoverOverlay > 0) {
            this.decorations.hoverOverlay -= 0.004 * deltaTime;
        }
        if (this.decorations.hoverOverlay < 0) {
            this.decorations.hoverOverlay = 0;
        }
        if (this.decorations.hoverOverlay > 0.3) {
            this.decorations.hoverOverlay = 0.3;
        }
    }
}

class parentMenu extends menu {
    children = new Array();
    trueWidth;

    constructor(name, posX, posY, width, height, startingY, childNames, childCallbacks, childParameters) {
        super(name, posX, posY, width, height);
        this.trueWidth = width;

        if (Array.isArray(childNames) && Array.isArray(childCallbacks) && Array.isArray(childParameters)) {
            if (childNames.length === childCallbacks.length && childNames.length === childParameters.length) {
                for (let n = 0; n < childNames.length; n++) {
                    this.children.push(new childMenu(childNames[n], this.transform.posX + this.transform.width / 2 + 10, startingY + this.transform.height * n, this.transform.width / 2 - 10, this.transform.height, childCallbacks[n], childParameters[n]));
                }
            }
        }
    }

    checkMouse(mouseObject, event, canvasBoundingBox) {
        super.checkMouse(mouseObject, event, canvasBoundingBox);

        if (this.active) {
            this.children.forEach(child => {
                child.checkMouse(mouseObject, event, canvasBoundingBox);
            });
        }

    }

    draw(ctx, color, menuArray) {
        this.transform.width = this.trueWidth;
        if (Array.isArray(menuArray)) {
            menuArray.forEach(element => {
                if (element.active) this.transform.width = this.trueWidth / 2;
            });
        }

        super.draw(ctx, color);

        if (this.active) {
            this.children.forEach(child => {
                child.draw(ctx, color);
            });
        }

    }

    updateVariables(deltaTime) {
        super.updateVariables(deltaTime);

        if (this.active) {
            this.children.forEach(child => {
                child.updateVariables(deltaTime);
            });
        }

    }
}

class childMenu extends menu {
    callback;
    callbackParams;

    constructor(name, posX, posY, width, height, callback, parameters) {
        super(name, posX, posY, width, height);

        this.callback = callback;
        this.callbackParams = parameters;
    }
    click() {
        this.callback(this.callbackParams);
        this.hover = false;
    }
}

// Grid of tiles
class mineGrid {
    uncoveredCells = 0;
    size;
    grid = new Array();
    clickedSquare;
    gameState = 0;

    constructor(size) {
        this.size = size;

        for (let x = 0; x < this.size; x++) {
            this.grid.push(new Array());
            for (let y = 0; y < this.size; y++) {
                this.grid[x].push(new mineCell(x, y));
            }
        }
    }
    populateMines(canvasBoundingBox, mouseObject, event, minesNum) {
        mouseObject.x = event.clientX - canvasBoundingBox.left;
        mouseObject.y = event.clientY - canvasBoundingBox.top;

        if (mouseObject.x > 254.1 && mouseObject.x < 785.9 && mouseObject.y > 26.6 && mouseObject.y < 558.4) {

            this.gameState = 1;

            mouseObject.squareX = (mouseObject.x - 254.1) / 531.8;
            mouseObject.squareY = (mouseObject.y - 26.6) / 531.8;

            this.clickedSquare = {
                x: Math.floor(mouseObject.squareX * this.size),
                y: Math.floor(mouseObject.squareY * this.size)
            };

            for (let n = 0; n < minesNum; n++) {
                let canPlace = true;

                let coords = {
                    x: Math.round(Math.random() * (this.size - 1)),
                    y: Math.round(Math.random() * (this.size - 1))
                }

                for (let a = -1; a <= 1; a++) {
                    for (let b = -1; b <= 1; b++) {
                        if (coords.x === this.clickedSquare.x + a && coords.y === this.clickedSquare.y + b) canPlace = false;
                    }
                }

                if (this.grid[coords.x][coords.y].mine === false && canPlace) {

                    this.grid[coords.x][coords.y].mine = true;

                } else {
                    n--;
                }
            }
        }



    }

}

// A single tile
class mineCell {
    x;
    y;
    mine = false;
    state = -1;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    checkCell(mineGrid) {
        mineGrid.uncoveredCells++;
        this.state = 0;

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (y === 0 && x === 0 || this.x + x < 0 || this.x + x >= mineGrid.size || this.y + y < 0 || this.y + y >= mineGrid.size) continue;

                if (mineGrid.grid[this.x + x][this.y + y].mine) this.state++;
            }
        }

        if (this.state === 0) {
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    if (y === 0 && x === 0 || this.x + x < 0 || this.x + x >= mineGrid.size || this.y + y < 0 || this.y + y >= mineGrid.size) continue;

                    if (mineGrid.grid[this.x + x][this.y + y].state === -1) mineGrid.grid[this.x + x][this.y + y].checkCell(mineGrid);
                }
            }
        }
    }
    swapFlag() {
        if (this.state === -1) {
            this.state = -2;
        } else if (this.state === -2) {
            this.state = -1;
        }
    }
}

// Check a click on a tile
function checkMineClick(canvasBoundingBox, mouseObject, mineGrid, event) {
    mouseObject.x = event.clientX - canvasBoundingBox.left;
    mouseObject.y = event.clientY - canvasBoundingBox.top;

    if (mouseObject.x > 254.1 && mouseObject.x < 785.9 && mouseObject.y > 26.6 && mouseObject.y < 558.4) {

        mouseObject.squareX = (mouseObject.x - 254.1) / 531.8;
        mouseObject.squareY = (mouseObject.y - 26.6) / 531.8;

        let clickedSquare = mineGrid.grid[Math.floor(mouseObject.squareX * mineGrid.size)][Math.floor(mouseObject.squareY * mineGrid.size)];

        if (clickedSquare.state !== -1) return;
        if (clickedSquare.mine) {
            mineGrid.gameState = 2;
            return;
        }

        mineGrid.grid[clickedSquare.x][clickedSquare.y].checkCell(mineGrid);
    }
}

// Place a flag
function placeFlag(canvasBoundingBox, mouseObject, mineGrid, event) {
    mouseObject.x = event.clientX - canvasBoundingBox.left;
    mouseObject.y = event.clientY - canvasBoundingBox.top;

    if (mouseObject.x > 254.1 && mouseObject.x < 785.9 && mouseObject.y > 26.6 && mouseObject.y < 558.4) {

        mouseObject.squareX = (mouseObject.x - 254.1) / 531.8;
        mouseObject.squareY = (mouseObject.y - 26.6) / 531.8;

        let clickedSquare = mineGrid.grid[Math.floor(mouseObject.squareX * mineGrid.size)][Math.floor(mouseObject.squareY * mineGrid.size)];

        if (clickedSquare.state > -1) return;

        mineGrid.grid[clickedSquare.x][clickedSquare.y].swapFlag();

    }
}

// Check for victory
function checkMineVictoryConditions(gameSetup, mineGrid) {
    if (gameSetup.size ** 2 - gameSetup.mines <= mineGrid.uncoveredCells) {
        mineGrid.gameState = 3;
    }
}

//#endregion

//#region - To Do List -

// Create a new item
function createToDoItem(description, date) {
    results = new Array();
    results.push(description, date)
    return results;
}

function refreshArray(itemsArray) {
    let storageKeys = new Array();

    let repeat = (localStorage.length > itemsArray.length) ? localStorage.length : itemsArray.length

    for (let n = 0; n < repeat; n++) {

        storageKeys.push(localStorage.key(n));

        if (localStorage[`${storageKeys[n]}`] === undefined) {
            itemsArray.splice(n, 1);
            continue;
        }

        if (typeof itemsArray[n] === 'object') {

            if (itemsArray[n].name !== storageKeys[n] || itemsArray[n].desc !== JSON.parse(localStorage[`${storageKeys[n]}`])[0] || itemsArray[n].date !== JSON.parse(localStorage[`${storageKeys[n]}`])[1]) {

                itemsArray[n] = (new Object({
                    name: storageKeys[n],
                    desc: JSON.parse(localStorage[`${storageKeys[n]}`])[0],
                    date: JSON.parse(localStorage[`${storageKeys[n]}`])[1],
                    priority: parseInt(JSON.parse(localStorage[`${storageKeys[n]}`])[2])
                }));

            }

        } else {

            itemsArray[n] = (new Object({
                name: storageKeys[n],
                desc: JSON.parse(localStorage[`${storageKeys[n]}`])[0],
                date: JSON.parse(localStorage[`${storageKeys[n]}`])[1],
                priority: parseInt(JSON.parse(localStorage[`${storageKeys[n]}`])[2])
            }));
        }

    }
}

function orderArray(itemsArrayOrdered, sortList) {
    let tempArray = JSON.parse(JSON.stringify(itemsArrayOrdered));

    if (sortList.value === 'date') {
        tempArray.sort(function comparefn(a, b) {
            new Date(a.date) - new Date(b.date)
        });
    }
    if (sortList.value === 'importance') {
        tempArray.sort(function comparefn(a, b) {
            a.priority - b.priority
        });
    }

    return tempArray;
}

function sort(a, b) {
    return new Date(a.date) - new Date(b.date);
}

function createElements(sorter, orderedItemsArray, outputEl) {
    switch (sorter) {
        case 'date':
            let currentDate = new Date();

            let dateHeaders = [
                [
                    'Late',
                    `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`
                ],
                [
                    'Today',
                    `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()+1}`
                ],
                [
                    'Tomorrow',
                    `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()+2}`
                ],
                [
                    'This Week',
                    `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()+7}`
                ],
                [
                    'Later'
                ]
            ]

            dateHeaders.forEach(text => {

                const parentEl = document.createElement('div');
                let divEl = document.createElement('div');
                let headerEl = document.createElement('h2');

                headerEl.innerText = text[0];

                divEl.classList.add("toDoHeaderElement");
                divEl.setAttribute("unselectable", 'on');
                divEl.setAttribute("onselectstart", 'return false;');
                divEl.setAttribute("onmousedown", 'return false;');

                divEl.append(headerEl);

                parentEl.append(divEl);

                outputEl.append(parentEl);
            });

            for (let x = 0; x < orderedItemsArray.length; x++) {

                let parentDivEl = document.createElement('div');

                parentDivEl.classList.add('toDoListElement');

                if (orderedItemsArray[x].priority === 1) {
                    parentDivEl.classList.add('priority1');

                } else if (orderedItemsArray[x].priority === 2) {
                    parentDivEl.classList.add('priority2');

                } else {
                    parentDivEl.classList.add('priority3');

                }

                let titleSpanEl = document.createElement('span');

                titleSpanEl.innerText = orderedItemsArray[x].name;
                titleSpanEl.classList.add('titleText');

                let descSpanEl = document.createElement('span');

                descSpanEl.innerText = orderedItemsArray[x].desc;
                descSpanEl.classList.add('descriptionText');

                let dateSpanEl = document.createElement('span');

                dateSpanEl.innerText = orderedItemsArray[x].date;
                dateSpanEl.classList.add('titleText');

                let rmvBtnEl = document.createElement('div');

                rmvBtnEl.innerText = '-';
                rmvBtnEl.classList.add('toDoRemoveBtn');
                rmvBtnEl.setAttribute('unselectable', 'on');
                rmvBtnEl.setAttribute('onselectstart', 'return false;');
                rmvBtnEl.setAttribute('onmousedown', 'return false;');

                parentDivEl.append(titleSpanEl, descSpanEl, dateSpanEl, rmvBtnEl);

                forElse01: {
                    for (let y = 0; y < dateHeaders.length - 1; y++) {
                        if (new Date(orderedItemsArray[x].date) < new Date(dateHeaders[y][1])) {
                            outputEl.children[y].append(parentDivEl);
                            break forElse01;
                        }
                    }
                    outputEl.children[dateHeaders.length - 1].append(parentDivEl);
                }
            }


            break;
        case 'importance':
            let priorityHeaders = [
                [
                    'High Priority',
                    1
                ],
                [
                    'Standard Priority',
                    2
                ],
                [
                    'Low Priority'
                ]
            ]

            priorityHeaders.forEach(text => {

                const parentEl = document.createElement('div');
                let divEl = document.createElement('div');
                let headerEl = document.createElement('h2');

                headerEl.innerText = text[0];

                divEl.classList.add("toDoHeaderElement");
                divEl.setAttribute("unselectable", 'on');
                divEl.setAttribute("onselectstart", 'return false;');
                divEl.setAttribute("onmousedown", 'return false;');

                divEl.append(headerEl);

                parentEl.append(divEl);

                outputEl.append(parentEl);
            });

            for (let x = 0; x < orderedItemsArray.length; x++) {

                let parentDivEl = document.createElement('div');

                parentDivEl.classList.add('toDoListElement');

                if (orderedItemsArray[x].priority === 1) {
                    parentDivEl.classList.add('priority1');

                } else if (orderedItemsArray[x].priority === 2) {
                    parentDivEl.classList.add('priority2');

                } else {
                    parentDivEl.classList.add('priority3');

                }

                let titleSpanEl = document.createElement('span');

                titleSpanEl.innerText = orderedItemsArray[x].name;
                titleSpanEl.classList.add('titleText');

                let descSpanEl = document.createElement('span');

                descSpanEl.innerText = orderedItemsArray[x].desc;
                descSpanEl.classList.add('descriptionText');

                let dateSpanEl = document.createElement('span');

                dateSpanEl.innerText = orderedItemsArray[x].date;
                dateSpanEl.classList.add('titleText');

                let rmvBtnEl = document.createElement('div');

                rmvBtnEl.innerText = '-';
                rmvBtnEl.classList.add('toDoRemoveBtn');
                rmvBtnEl.setAttribute('unselectable', 'on');
                rmvBtnEl.setAttribute('onselectstart', 'return false;');
                rmvBtnEl.setAttribute('onmousedown', 'return false;');

                parentDivEl.append(titleSpanEl, descSpanEl, dateSpanEl, rmvBtnEl);

                switch (orderedItemsArray[x].priority) {
                    case 1:
                        outputEl.children[0].append(parentDivEl);
                        break;
                    case 2:
                        outputEl.children[1].append(parentDivEl);
                        break;
                    case 3:
                        outputEl.children[2].append(parentDivEl);
                        break;
                }
            }
            break;
    }
}

//#endregion

//#region - Sorting Algorithms -

// - Chart Class -
class sortingChart {
    height;
    chartsArray;
    randomArray = new Array();

    constructor(itemNum, chartTypes, callback) {
        this.createChart(itemNum, chartTypes, callback);
    }

    async createChart(itemNum, chartTypes, callback) {
        this.height = 565 / chartTypes.length - (10 * (chartTypes.length - 1));

        this.chartsArray = chartTypes;

        this.randomArray.length = itemNum;
        // Create Ordered Items
        for (let n = 0; n < this.randomArray.length; n++) {
            await timer(5);
            this.randomArray[n] = n;

            this.chartsArray.forEach(item => {
                item.array = this.randomArray;
                item.activeItem = n;
            });
        }

        // Randomize Positions
        for (let i = 0; i < this.randomArray.length; i++) {
            await timer(15);
            swapItems(this.randomArray, i, Math.floor(Math.random() * (this.randomArray.length - 1)));

            this.chartsArray.forEach(item => {
                item.array = this.randomArray;
                item.activeItem = i;
            });
        }

        this.chartsArray.forEach(item => {
            let tempArray = new Array();
            item.array.forEach(element => {
                tempArray.push(element);
            });
            item.array = tempArray;
        });

        if (typeof callback === 'function') callback();
    }

    async asyncInsertionSort(index) {

        for (let a = 1; a < this.chartsArray[index].array.length; a++) {

            let key = this.chartsArray[index].array[a];

            let b = a - 1;

            while (b >= 0 && key < this.chartsArray[index].array[b]) {
                this.chartsArray[index].array[b + 1] = this.chartsArray[index].array[b];
                this.chartsArray[index].activeItem = b;
                await timer(1);
                b--;
            }
            this.chartsArray[index].array[b + 1] = key;
        }

        for (let n = 0; n < this.chartsArray[index].array.length; n++) {
            await timer(10);
            this.chartsArray[index].activeItem = n;
        }
    }

    async mergeArrays(leftArray, rightArray, actItemIndex) {
        let result = new Array();

        while (leftArray.length && rightArray.length) {
            await timer(1);

            if (leftArray[0] < rightArray[0]) {
                result.push(leftArray.shift());
            } else {
                result.push(rightArray.shift());
            }
            this.chartsArray[actItemIndex].activeItem = result.length - 1;
            this.chartsArray[actItemIndex].secondaryItems[0] = result.length;
            this.chartsArray[actItemIndex].secondaryItems[1] = result.length + leftArray.length;

            this.chartsArray[actItemIndex].array = [...result, ...leftArray, ...rightArray];
        }

        return [...result, ...leftArray, ...rightArray];
    }

    async asyncMergeSort(index) {
        let array = new Array();
        this.chartsArray[index].array.forEach(element => {
            array.push(element);
        });

        await this.mergeSort(array, index);

        this.chartsArray[index].secondaryItems = [];

        for (let n = 0; n < this.chartsArray[index].array.length; n++) {
            await timer(1);
            this.chartsArray[index].activeItem = n;
        }
    }

    async mergeSort(array, actItemIndex) {
        if (array.length < 2) return array;

        let split = Math.floor(array.length / 2);

        const leftArray = array.splice(0, split);

        await timer(1);

        let result = await this.mergeArrays(await this.mergeSort(leftArray, actItemIndex), await this.mergeSort(array, actItemIndex), actItemIndex);

        return result;
    }

    async asyncQuickSort(index) {
        let array = new Array();
        this.chartsArray[index].array.forEach(element => {
            array.push(element);
        });

        await this.quickSort(array, 0, array.length - 1, index);

        this.chartsArray[index].secondaryItems = [];

        for (let n = 0; n < this.chartsArray[index].array.length; n++) {
            await timer(1);
            this.chartsArray[index].activeItem = n;
        }
    }

    async quickSort(array, left, right, actItemIndex) {

        if (array.length < 2) return array;

        let index = await this.quickSortPartition(array, left, right, actItemIndex);

        if (left < index - 1) {
            await this.quickSort(array, left, index - 1, actItemIndex);
        }

        if (right > index) {
            await this.quickSort(array, index, right, actItemIndex);
        }

        this.chartsArray[actItemIndex].array = array;

        return array;
    }

    async quickSortPartition(array, left, right, actItemIndex) {
        this.chartsArray[actItemIndex].activeItem = array[Math.floor((left + right) / 2)]
        let pivot = array[Math.floor((left + right) / 2)];
        let leftCursor = left;
        let rightCursor = right;

        while (leftCursor <= rightCursor) {

            while (array[leftCursor] < pivot) {
                await timer(0.1);
                this.chartsArray[actItemIndex].secondaryItems[0] = leftCursor;
                leftCursor++;
            }
            while (array[rightCursor] > pivot) {
                await timer(0.1);
                this.chartsArray[actItemIndex].secondaryItems[1] = rightCursor;
                rightCursor--;
            }

            if (leftCursor <= rightCursor) {
                swapItems(array, leftCursor, rightCursor);
                this.chartsArray[actItemIndex].array = array;
                leftCursor++;
                rightCursor--;
            }

        }
        return leftCursor;
    }

    draw(canvas2dContext) {
        for (let i = 0; i < this.chartsArray.length; i++) {
            for (let n = 0; n < this.randomArray.length; n++) {

                canvas2dContext.beginPath();
                canvas2dContext.moveTo((1000 / this.randomArray.length) * n + (20 + (1000 / sorterChart.randomArray.length) / 2), 575 - this.height * i - (10 * (this.chartsArray.length - 1) * i));

                canvas2dContext.strokeStyle = 'black';
                if (Array.isArray(this.chartsArray[i].secondaryItems)) {
                    this.chartsArray[i].secondaryItems.forEach(element => {
                        if (element === n) canvas2dContext.strokeStyle = 'blue';
                    });
                }
                if (this.chartsArray[i].activeItem === n) canvas2dContext.strokeStyle = 'red';

                canvas2dContext.lineTo((1000 / this.randomArray.length) * n + (20 + (1000 / sorterChart.randomArray.length) / 2), (575 - ((this.chartsArray[i].array[n] / this.randomArray.length) * this.height)) - this.height * i - (10 * (this.chartsArray.length - 1) * i));
                canvas2dContext.stroke();
            }
        }
    }

}

/*
    {
    widthArray: [widthofeverythingincolumn]
    containedObject: {
        widthArray: [widthofeverythingincolumn]
        containedObject: {
            widthArray: [widthofeverythingincolumn]
            containedObject: {
                
            }
        }
    }
    }
*/

//#endregion

//#region - Tech Tree -

// Item Class
class treeItem {
    // Title 24px, Header 18px, Other Text 13px
    // Top 6px Left & Bottom 16px Right 64px
    // Text Width 268px
    // Title Margin lr0px tb2px
    // Header Margin lr0px tb2px
    // Other Text Margin lr0px tb0px

    /*
    Structure:
        Vertical T-B:
            6px Border
            47px Image(s)
            28px Title
            22px Header : Description
            >13px description
            22px Header : Cost
            13px cost
            16px Padding
        Horizontal L-R:
            16px Padding
            >118px Title | Headers | Description | Cost
            64px
    */
    children = new Array();
    parent;

    innerWidth;
    innerHeight;
    width;
    height;
    position = new PVector(0, 0);

    uuid;

    margin = 16;

    totalHeight;
    totalWidth;

    maxWidth;

    title;

    description;
    wrappedDescription;

    cost;

    buttonHover = -1;

    constructor(parent, title, description, cost) {
        this.title = title.toString();
        if (this.title === undefined || this.title === '') this.title = 'Missing Title'
        this.description = description.toString();
        if (this.description === undefined || this.description === '') this.description = 'Missing Description'
        this.cost = cost;
        this.parent = parent;

        this.uuid = uuidv4();

        this.wrappedDescription = getWrappedLines(this.description.match(/\S*\s*/g), 13, 268)
        this.calculateHeightWidth();

        this.maxWidth = this.width;
        this.totalWidth = this.maxWidth + 100;
        this.totalHeight = this.height + this.margin * 2;

        if (this.parent === null) this.updateChain();
    }

    updateChain() {
        this.totalHeight = Math.max(this.children.reduce((a, b) => a + b.totalHeight, 0), this.height + this.margin * 2);

        if (this.parent instanceof treeItem) this.parent.updateChain();
        else if (this.parent === null) {
            let widthMap = new Array();
            this.updateMaxWidth(widthMap, 0);
            this.updatePositions(widthMap, 0);
        }
    }

    updatePositions(widthMap, depth) {
        this.maxWidth = widthMap[depth];
        this.totalWidth = this.maxWidth + 100 + this.children.reduce((a, b) => Math.max(a, b.totalWidth), 0);

        if (this.parent instanceof treeItem) {
            this.position.x = this.parent.position.x + this.parent.maxWidth + 100;
        } else {
            this.position.x = 0;
        }

        let currentY = (this.position.y + this.height / 2) - this.totalHeight / 2;
        this.children.forEach(child => {
            child.position.y = (currentY + child.totalHeight / 2) - child.height / 2;
            currentY += child.totalHeight;
        });

        for (const child of this.children) {
            child.updatePositions(widthMap, depth + 1);
        }
    }

    updateMaxWidth(widthMap, depth) {
        if (isNaN(widthMap[depth])) widthMap[depth] = 0;
        widthMap[depth] = Math.max(this.width, widthMap[depth]);
        for (const child of this.children) {
            child.updateMaxWidth(widthMap, depth + 1);
        }
    }

    calculateHeightWidth() {
        this.innerWidth = Math.max(
            measureWidth(this.title, 24),
            this.wrappedDescription.reduce((a, b) => Math.max(a, measureWidth(b.trim(), 13)), 0),
            118
        );
        this.innerHeight = 132 + this.wrappedDescription.length * 13;
        this.width = this.innerWidth + 80;
        this.height = this.innerHeight + 22;
    }

    createChild(title, description, cost) {
        this.children.push(new treeItem(this, title, description, cost));
        this.children[this.children.length - 1].updateChain([]);
    }

    inheritParent(newParent) {
        this.parent = newParent;
    }

    newValues(valuesArray) {
        this.title = valuesArray[0];
        this.description = valuesArray[1];
        if (this.title === undefined || this.title === '') this.title = 'Missing Title'
        if (this.description === undefined || this.description === '') this.description = 'Missin Description';
        this.cost = valuesArray[2];

        this.wrappedDescription = getWrappedLines(this.description.match(/\S*\s*/g), 13, 268)
        this.calculateHeightWidth();

        this.totalWidth = this.maxWidth + 100;
        this.totalHeight = this.height + this.margin * 2;

        this.updateChain();
    }

    delete(optionalArray) {
        if (this.parent !== null) {
            this.parent.children.splice(this.parent.children.findIndex(element => element.uuid === this.uuid), 1, ...this.children)
            for (const child of this.children) {
                child.inheritParent(this.parent);
            }
        } else if (this.parent === null) {
            if (optionalArray instanceof Array) {
                optionalArray.splice(optionalArray.findIndex(element => element.uuid === this.uuid), 1, ...this.children);
                for (const child of this.children) {
                    child.inheritParent(null);
                }
            } else {
                throw new ReferenceError(`Failed to execute 'delete' on 'treeItem' : optionalArray is not of type Array`)
            }
        }
        if (this.parent instanceof treeItem) this.parent.updateChain();
        else this.children.forEach(child => {
            child.updateChain();
        });
    }

    checkHover(mouse) {
        let buttonsY = ctxCon.gac('y', this.position.y + 18)[0]
        let buttonsWH = ctxCon.gac('w', 20)[0]
        let editButtonX = ctxCon.gac('xywh', this.position.x + 16)[0]
        let downButtonX = ctxCon.gac('xywh', this.position.x + 45)[0]
        let upButtonX = ctxCon.gac('xywh', this.position.x + 74)[0]

        let addButtonPos = ctxCon.gac('xywh', this.position.x + this.width - 20, this.position.y + 24, 20, this.height - 28)

        if (
            mouse.y > buttonsY && mouse.y < buttonsY + buttonsWH && mouse.x > editButtonX && mouse.x < upButtonX + buttonsWH
        ) {
            if (mouse.x > editButtonX && mouse.x < editButtonX + buttonsWH) this.buttonHover = 0;
            else if (mouse.x > downButtonX && mouse.x < downButtonX + buttonsWH) this.buttonHover = 1;
            else if (mouse.x > upButtonX && mouse.x < upButtonX + buttonsWH) this.buttonHover = 2;
            else this.buttonHover = -1;
        } else if (
            mouse.x > addButtonPos[0] && mouse.x < addButtonPos[0] + addButtonPos[2] &&
            mouse.y > addButtonPos[1] && mouse.y < addButtonPos[1] + addButtonPos[3]) {
            this.buttonHover = 3;
        } else {
            this.buttonHover = -1;
        }
        this.children.forEach(child => {
            if (ctxCon.gac('x', child.position.x)[0] <= mouse.x) {
                child.checkHover(mouse);
            }
        });
    }

    async checkClick(childArray) {
        if (this.buttonHover > -1) {
            switch (this.buttonHover) {
                case 0:
                    editTreeItem(this);
                    break;
                case 1:
                    this.moveDown(childArray);
                    break;
                case 2:
                    this.moveUp(childArray)
                    break;
                case 3:
                    let treeParams = await createTreeItem();
                    if (treeParams) this.createChild(...treeParams)
                    this.buttonHover = -1;
                    break;
            }
            return true;
        } else {
            for (const child of this.children) {
                if (ctxCon.gac('x', child.position.x)[0] <= mouse.x) {
                    if (await child.checkClick(this.children) === true) return true;
                }
            }
        }
    }

    moveUp(upperArray) {
        let myIndex = upperArray.findIndex(element => element.uuid === this.uuid);
        if (myIndex > 0) {
            swapItems(upperArray, myIndex, myIndex - 1);
        }
    }

    moveDown(upperArray) {
        let myIndex = upperArray.findIndex(element => element.uuid === this.uuid);
        if (myIndex < upperArray.length - 1) {
            swapItems(upperArray, myIndex + 1, myIndex);
        }
    }
}

// Controller of context
class contextController {
    cnv;
    camera;

    constructor(canvas) {
        this.cnv = canvas;
        this.camera = new camera(canvas, 0, 0);
    }
    // Get Accurate Coordinates
    gac(specifyLocParams, ...callbackParams) {
        let specifier = specifyLocParams.match(/[a-z]/g)
        let params = new Array();
        specifier.forEach((item, index) => {
            switch (item) {
                case "x":
                    params.push(mapRange(callbackParams[index], this.camera.x, this.camera.x + this.camera.width, 0, this.camera.defaultWidth));
                    break;
                case "y":
                    params.push(mapRange(callbackParams[index], this.camera.y, this.camera.y + this.camera.height, 0, this.camera.defaultHeight));
                    break;
                case "w":
                    params.push(mapRange(callbackParams[index], 0, this.camera.width, 0, this.camera.defaultWidth))
                    break;
                case "h":
                    params.push(mapRange(callbackParams[index], 0, this.camera.height, 0, this.camera.defaultHeight))
                    break;
                default:
                    params.push(callbackParams[index]);
                    break;
            }
        });
        return params;
    }
    updateCamera(bounds) {
        this.camera.updateCamera(bounds);
    }
}

// Virtual Camera
class camera {
    centerX;
    centerY;

    zoom = 1;

    initialX;
    initialY;

    x;
    y;

    defaultWidth;
    defaultHeight;

    width;
    height;

    cnv;

    constructor(canvas, x, y) {
        this.cnv = canvas;

        this.centerX = x;
        this.centerY = y;

        this.defaultWidth = canvas.width;
        this.defaultHeight = canvas.height;

        this.width = this.defaultWidth;
        this.height = this.defaultHeight;

        this.x = this.centerX - this.defaultWidth / 2;
        this.y = this.centerY - this.defaultHeight / 2;
    }
    updateCamera(bounds) {
        if (this.centerX > bounds.max.x) this.centerX = bounds.max.x;
        if (this.centerY > bounds.max.y) this.centerY = bounds.max.y;
        if (this.centerX < bounds.min.x) this.centerX = bounds.min.x;
        if (this.centerY < bounds.min.y) this.centerY = bounds.min.y;

        this.defaultWidth = this.cnv.width;
        this.defaultHeight = this.cnv.height;

        this.initialX = this.centerX - this.defaultWidth / 2;
        this.initialY = this.centerY - this.defaultHeight / 2;

        this.width = this.defaultWidth / this.zoom;
        this.height = this.defaultHeight / this.zoom;

        this.x = this.centerX - this.width / 2;
        this.y = this.centerY - this.height / 2;

        if (this.zoom < 0.25) this.zoom = 0.25;
        if (this.zoom > 2) this.zoom = 2;
    }
}

// Bounding Box for camera
class boundingBox {
    max = new Object();
    min = new Object();
    constructor(minX, minY, maxX, maxY) {
        this.max.x = maxX;
        this.max.y = maxY;
        this.min.x = minX;
        this.min.y = minY;
    }
}

// Tech Tree Deconstructor

function deconstructTree(constructedTree) {
    let topLevel = new Array();
    function deconstructItem(item){
        let currLevel = {
            t:item.title,
            d:item.description,
            c:item.cost,
            a:new Array()
        }
        item.children.forEach(child => {
            currLevel.a.push(deconstructItem(child));
        });
        return currLevel;
    }

    constructedTree.forEach(item => {
        topLevel.push(deconstructItem(item));
    });

    return JSON.stringify(topLevel);
}

// Tech Tree Constructor

function constructTree(compressedTree) {
    let deconstructedTree = LZString.decompressFromUTF16(compressedTree);
    function throwError() {
        throw new Error(`Could not execute 'constructTree': Provided file is not a valid tree.`);
    }
    let parsedTree = parseJSON(deconstructedTree);

    if(parsedTree instanceof Array === false) throwError();

    let result = new Array();
    function constructItem(item, children) {
        
        if(item instanceof treeItem === false) throwError();
        children.forEach(child => {
            if(child instanceof Object === false) throwError();
            if(!child.a || !child.t || !child.d || isNaN(child.c)) throwError();
            item.createChild(child.t, child.d, child.c);
        });
        item.children.forEach((child, index) => {
            constructItem(child, children[index].a);
        });
    }

    parsedTree.forEach((item, index) => {
        if(item instanceof Object === false) throwError();
        if(!item.a || !item.t || !item.d || isNaN(item.c)) throwError();
        result.push(new treeItem(null, item.t, item.d, item.c));
        constructItem(result[index], item.a);
    });

    topTreeElements = result;
}

//#endregion

//#region - Platformer [Unfinished] -
class platformerLevel {
    jsonObject;
    gravity;
    background;
    midground;
    objectLayers;
    playerSize = new Map();
    /*
    Layer 0: Ground
    Layer 1: Interactables
    Layer 2: Traps
    Layer 3: Player
    */

    closeObjects = new Array();

    leftWalkImg = new Image();
    rightWalkImg = new Image();
    idleImg = new Image();
    imgStateList = [this.leftWalkImg, this.idleImg, this.rightWalkImg];

    particles = new Array();

    imageIndex = 0;

    startup = 0;

    camera = {
        x: 0,
        y: 0,
        followPlayer: true
    }
    unitSize;

    constructor() {
        this.leftWalkImg.src = '../img/leftWalk.png';
        this.rightWalkImg.src = '../img/rightWalk.png';
        this.idleImg.src = '../img/idle.png';
    }

    async loadFromFile(filePath) {
        this.jsonObject = parseJSON(await readJSONFile(filePath));
        if ('background' in this.jsonObject && 'midground' in this.jsonObject && 'objectLayers' in this.jsonObject) {
            this.gravity = this.jsonObject.gravity;
            this.background = new Image();
            this.background.src = this.jsonObject.background;
            this.midground = this.jsonObject.midground;
            this.objectLayers = this.jsonObject.objectLayers;
            this.startup = 0;
        }
    }
    update(deltaTime, canvasSize, fullscreen, screenCorner) {
        this.imageIndex += deltaTime * 0.06;
        if (this.imageIndex >= 160) this.imageIndex -= 160;

        this.unitSize = canvasSize[0] / 160;

        this.playerSize.set('x', getCanvasCoord(this.objectLayers.player.x - 8, this.unitSize, false) + fullscreen * screenCorner.x - this.camera.x * this.unitSize);
        this.playerSize.set('y', getCanvasCoord(this.objectLayers.player.y + 8, this.unitSize, true) + fullscreen * screenCorner.y + this.camera.y * this.unitSize + this.unitSize * 8);
        this.playerSize.set('x2', getCanvasCoord(this.objectLayers.player.x - 8, this.unitSize, false) + fullscreen * screenCorner.x - this.camera.x * this.unitSize + this.unitSize * 16);
        this.playerSize.set('y2', getCanvasCoord(this.objectLayers.player.y + 8, this.unitSize, true) + fullscreen * screenCorner.y + this.camera.y * this.unitSize + this.unitSize * 24);

        // Gravity
        // this.objectLayers.player.yVel += -this.gravity

        this.objectLayers.player.xVel = this.objectLayers.player.movement;

        // Collision Checks
        let index = 0;
        this.closeObjects = [];
        this.objectLayers.ground.forEach(element => {
            if (element.type === 'rect') {
                if (
                    element.x + element.width / 2 > this.camera.x - 80 &&
                    element.x - element.width / 2 < this.camera.x + 80 &&
                    element.y + element.height / 2 > this.camera.y - 45 &&
                    element.y - element.height / 2 < this.camera.y + 45
                ) {
                    let distance =
                        Math.abs(Math.sqrt((Math.max(this.objectLayers.player.x, element.x) - Math.min(this.objectLayers.player.x, element.x)) ** 2 + (Math.max(this.objectLayers.player.y, element.y) - Math.min(this.objectLayers.player.y, element.y)) ** 2));
                    if (distance < Math.max(element.width / 2, element.height / 2) + 16) this.closeObjects.push(element);
                }
            }
            index++;
        });

        // Bottom Collision
        this.closeObjects.forEach(element => {
            if (
                getCanvasCoord(element.x - element.width / 2, this.unitSize, false) + fullscreen * screenCorner.x - this.camera.x * this.unitSize < this.playerSize.get('x2') + this.objectLayers.player.xVel * 0.03 * deltaTime &&
                getCanvasCoord(element.x - element.width / 2, this.unitSize, false) + fullscreen * screenCorner.x - this.camera.x * this.unitSize + element.width * this.unitSize > this.playerSize.get('x1') + this.objectLayers.player.xVel * 0.03 * deltaTime &&
                getCanvasCoord(element.y - element.height / 2, this.unitSize, true) + fullscreen * screenCorner.y + this.camera.y * this.unitSize > this.playerSize.get('y2')
            ) {

            }
        });

        if (this.startup <= 12) {
            if (this.startup < 12) this.objectLayers.player.movement = Math.floor(this.startup / 4) - 1;
            else this.objectLayers.player.movement = 0;
            this.objectLayers.player.xVel = 0;
            this.startup++;
        }

        if (this.objectLayers.player.y < -400) {
            this.objectLayers.player.x = 0;
            this.objectLayers.player.y = 0;
            this.objectLayers.player.yVel = 0;
            this.objectLayers.player.movement = 0;
        }

        this.objectLayers.player.x += this.objectLayers.player.xVel * 0.03 * deltaTime;
        this.objectLayers.player.y += this.objectLayers.player.yVel * 0.03 * deltaTime;

        if (this.camera.followPlayer) {
            this.camera.x = this.objectLayers.player.x;
            this.camera.y = this.objectLayers.player.y;
        }
    }
    draw(canvas2dContext, fullscreen, screenCorner, canvasSize, screenSize) {
        // - Draw Background Layer -
        canvas2dContext.save();
        canvas2dContext.filter = 'blur(2px)';
        canvas2dContext.globalAlpha = 0.8;
        canvas2dContext.drawImage(this.background, fullscreen * screenCorner.x, fullscreen * screenCorner.y, canvasSize[0], canvasSize[1]);
        canvas2dContext.restore();

        // - Draw Midground Layer -

        // -- Draw Object Layers --

        // - Ground Layer -
        this.objectLayers.ground.forEach(element => {
            if (element.type === 'rect') {
                if (
                    element.x + element.width / 2 > this.camera.x - 80 &&
                    element.x - element.width / 2 < this.camera.x + 80 &&
                    element.y + element.height / 2 > this.camera.y - 45 &&
                    element.y - element.height / 2 < this.camera.y + 45
                ) {
                    canvas2dContext.fillStyle = element.color;

                    canvas2dContext.fillRect(
                        getCanvasCoord(element.x - element.width / 2, this.unitSize, false) + fullscreen * screenCorner.x - this.camera.x * this.unitSize,
                        getCanvasCoord(element.y - element.height / 2, this.unitSize, true) + fullscreen * screenCorner.y + this.camera.y * this.unitSize,
                        element.width * this.unitSize,
                        0 - (element.height * this.unitSize));
                }

            }

        });

        // - Interactable Layer -


        // - Traps Layer -


        // - Player Layer -
        canvas2dContext.drawImage(
            this.imgStateList[this.objectLayers.player.movement + 1],
            512 * Math.floor(this.imageIndex / 2),
            0,
            512,
            512,
            getCanvasCoord(this.objectLayers.player.x - 8, this.unitSize, false) + fullscreen * screenCorner.x - this.camera.x * this.unitSize,
            getCanvasCoord(this.objectLayers.player.y + 8, this.unitSize, true) + fullscreen * screenCorner.y + this.camera.y * this.unitSize,
            this.unitSize * 16,
            this.unitSize * 16
        );

        // Draw Colliders
        canvas2dContext.save();
        canvas2dContext.globalAlpha = 0.5;

        canvas2dContext.restore();
    }
}

function getCanvasCoord(coord, unitSize, upDown) {
    let result;
    if (upDown) {
        result = (unitSize * (0 - coord) + unitSize * 45);
    } else {
        result = (unitSize * coord + unitSize * 80);
    }
    return result;
}
//#endregion

//#endregion

//#region -- Debugging & Benchmarking --

// - Test a sorter -
/*
How to use:
    testSorter(insertionSort, [Size of random array to sort])
    testSorter(mergeSort, [Size of random array to sort])
    testSorter(quickSort, [Size of random array to sort], 0, [Size of random array to sort MINUS ONE])
Examples:
I want to sort 3 randomly generated arrays, each with 500 indices
    testSorter(insertionSort, 500)
    testSorter(mergeSort, 500)
    testSorter(quickSort, 500, 0, 499)
*/
function testSorter(callback, arraySize) {
    let additionalParams = new Array();
    for (let n = 2; n < arguments.length; n++) {
        additionalParams.push(arguments[n]);
    }

    let inputArray = new Array();
    for (let n = 0; n < arraySize; n++) {
        inputArray.push(Math.round(Math.random() * (arraySize - 1)));
    }
    console.time('test')
    console.log(callback(inputArray, ...additionalParams));
    console.timeEnd('test');
}
//#endregion

//#region -- Testing & Helpers --