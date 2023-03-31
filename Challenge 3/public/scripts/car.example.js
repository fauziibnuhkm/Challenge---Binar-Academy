class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({ id, plate, manufacture, model, image, rentPerDay, capacity, description, transmission, available, type, year, options, specs, availableAt }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
          <div class="col">
            <div class="card mb-5">
              <div class="car-list">
              <img src="${this.image}" id="imgCar" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${this.type}</h5>
                <h3> <b>Rp ${this.rentPerDay} /Hari</b> </h3>
                <p class="card-text card-insize">${this.description}</p>
                
                <div class="row pb-2">
                  <div class="col-1"><img src="./asset/img/icon/fi_users.png" alt=""></div>
                  <div class="col">${this.capacity} Orang</div>
                </div>
                <div class="row pb-2">
                  <div class="col-1"><img src="./asset/img/icon/fi_users.png" alt=""></div>
                  <div class="col"> ${this.transmission} </div>
                </div>
                <div class="row pb-4">
                  <div class="col-1"><img src="./asset/img/icon/fi_users.png" alt=""></div>
                  <div class="col"> ${this.year} </div>
                </div>
                <a href="#" class="btn btn-success py-2" style="width: 100%;">Pilih Mobil</a>
              </div>
              </div>
            </div>
    `;
  }
}
