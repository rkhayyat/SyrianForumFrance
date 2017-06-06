export class Article {
    constructor
      (
        public id: string,
        public title: string,
        public categoryId: string,
        public date: string,
        public text: string,
        public imagepath: string,
        public tag: [string],
        public UID: string 
      )
    {}   
}



export class Category {
    constructor
      (
        public id: string,
        public title: string,
        public date: string,
        public description:string,
        public orderNumber:string,
        public UID: string 
      )
    {}   
}