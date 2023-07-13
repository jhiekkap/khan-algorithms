const maze = [
    [-1,-1,-1,-1,-1,0,-1,-1],
    [-1,0,0,0,0,0,0,-1],
    [-1,0,-1,-1,-1,-1,0,-1],
    [-1,0,-1,0,-1,0,0,-1],
    [-1,0,-1,0,-1,-1,0,-1],
    [-1,0,-1,0,-1,0,0,-1],
    [-1,0,0,0,0,0,0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1],
];

const getCell= (x,y) => x >= 0 && y >= 0 ? maze[y][x] : -1;

const startingPoint = [5,0];
const goal = [3,3]

const printMaze = () => {
    maze.forEach(row => {
        console.log(row.map(cell => cell === -1 ? '* ' : cell < 10 ? `${cell} ` : cell).join(' '));
    });
}

let counter = 1;

const isStartingPoint = (x,y) => x === startingPoint[0] && y === startingPoint[1];

const isValid = (x,y) => getCell(x,y) == 0 && !isStartingPoint(x,y);

const getNeighbors = (x,y) => {
    const neighbors = [];

    if(isValid(x,y-1)) neighbors.push([x,y-1]);
    if(isValid(x,y+1)) neighbors.push([x,y+1]);
    if(isValid(x-1,y)) neighbors.push([x-1,y]);
    if(isValid(x+1,y)) neighbors.push([x+1,y]);

    return neighbors;
}

const getUniqueArray = (array) => {
    const uniqueArray = [];
        array.forEach(element => {
            if(!uniqueArray.find(el => el[0] === element[0] && el[1] === element[1])){
                uniqueArray.push(element);
            }
        });
    return uniqueArray;
}


const getSteps = (start, end ) => {
    let currentPoints = [start];
    const createRoutes = ()=> {
        const neighbors = getUniqueArray(currentPoints.map(point => getNeighbors(...point)).flat());
       
        if(neighbors.length){
            neighbors.forEach(neighbor => {     
                const [x,y] = neighbor;
                maze[y][x] = counter;
            }); 
            counter += 1;
            currentPoints = neighbors;
            createRoutes();
        };
    }

    createRoutes();
    printMaze();
};

getSteps(startingPoint, goal);
 
