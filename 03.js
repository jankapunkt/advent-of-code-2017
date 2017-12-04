/*
--- Day 3: Spiral Memory ---

You come across an experimental new kind of memory stored on an infinite two-dimensional grid.

Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...

While this is very space-efficient (no squares are skipped), requested data must be carried back to square 1 (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the Manhattan Distance between the location of the data and square 1.

For example:

    Data from square 1 is carried 0 steps, since it's at the access port.
    Data from square 12 is carried 3 steps, such as: down, left, left.
    Data from square 23 is carried only 2 steps: up twice.
    Data from square 1024 must be carried 31 steps.

How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?

Your puzzle input is 312051.


Help: https://stackoverflow.com/questions/11550153/determine-position-of-number-in-a-grid-of-numbers-centered-around-0-and-increasi
*/
console.clear();

const getNextPow = function(num) {
    if (num < 3) num = 3;
    const roundedRoot = Math.ceil(Math.sqrt(num));
    if (roundedRoot % 2 === 0)
        return getNextPow(num + 1);
    return roundedRoot * roundedRoot;
}

// returns which cycle is it
// a cycle is one round around the center
const getCycle = function(num) {
    return Math.floor((Math.sqrt(num) + 1) / 2);
}

// which num is the first
// in the cycle
const first = function(cycle) {
    const x = 2 * cycle - 1
    return x * x;
}

// the amount of numbers
// that occur in each cycle
const cycleLen = function(cycle) {
    return 8 * cycle
}

// the distance between the num
// and the first in the cycle
const getOffset = function(num, cycle) {
    return num - first(cycle);
}

const getSector = function(num, c) {
    const offset = num - first(c);
    const n = cycleLen(c);
    return Math.floor(4 * offset / n);
}

const position = function(num) {
    const c = getCycle(num);
    const sector = getSector(num, c);
    const offset = Math.floor(num - first(c) - Math.floor(sector * cycleLen(c) / 4));
    console.log("cycle: ", c);
    console.log("sector: ", sector);
    console.log("offset: ", offset);
    let x,y;
   	if (sector < 0.5) { //#north
        x = -c;
        y = -c + offset + 1;    
    }
    else if (sector < 1.5) { //#east
        x = -c + offset + 1;
        y =  c;      
    }
    else if (sector < 2.5) { //#south
        x = c;
        y = c - offset - 1;
    }
    else { //# west
        x =  c - offset - 1;
        y = -c;
    }
    
    return {
        x: x,
        y: y
    }
}

const manhattan_distance = function(a1, a2, b1, b2) {
    return Math.abs(a1 - b1) + Math.abs(a2 - b2);
}

const getDistanceToCenter = function(num) {
    console.log("-----");
    console.log("num: ", num)
        // lets get a matrix that is at
        // least feasible with this num
    const matrixSize = getNextPow(num);
    console.log("size: ", matrixSize);
    // length of a row
    const rowLen = Math.sqrt(matrixSize);
    console.log("rowLen: ", rowLen);

    // the center is always half both lengths
    const centerLen = Math.floor(rowLen / 2);
    console.log("center index: ", centerLen);

    // the position function uses 0 as first number
    // we use 1 so we need to sub 1 from our input
    const numPos = position(num-1);
    console.log("numPos: ", numPos)
    const numx = centerLen - numPos.x;
    const numy = centerLen - numPos.y;
    //console.log("pos: ", numx, numy)
    console.log( numPos.x + " => " + numx, numPos.y + " => " + numy)
    return manhattan_distance(numx, numy, centerLen, centerLen);
};

/*
    Data from square 1 is carried 0 steps, since it's at the access port.
    Data from square 12 is carried 3 steps, such as: down, left, left.
    Data from square 23 is carried only 2 steps: up twice.
    Data from square 1024 must be carried 31 steps.

*/
console.log(getDistanceToCenter(1));
console.log(getDistanceToCenter(12));
console.log(getDistanceToCenter(23));
console.log(getDistanceToCenter(1024));
console.log(getDistanceToCenter(312051));
