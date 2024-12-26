class Vehicle {
    constructor(licensePlate, size) {
        this.licensePlate = licensePlate;
        this.size = size;
    }
}

class Car extends Vehicle {
    constructor(licensePlate) {
        super(licensePlate, 1);
    }
}

class Truck extends Vehicle {
    constructor(licensePlate) {
        super(licensePlate, 2);
    }
}

class Motorcycle extends Vehicle {
    constructor(licensePlate) {
        super(licensePlate, 0.5);
    }
}

class ParkingSpot {
    constructor(spotNumber, size) {
        this.spotNumber = spotNumber;
        this.size = size;
        this.isOccupied = false;
        this.vehicle = null;
    }
    assignVehicle(vehicle) {
        if (this.isOccupied || vehicle.size > this.size) {
            throw new Error("Місце зайняте або занадто мале для цього транспортного засобу.");
        }
        this.isOccupied = true;
        this.vehicle = vehicle;
    }
    freeSpot() {
        if (!this.isOccupied) {
            throw new Error("Місце вже вільне.");
        }
        this.isOccupied = false;
        this.vehicle = null;
    }
}

class ParkingLot {
    constructor() {
        this.spots = [];
    }

    addSpot(spot) {
        this.spots.push(spot);
    }

    parkVehicle(vehicle) {
        const spot = this.spots.find(s => !s.isOccupied && s.size >= vehicle.size);
        if (!spot) {
            throw new Error("Немає доступних місць для цього транспортного засобу.");
        }
        spot.assignVehicle(vehicle);
        console.log(`Транспортний засіб з номером ${vehicle.licensePlate} припарковано на місці №${spot.spotNumber}.`);
    }

    leaveSpot(licensePlate) {
        const spot = this.spots.find(s => s.isOccupied && s.vehicle.licensePlate === licensePlate);
        if (!spot) {
            throw new Error("Транспортний засіб з таким номером не знайдено на парковці.");
        }
        spot.freeSpot();
        console.log(`Транспортний засіб з номером ${licensePlate} звільнив місце №${spot.spotNumber}.`);
    }

    checkFreeSpots() {
        return this.spots.filter(s => !s.isOccupied).map(s => s.spotNumber);
    }
}

const parkingLot = new ParkingLot();
parkingLot.addSpot(new ParkingSpot(1, 1));
parkingLot.addSpot(new ParkingSpot(2, 2));
parkingLot.addSpot(new ParkingSpot(3, 0.5));

const car = new Car("AA1234BB");
const truck = new Truck("CC5678DD");
const motorcycle = new Motorcycle("EE9012FF");

try {
    parkingLot.parkVehicle(car);
    parkingLot.parkVehicle(truck);
    parkingLot.parkVehicle(motorcycle);

    console.log("Вільні місця:", parkingLot.checkFreeSpots());

    parkingLot.leaveSpot("AA1234BB");
    console.log("Вільні місця після звільнення:", parkingLot.checkFreeSpots());
} catch (error) {
    console.error(error.message);
}
