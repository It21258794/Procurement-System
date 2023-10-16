export interface INote{
orderId:String;
address: String;
requiredDate: Date;
items:[
    itemName: String,
      type: String,
      quantity: Number,
];
price:number;
}
