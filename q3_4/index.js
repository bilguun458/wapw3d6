const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "view"));
app.use(express.urlencoded({ extended: false }));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/imgs', express.static(path.join(__dirname, 'imgs')));

let products = [
    {
        id: 1,
        name: "Chair",
        price: 100,
        image: "/imgs/chair.webp"
    },
    {
        id: 2,
        name: "Table",
        price: 200,
        image: "/imgs/table.jpeg"
    },
    {
        id: 3,
        name: "Bed",
        price: 300,
        image: "/imgs/bed.jpeg"
    },
    {
        id: 4,
        name: "Sofa",
        price: 900,
        image: "/imgs/sofa.jpeg"
    },
    {
        id: 5,
        name: "Lamp",
        price: 140,
        image: "/imgs/lamp.jpeg"
    },
    {
        id: 6,
        name: "Desk",
        price: 540,
        image: "/imgs/desk.jpeg"
    }
];

let shoppingCart = {};

app.get('/', (req, res) => {
    res.render("shop", {
        products: products,
    });
});

app.get('/product/:id', (req, res) => {
    const id = req.params.id
    const product = products.find(p => p.id == id);
    res.render("product", {
        product: product,
    });
});

app.post('/addToCart', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    if (!shoppingCart[name]) {
        shoppingCart[name] = { name: name, price: price, quantity: 1 }
    } else {
        const quantity = shoppingCart[name].quantity
        shoppingCart[name].quantity = quantity + 1;
        shoppingCart[name].price = (quantity + 1) * price;
    }

    res.redirect(`/shoppingcart`);
});

app.get('/shoppingcart', (req, res) => {
    res.render("shoppingcart", {
        shoppingCart: shoppingCart,
    });
});

app.listen(3000);