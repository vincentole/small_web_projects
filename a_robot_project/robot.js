// Village Graph
const roads = ["Alice's House-Bob's House", "Alice's House-Cabin", "Alice's House-Post Office", "Bob's House-Town Hall", "Daria's House-Ernie's House", "Daria's House-Town Hall", "Ernie's House-Grete's House", "Grete's House-Farm", "Grete's House-Shop", "Marketplace-Farm", "Marketplace-Post Office", "Marketplace-Shop", "Marketplace-Town Hall", "Shop-Town Hall"];

function buildGraph(edges) {
    let graph = Object.create(null);

    function addEdge(from, to) {
        if (graph[from] == null) graph[from] = [to];
        else graph[from].push(to);
    }

    for (let [from, to] of edges.map((road) => road.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }

    return graph;
}

const roadGraph = buildGraph(roads);

//  Village State
class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) return this;
        else {
            let parcels = this.parcels
                .map((p) => {
                    if (this.place !== p.place) return p;
                    return { place: destination, address: p.address };
                })
                .filter((p) => p.place !== p.address);

            return new VillageState(destination, parcels);
        }
    }

    static random(parcelCount = 5) {
        let parcels = [];
        for (let i = 0; i < parcelCount; i++) {
            let place = randomPick(Object.keys(roadGraph));
            let address;
            do {
                address = randomPick(Object.keys(roadGraph));
            } while (place === address);
            parcels.push({ place: place, address: address });
        }
        return new VillageState("Post Office", parcels);
    }
}

//  Run Robot function
function runRobot(state, robot, memory, logging = true) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            if (logging) console.log(`Done in ${turn} turns`);
            return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        if (logging) console.log(`Moved to ${action.direction}`);
    }
}

// Random Robot
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return { direction: randomPick(roadGraph[state.place]) };
}

// runRobot(VillageState.random(), randomRobot);

// Route Robot
const mailRoute = ["Alice's House", "Cabin", "Alice's House", "Bob's House", "Town Hall", "Daria's House", "Ernie's House", "Grete's House", "Shop", "Grete's House", "Farm", "Marketplace", "Post Office"];

function routeRobot(state, memory) {
    if (memory.length === 0) {
        memory = mailRoute;
    }
    return { direction: memory[0], memory: memory.slice(1) };
}

// runRobot(VillageState.random(), routeRobot, mailRoute);


//  Simple Path Finder
function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place === to) return route.concat(place);
            if (!work.some(w => w.at === route)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

//  Simple Goal Oriented Robot
function goalOrientedRobot({place,parcels}, route) {
    if (route.length === 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

// runRobot(VillageState.random(), goalOrientedRobot, []);

// Better Goal Oriented Robot
function betterGoalOrientedRobot({place, parcels}, route) {
    if (route.length === 0) {
        let tempRoute;
        for (let parcel of parcels) {
            if (parcel.place !== place) {
                tempRoute = findRoute(roadGraph, place, parcel.place);
            } else tempRoute = findRoute(roadGraph, place, parcel.address);

            if (tempRoute.length < route.lenth || route.length === 0) route = tempRoute;
        }
    }

    return {direction: route[0], memory: route.slice(1)};
}


// runRobot(VillageState.random(), betterGoalOrientedRobot, []);


// Compare Robots
function compareRobots(robot1, memory1, robot2, memory2) {
    let total1 = 0;
    let total2 = 0;
    for (let i = 0; i < 100; i++) {
        total1 += runRobot(VillageState.random(), robot1, memory1, logging = false);
        total2 += runRobot(VillageState.random(), robot2, memory2, logging = false);
    }
    console.log(`1st Robot's average turns: ${total1 / 100}\n2nd Robot's avaerge turns: ${total2 / 100}`);
}


// compareRobots(goalOrientedRobot, [], routeRobot, mailRoute);
compareRobots(goalOrientedRobot, [], betterGoalOrientedRobot, []);


