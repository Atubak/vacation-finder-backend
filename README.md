# vacation-finder-backend

#### locationFinder.js

this file houses the main logic of the entire VacaLoca project: taking all the individiual datapoints and putting them together in the respective ranges that they are located in.

in this file:


- node.js 'fs' package to read and write files in the server's folder system.

- rangeBoxer function to take each datapoint from the category with the least amount of datapoints and calculate a 5x5 range around it by using rangeCalculator.js (located in helperFunctions folder). 

- dataPointInserter function that takes the ranges from rangeBoxer and inserts a datapoint if it is within a range, removes the whole range if there is no datapoint that goes into it.

- locationFinder function that manages the order in which the above are to be called. With some messages indicating its progress.
---

You can check it out by going to https://vacation-locator-vacaloca.herokuapp.com/locations/example. This will show a sample response with the categories "circus" and "beach".  
