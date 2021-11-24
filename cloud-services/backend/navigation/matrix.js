'use strict';

/*
 * This is a literal implementation of occupation matrixes. It supports:
  - A function for building matrixes of any size.
  - Changing the occupation of matrixes. 
  - Getting those values.

  NOTE:
  - top left position is (0,0) which is occupationmatrix[0][0]
  - occupied is 1. Not occupied is 0.
  - format is (col,row)
 */

var occupationmatrix = []
// Constructor for the matrix.
function buildMatrix(height, width) {
  for(var i=0; i<height; i++) {
    occupationmatrix[i] = [];
    for(var j=0; j<width; j++) {
        occupationmatrix[i][j] = 0;
    }
  }
  return occupationmatrix;
}

// change occupation at a position. 
function changeOccupationMatrixAtPosition(row, col) {
  occupationmatrix[row][col] = 1 - occupationmatrix[row][col]
}

// get occupation at a position. 
function getOccupationMatrixAtPosition(row, col) {
  return occupationmatrix[row][col]
}

// Print the entire matrix into the terminal.
function printMatrix(matrix){
  for(var i=0; i<matrix.length; i++){
    var arr = []
    for(let j=0; j<matrix[i].length; j++){
      arr.push(matrix[i][j])
    }
    console.log(arr);
  }
}

// Get the number of free slots in a row.
function getFreeSlotsInRow(rowNumber){
  var res = 0;
  var arr = occupationmatrix[rowNumber]
  console.log("row: " + arr)
  arr.forEach(function(item){if(item == 0){res += 1;}})
  return res
}

/* Returns the percentage of free slots in a row. Printing thresholds for percentage free: 
  - < 15%: full.
  - <= 50%: mostly occupied.
  - <= 75%: slightly occupied.
  - > 75%: empty.
*/ 
function getIsRowOccupied(rowNumber){
  var totalSlots = occupationmatrix[rowNumber].length;
  var freeSlots = getFreeSlotsInRow(rowNumber);

  if(freeSlots > totalSlots){
    console.err("The matrix is broken. Somehow there are more free slots than total slots."); 
    return -1
  }

  // percentage of free slots calculated as a decimal
  var percentageFree = freeSlots / totalSlots;

  if(percentageFree > 0 && percentageFree < 0.15){console.log("full. Free space pct: "+ percentageFree)}
  if(percentageFree > 0.15 && percentageFree <= 0.50){console.log("mostly occupied. Free space pct: " + percentageFree)}
  if(percentageFree > 0.50 && percentageFree <= 0.75){console.log("slightly occupied. Free space pct: " + percentageFree)}
  if(percentageFree > 0.75 && percentageFree <= 1){console.log("empty. Free space pct: " + percentageFree)}

  return percentageFree;
}

/* Returns the percentage of free slots in the matrix. Printing thresholds for percentage free:
  - < 15%: full.
  - <= 50%: mostly occupied.
  - <= 75%: slightly occupied.
  - > 75%: empty.
*/
function getIsMatrixOccupied(matrix){
  var tot = 0;
  var res = 0;
  for(var i=0; i<matrix.length; i++){
    for(let j=0; j<matrix[i].length; j++){
      res+=matrix[i][j]
      tot++;
    }
  }
  console.log("tot: " + tot + ", res: " + res);

  var fs = tot-res
  var percentageFree = (fs/tot).toFixed(2)

  if(percentageFree > 0 && percentageFree < 0.15){console.log("full. Free space pct: "+ percentageFree)}
  if(percentageFree > 0.15 && percentageFree <= 0.50){console.log("mostly occupied. Free space pct: " + percentageFree)}
  if(percentageFree > 0.50 && percentageFree <= 0.75){console.log("slightly occupied. Free space pct: " + percentageFree)}
  if(percentageFree > 0.75 && percentageFree <= 1){console.log("empty. Free space pct: " + percentageFree)}

  return percentageFree;
}

// Test function. Builds a 9x10 matrix, changes the value of a random place, and checks it. 
function test(){
  // Build a matrix of size .
  var matrix = buildMatrix(9,10);
  // Populate the matrix with random values.
  
  for(var i=0; i<9; i++){
    for(var j=0; j<10; j++){
      matrix[i][j] = parseInt((Math.random()*(1-0)).toFixed(0))
    }
  }
  
  console.log("matrix:")
  printMatrix(matrix);

  var x = parseInt((Math.random()*8).toFixed(0))
  console.log("x: " + x)
  var y = parseInt((Math.random()*9).toFixed(0))

  // Change occupation (OK)
  console.log("------------------------------------------------")
  console.log("CHECKING OCCUPATION CHANGE WORKS")
  console.log("Old value: " + getOccupationMatrixAtPosition(x,y))
  changeOccupationMatrixAtPosition(x,y)
  console.log("Changed occupation at (" + x + ", " + y + ")");
  console.log("New value: " + getOccupationMatrixAtPosition(x,y))
  printMatrix(matrix);
  // Get number of free spots in a row (OK)
  console.log("------------------------------------------------")
  console.log("CHECKING NUMBER OF FREE SPOTS IN ROW WORKS.")
  console.log("old value: " + getFreeSlotsInRow(x))
  console.log("Changed occupation at (" + x + ", " + y + ")");
  changeOccupationMatrixAtPosition(x,y);
  console.log("New value: " + getFreeSlotsInRow(x))
  printMatrix(matrix);
  // Check if a row is occupied.
  console.log("------------------------------------------------")
  console.log("CHECKING IF A ROW IS OCCUPIED. THIS IS WHAT SHOULD BE OUTPUTTED.")
  console.log(getIsRowOccupied(x))
  console.log("------------------------------------------------")
  console.log("CHECKING IF THE ENTIRE LOT IS OCCUPIED")
  console.log(getIsMatrixOccupied(matrix))
}

test();