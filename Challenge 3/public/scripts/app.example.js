class App {
  constructor() {
    // this.clearButton = document.getElementById("clear-btn");
    // this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById('cars-container');
    this.btnCari = document.getElementById('btn-cari');
    this.date = document.getElementById('date');
    this.time = document.getElementById('time');
    this.jumlah = document.getElementById('jumlah');
  }

  async init() {
    await this.load();

    // Register click listener
    // this.clearButton.onclick = this.clear;
    // this.loadButton.onclick = this.run;
    this.btnCari.onclick = this.run;
  }

  run = () => {
    this.clear();
    // mengambi data pada form
    const jumlahOrang = this.jumlah.value;
    const date = this.date.value;
    const time = this.time.value;
    // menggabungkan date dan time
    const newDate = new Date(`${date} ${time}`);
    // mendapatkan epoch
    const epoch = newDate.getTime();
    // console.log('jumlah orang ', jumlahOrang, 'date ', newDate, 'epoch ', epoch);
    // kirimkan data ke load
    this.load(epoch, jumlahOrang);

    // Car.list.forEach((car) => {
    //   const node = document.createElement('div');
    //   node.innerHTML = car.render();
    //   this.carContainerElement.appendChild(node);
    // });
  };

  async load(time, capacity) {
    if (time || capacity) {
      console.log('data ada');
      const cars = await Binar.listCars((item) => item.capacity >= capacity && item.availableAt >= time);
      console.log(cars);
      Car.init(cars);
      Car.list.forEach((car) => {
        const node = document.createElement('div');
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
      });
    } else {
      console.log('data kosong');

      const cars = await Binar.listCars();
      console.log(cars);
      Car.init(cars);
      Car.list.forEach((car) => {
        const node = document.createElement('div');
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
      });
    }
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
