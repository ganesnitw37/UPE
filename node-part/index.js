const express = require('express');
const app = express();
const port = 4000;
const path = require('path')
const mongoose = require('mongoose');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
const cors = require('cors');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://Ganesh37:Ganesh%402013@cluster0.stqph.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    // Start the server after MongoDB connection is successful

})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Define the User model
const Users = mongoose.model('Users', {username: String, mobile: String, email: String, password: String, likedProducts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Products'}] });
const Products = mongoose.model('Products', { pname: String,
     pdesc: String,
      price: String,
       category: String,
        pimage: String,
         userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }});

// Route to test server
app.get('/search', (req,res)=>{
    let search=req.query.search;
    Products.find({
        $or : [
            {pname : { $regex : search}},
            {pdesc : { $regex : search}},
            {price : { $regex : search}}
        ]
    })
    .then((results)=>{
        res.send({message: "success", products: results })
    })
    .catch((err)=>{
        res.send({ message: 'Server err'})
    })
})

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/like_product', (req,res) =>{
    let productId = req.body.productId;
    let userId = req.body.userId;

    Users.updateOne({_id: userId }, { $addToSet: { likedProducts: productId} })
    .then(() => {
        res.send({ message: "Liked Success" });
    })
    .catch(err => {
        res.status(500).send({ message: "Server error" });
    })
})

app.post('/add-product', upload.single('pimage'), (req, res) => {
    const pname= req.body.pname;
    const pdesc= req.body.pdesc;                                                                                  
    const price= req.body.price;
    const category= req.body.category;
    const pimage= req.file.path; // This should log the file object
    const userId = req.body.userId;

    const product = new Products({ pname, pdesc, price, category, pimage, userId });
    product.save()
    .then(() => {
        res.send({ message: "Successfully Saved" });
    })
    .catch(err => {
        console.error('Error saving user:', err);
        res.status(500).send({ message: "Server error" });
    })
});

app.get('/get-products', (req, res) => {
    const catName = req.query.catName;

    let query = {};
    if (catName) {
        query = { category: catName };
    }

    Products.find(query)
    .then((result) => {
        res.send({ message: "success", products: result });
    })
    .catch((err) => {
        console.error('Error fetching products:', err);
        res.status(500).send({ message: 'Server error' });
    });
});

app.get('/get-user-products/:userId', (req, res) => {
    const userId = req.params.userId;

    Products.find({ userId: userId })
    .then((result) => {
        res.send({ message: "success", products: result });
    })
    .catch((err) => {
        res.send({ message: 'Server error' });
    });
});


app.get('/get-product/:pId',(req,res)=>{
    Products.findOne({_id: req.params.pId})
    .then((result)=>{
        res.send({message: "success", product: result })
    })
    .catch((err)=>{
        res.send({ message: 'Server err'})
    })
})

app.post('/liked-products',(req,res)=>{
    Users.findOne({_id: req.body.userId}).populate('likedProducts')
    .then((result)=>{
        res.send({message: "success", products: result.likedProducts})
    })
    .catch((err)=>{
        res.send({ message: 'Server err'})
    })
})

// Signup route
app.post('/signup', (req, res) => {
    // Create a new user
    const user = new Users({ username: req.body.username, password: req.body.password, email: req.body.email, mobile: req.body.mobile });

    user.save()
    .then(() => {
        res.send({ message: "Successfully Saved" });
    })
    .catch(err => {
        console.error('Error saving user:', err);
        res.status(500).send({ message: "Server error" });
    });
});

app.get('/get-user/:uId', (req, res) => {
    const _userId = req.params.uId;
    Users.findOne({ _id: _userId })
        .then((result) => {
            if (result) {
                res.send({ message: 'success', username: result.username, email: result.email, mobile: result.mobile });
            }
        })
        .catch((err) => {
            console.error('Database error:'); 
        });
});


app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    Users.findOne({username: username})
    .then((result) => {
        if(!result){
            res.send({message: 'user not found.'})
        }else{
            if(result.password==password){
                const token=jwt.sign({
                    data: result
                  }, 'MYKEY', { expiresIn: '1h' });
                res.send({message: "find success", token: token, userId : result._id})
            }
            if(result.password!=password){
                res.send({message: "wrong password."})
            }
        }
    })
    .catch(() => {
        res.send({message: 'server error'})
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});