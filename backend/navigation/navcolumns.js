var parkingslots = []
for (var i = 0; i < 7; i++) {
  parkingslots[i] = false;
}

function get(slotId){
  if(slotId < 1) return null;
  if(slotId > 8) return null;
  return parkingslots[slotId-1];
}

function changeState(slotId){
  var state = get(slotId);
  parkingslots[slotId-1] = !state
  console.log("Navigation has now slot: " + slotId + " as: " + !state)
}

function setState(slotId, state){
  parkingslots[slotId-1] = state
}

// determines the order of which slot is the "nearest" one.
var order = [4,8,3,7,2,6,1,5]

// Get the nearest unoccupied slot
function getNearestAvailableSlot(){
  var res = null; changed = false;

  /*
    Loop through real parking slots list
    If the spot is occupied, move on. 
    If the spot is not occupied, check if the corresponding parkingslotid is lower in the order than the current one.
    - If it is lower, save that spot.
    - If it is not lower, move on.  
  */

  var changed = false;
  order.forEach(function(value, index){
    if(get(value) == false && changed == false){
      //console.log("Found unoccupied spot: " + value)
      //console.log("getval: " + get(value) + " and changed: " + changed) 
      res = value
      changed = true
    }
  })

  // This is wrong. Dont uncomment this. 
  // parkingslots.forEach(function(slot, index){
  //   if(slot == false && changed == false){
  //     console.log("SLOTVAL: " + slot)
  //     res = order[index]
  //     changed = true
  //     console.log("changed to:" + res)
  //   } else {index++;}
  // })
  // Error handling. 
  if(get(res) == true) {
    console.log("Error: found " + res + " which is occupied."); 
    return null;
  }
  return res;
}

function test(){
  console.log("--------------------------------")
  console.log("running test driver code...");

  // Build a parking lot with 8 spaces. False is not occupied. True is occupied.
  // Simulated parking lot:
  //  P1: FREE  P5: OCCU
  //  P2: OCCU  P6: FREE
  //  P3: OCCU  P7: FREE
  //  P4: FREE  P8: OCCU
  //         ENTR
  parkingslots[0] = false; parkingslots[4] = true;
  parkingslots[1] = true; parkingslots[5] = false;
  parkingslots[2] = true; parkingslots[6] = false;
  parkingslots[3] = false; parkingslots[7] = true;

  // Check the state of some of of them. (OK)
  // console.log("--------------------------------")
  // console.log("Firstly, 4 should be free, and 8 occupied. 2 and 3 should be occupied.")
  // console.log("Slot four occupation: " + get(4));
  // console.log("Slot eight occupation: " + get(8));
  // console.log("slot two occupation: " + get(2) + " and three: " + get(3));

  // Change the value of some spot. (OK)
  // console.log("--------------------------------")
  // console.log("Change a spot, so that the thing updates. ")
  // console.log("slot two: " + get(2))
  // changeState(2);
  // console.log("now: " + get(2) + " change back so things work. ");
  // changeState(2);
  // console.log("2 is now: " + get(2))
  // console.log("Try another one. six: " + get(6));
  // changeState(6); console.log("changed to: " + get(6));
  // changeState(6); console.log("back: " + get(6));

  // Get nearest available slot. (OK)
  console.log("--------------------------------")
  var nearest = getNearestAvailableSlot();
  console.log("Nearest free slot should be 4, and is: " + nearest + ". Is it occupied? " + get(nearest));
  console.log("--------------------------------")
  
  // Try to change it and see which is the next nearest is. (OK)
  console.log("Now somebody parks there... ")
  changeState(nearest)
  console.log("New state of "+ nearest + " is: " + get(nearest));
  nearest = getNearestAvailableSlot();
  console.log("Find next nearest (should be 7): " + nearest);
  console.log("--------------------------------")
  console.log("Now four leaves...")
  changeState(4);
  console.log("Find next-nearest (should be 4)")
  console.log(getNearestAvailableSlot());

  // Force set state. 
  console.log("--------------------------------")
  console.log("Forcing state change")
  console.log("current state: " + get(4))
  var state = get(4);
  console.log("changing state...")
  setState(4, !state);
}
test();

export {get, changeState, setState, getNearestAvailableSlot}