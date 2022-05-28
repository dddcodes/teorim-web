/*
PUNTOS:
 ->Cuando show_articles_per_category_limit es mayor a la cantidad de articles que la categoria 
   seleccionada esta categoria empieza a repetir articles en los ultimos para rellenar lo que 
   le falta para generar lo que dice show_articles_per_category_limit, por lo que practicamente 
   no es un limite xd.
*/

const multiple_article_box = document.querySelector('.multiple_article_box');

const default_mini = `https://i.ytimg.com/vi/gwJVyJsaf-E/maxresdefault.jpg`;
const default_author_photo = `http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png`;
const show_articles_limit = 30; //limite de article_box's que se generaran cada vez que se active una funcion generadora de estos.
const article_title_limit = 35;

const show_categories_limit = 4;
const show_articles_per_category_limit = 5;

let this_article; //se usara mas adelante para representar un article.

const article_list = 
[
   { //0
      title: `no te PARECE eso CURIOSO?!?`,  
      qual: 5, author: `fulano`
   },
   { //1
      title: `tengo DINERO tengo FLOW tengo todo lo que NO TIENES TU`,  
      qual: 4, author: `furro supremo`
   },
   { //2
      title: `OAH ME VENGO full hd ultra 4k apk mediafire para pobres`, 
      qual: 2, author: `fulanita`
   },
   { //3
      title: `articulo no.3`, 
      qual: 2, author: `fulanita`
   },
   { //4
      title: `articulaso ;v`, 
      qual: 2, author: `fulanita`
   },
   { //5
      title: `estamos en quiebra`,  
      qual: 5, author: `zjairoooo`
   },
   { //6
      title: `nice balls pewdiepie *shoot him*`, 
      qual: 5, author: `t-series`
   },
   { //7
      title: `inflation baby...fuck u`, 
      qual: 4, author: `sadman`
   }
];

//EX: article_categories[0].title = "webibabo";
//EX: article_categories[0].content[1].title = "tengo DINERO tengo FLOW tengo todo lo que NO TIENES TU";
const category_list = 
[
   {
      title: `MEMES`, 
      content: 
      [
         article_list[0],
         article_list[1],
         article_list[2],
         article_list[5],
         article_list[6]
      ]
   },
   {
      title: `NEGOCIOS`, 
      content: 
      [
         article_list[1],
         article_list[3],
         article_list[4],
         article_list[5],
         article_list[7]
      ]
   }
];




//funcion de generacion de articulos ==================================================




function show_articles(cat,qty) 
{
   let his = ``;
   let n = 0;
   let rep = false;
   let articles_generated = 0;

   for(let i = 0; i < qty; i++)
   {

      n = Math.floor(Math.random()*category_list[cat].content.length);
      repeat = his.includes(n); //HIS incluye a N?
      if( (repeat === true) & 
         (articles_generated < qty) & 
         (articles_generated < category_list[cat].content.length) )
      {  
         console.log(`====se repitio el no.${n}`);
         i--;
      } 
      else 
      {
         articles_generated++;

         his += `${n}-`;
         console.log(`====NEW ARTICLE...history:${his}`);

         this_article = category_list[cat].content[n];

         if(!this_article) break; //si este no. de articulo no existe se termina.

         if(this_article.title.length > article_title_limit)
         {
            this_article.title = this_article.title.slice(0, article_title_limit) + `...`;
         };

         multiple_article_box.innerHTML += `
         <div class="article_box"> 

            <a href="#">
               <img class="article_box_mini" src="${default_mini}" width="200px"> 
            </a>

            <a href="#">
               <p class="article_box_category">-${category_list[cat].title}-</p>
            </a>

            <a href="#">
               <p class="article_box_title" >
                  ${this_article.title}
               </p>
            </a>

            <a href="#">
               <div class="author_box"> 

                  <img class="author_box_photo" src="${default_author_photo}" width="20px">

                  <p class="author_box_name">${this_article.author}</p> 

               </div> 
            </a>

         </div>
         `;
      }
   
   };
};




//funcion de generacion de articulos por categorias. =============================================




function show_categories()
{
   console.log(`show_categories() OPEN`);
   let n = 0;

   for(let i = 0; i < show_categories_limit; i++)
   {
      console.log(`==Loop ${i} OPEN`);
      n = Math.floor(Math.random()*category_list.length);
      this_category = category_list[n];

      //se genera el encabezado de la categoria:
      multiple_article_box.innerHTML += `
      <div class="category_title_box">

         <p class="category_title_box_name">
            ${this_category.title}
            <ion-icon name="caret-forward-outline"></ion-icon>
         </p>

      </div>
      `;

      //se generan articles:
      show_articles(n,show_articles_per_category_limit); 

      //se genera el btn de mostrar mas para moviles:
      multiple_article_box.innerHTML += `
      <a href="#" class="category_more_btn" id="category_more_btn">
         <ion-icon name="caret-down-outline"></ion-icon>
      </a>
      `;
         
      console.log(`==Loop ${i} CLOSED`);
   };

   console.log(`show_categories() CLOSED`);
};

show_categories()