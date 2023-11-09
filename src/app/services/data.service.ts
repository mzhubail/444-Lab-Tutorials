import { Injectable } from '@angular/core';

export interface Product {
  Section: String,
  Category: String,
  Type: String,
  Name: String,
  Image: String,
  Specification: String,
  Price_history: Array<{ price: Number, date: Date }>
}

export interface Section {
  Section: string;
  Category: string[];
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  list: Product[] = [
    { Section: "Large Appliances", Category: "Refrigerator", Type: "medium", Name: "Hitachi", Image: "Refrigerator.jpg", Specification: "Dual Invertor", Price_history: [{ price: 200, date: new Date("2022-03-25") }, { price: 180, date: new Date("2022-09-30") }, { price: 140, date: new Date("2023-03-20") }] },
    { Section: "Large Appliances", Category: "Air Conditioner", Type: "split", Name: "Pearl", Image: "Airconditioner.jpg", Specification: "Invertor", Price_history: [{ price: 250, date: new Date("2022-03-25") }, { price: 240, date: new Date("2022-09-30") }, { price: 230, date: new Date("2023-03-20") }] },
    { Section: "Large Appliances", Category: "Washing Machine", Type: "top", Name: "LG", Image: "WashingMachine.jpg", Specification: "Top load 12KG", Price_history: [{ price: 120, date: new Date("2022-03-25") }, { price: 110, date: new Date("2022-09-30") }, { price: 95, date: new Date("2023-03-20") }] },
    { Section: "Computing", Category: "Laptop", Type: "macbook", Name: "Apple", Image: "laptop.jpg", Specification: "macbook pro", Price_history: [{ price: 800, date: new Date("2022-03-25") }, { price: 750, date: new Date("2022-09-30") }, { price: 660, date: new Date("2023-03-20") }] },
    { Section: "Computing", Category: "Desktop", Type: "Intell", Name: "Dell", Image: "Desktop.jpg", Specification: "Windows 11", Price_history: [{ price: 350, date: new Date("2022-03-25") }, { price: 330, date: new Date("2022-09-30") }, { price: 250, date: new Date("2023-03-20") }] },
    { Section: "Computing", Category: "TV", Type: "LED", Name: "Samsung", Image: "TV.jpg", Specification: "55 inch", Price_history: [{ price: 500, date: new Date("2022-03-25") }, { price: 400, date: new Date("2022-09-30") }, { price: 300, date: new Date("2023-03-20") }] },
    { Section: "Computing", Category: "Storage", Type: "SSD", Name: "Toshiba", Image: "Storage.jpg", Specification: "128GB", Price_history: [{ price: 20, date: new Date("2022-03-25") }, { price: 18, date: new Date("2022-09-30") }, { price: 17, date: new Date("2023-03-20") }] },
    { Section: "Small Appliances", Category: "Coffee", Type: "Kettle", Name: "Philips", Image: "Coffee.jpg", Specification: "2.1 litre", Price_history: [{ price: 15, date: new Date("2022-03-25") }, { price: 13, date: new Date("2022-09-30") }, { price: 13, date: new Date("2023-03-20") }] },
    { Section: "Small Appliances", Category: "Iron", Type: "steam", Name: "Kenwood", Image: "Iron.jpg", Specification: "Standing", Price_history: [{ price: 30, date: new Date("2022-03-25") }, { price: 28, date: new Date("2022-09-30") }, { price: 25, date: new Date("2023-03-20") }] },
    { Section: "Small Appliances", Category: "Vacuum", Type: "Cylimder", Name: "Hitachi", Image: "Vacuum.jpg", Specification: "2200 Watt", Price_history: [{ price: 65, date: new Date("2022-03-25") }, { price: 65, date: new Date("2022-09-30") }, { price: 65, date: new Date("2023-03-20") }] },
  ];

  sections: Section[] = [
    {
      Section: "Large Appliances",
      Category: ["Refrigerator", "Air Conditioner", "Washing Machine"]
    },
    {
      Section: "Computing",
      Category: ["Laptop", "Desktop", "TV", "Storage"]
    },
    {
      Section: "Small Appliances",
      Category: ["Coffee", "Iron", "Vacuum"]
    }
  ];

  empty_product = (): Product => ({
    Section: '',
    Category: '',
    Name: '',
    Price_history: [{
      price: 0,
      date: new Date()
    }],

    Type: '',
    Image: '',
    Specification: '',
  });

  constructor() { }
}
