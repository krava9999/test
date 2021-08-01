
class ProductList{
   constructor(container='.products'){
      this.container = container;
      this.goods = []; // создаем пустой массив который будет принимать в себя список товаров
      this.fetchProducts();// вызываем метод fetchProducts
      this.render();
      this.sumRender();
   }

   // наполняем через метод массив goods
   fetchProducts(){
      this.goods = [
         {id: 1, title: "notebook", price: 20000},
         {id: 2, title: "mouse", price: 1000},
         {id: 3, title: "microphone", price: 3600},
         {id: 4, title: "iphone", price: 59999},
         {id: 5, title: "keyboard", price: 2100},
         {id: 6, title: "headphones", price: 2400},
      ];
   }
   render(){   
               // получаем разметку куда будем вставлять разметку с товаром
              const block = document.querySelector(this.container);
              // для каждого элемента product из массива goods   
              for(let product of this.goods){
                 // создаем новый объекст item класса ProductItem, передаем значение из product
                  const item = new ProductItem(product);
                  // в конец разметки добавляем то что вернет нам метод render 
                   block.insertAdjacentHTML("beforeend", item.render());
                  //  block.innerHTML += item.render();
              }
          }
    
   sumRender(){
      const block = document.querySelector('.total-price');
      let sum = 0;
      let sumProducts = this.goods.forEach(element =>{
       sum += element.price;
      })
     block.insertAdjacentHTML("beforeend", `
     <h2>Сумма товара: ${sum} руб.</h2>
     `)

   }       
   }
   

class ProductItem{
   // принимаем парам со значением из массива 
    constructor(product,img='https://via.placeholder.com/200x150'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    // подставляем значения из массива  и возвращаем разметку
    render(){
           return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}


let list = new ProductList();