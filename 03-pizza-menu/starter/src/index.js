//1)Import React and ReactDOM Library

import React from 'react';
import ReactDOM from 'react-dom/client';
import pizzaData from './data';
import './index.css';

//2)get reference to root div HTML
//3)tell React to take control of that root HTML element
const root = ReactDOM.createRoot(document.getElementById('root'));

//5) show the app on the screen
root.render(
  //this will make the elements render twice behind the scenes
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//this is usually done in a separate file(s)

//4)Create the  app
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

//4)create the components:
//components: a component is a function that has to return one element. it could return multiple(nested) elements as long as they are wrapped in a div

function Header() {
  // const style = { color: 'red', fontSize: '48px', textTransform: 'uppercase' };
  const style = {};

  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {numPizzas > 0 && (
        <React.Fragment key={98737492}>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            form our stone oven. All organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map(pizza => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </React.Fragment>
      )}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  // if (pizzaObj.soldOut) return null;

  return (
    <li className={`pizza ${pizzaObj.soldOut && 'sold-out'}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>

        <span>{pizzaObj.soldOut ? 'SOLD OUT' : pizzaObj.price + 3}</span>
        {/* {pizzaObj.soldOut ? (
          <span>SOLD OUT </span>
        ) : (
          <span>{pizzaObj.price}</span>
        )} */}
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  console.log(hour);
  const hours = [11, 22];
  const isOpen = hour >= hours[0] && hour <= hours[1];
  console.log(isOpen);
  return (
    <footer className="footer">
      {isOpen ? (
        <Order hours={hours} />
      ) : (
        <p>
          We're happy to welcome you between {hours[0]}:00 and {hours[1]}:00.
        </p>
      )}
    </footer>
  );

  // return React.createElement('footer', null, 'We are currently open');
}

function Order({ hours }) {
  return (
    <div className="order">
      <p>We're open till {hours[1]}:00. Come visit us or order online!</p>
      <button className="btn">Order Now</button>
    </div>
  );
}
