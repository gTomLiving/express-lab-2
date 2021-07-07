import express from 'express';

const routes = express.Router()


function fixPay(price: number) :string{

    let newFix: number|string = price.toFixed(2);

    return newFix;

}
console.log(fixPay(2));

//Specialty Pizza 

const specPizza: object[] = [
    {
        name: "Anchovy Lover's",
        price: 15
    },
    {
        name: "Paleo Pizza",
        price: 15
    },
    {
        name: "Dessert Pizza",
        price: 15
    }
]

interface Review {
    name: string,
    text: string,
    rating: string
}
interface Topping {
    type: string
}

const pizzaTops: Topping[] = [
    {
        type: "peperoni"
    },
    {
        type: "cheddar"
    },
    {
        type: "green pepper"
    },
    {
        type: "ham"
    },
    {
        type: "spinnach"
    },
    {
        type: "beef"
    },
    {
        type: "chicken"
    }
]

interface Calculate {
    size: string,
    topping: number,
    gf: boolean,
    comment?: string,
    total: string
}


//GET / home page

routes.get('/', (req, res) => {
    res.render('homepage', {pizza: specPizza});
})
//spec pizza routes
routes.get('/anchovy', (req, res) => {
    res.render('anchovy');
})
routes.get('/paleo', (req, res) => {
    res.render('paleo');
})
routes.get('/dessert', (req, res) => {
    res.render('dessert');
})

//to Review pg

routes.get('/review', (req, res) => {
    res.render('review');
})

routes.get('/create', (req, res) => {
    res.render('create', {tops: pizzaTops})
})



routes.post('/review', (req, res) => {
    const name: string = req.body.name ? String(req.body.name) : '';
    const text: string = req.body.text ? String(req.body.text) : '';
    const rating: string = req.body.rating ? String(req.body.rating) : '';
    
    const newReview: Review = {
        name: name,
        text: text,
        rating: rating
    }

    res.render('reviewconfirmation', {review: newReview})
    


})
routes.post('/create', (req, res) => {
    let newtotal: number = 0;
    const newSize: string = req.body.size ? String(req.body.size) : '';
    const newTops: number = req.body.toppins ? Number(req.body.toppins) : 0;
    const newGluten: boolean = req.body.gluten ? Boolean(req.body.gluten) : false;
    const newComm: string = req.body.instruction ? String(req.body.instruction) : '';

    if(newSize === "large" ) {
        newtotal += 12;
        newtotal += (newTops * 1.25)

    }
    else if ( newSize === "medium") {
        newtotal += 10;
        newtotal += (newTops * 1.00)
    }
    else if ( newSize === "small") {
        newtotal += 7;
        newtotal += (newTops * .50)
    }
    if (newGluten === true) {
        newtotal += 2;
    }

    
    
    
    const newPrice: Calculate = {
        size: newSize,
        topping: newTops,
        gf: newGluten,
        comment: newComm,
        total: fixPay(newtotal)
    }





   res.render('createconfirm', {price: newPrice})
})








export default routes;