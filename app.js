const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./validateSchema.js");
const Review = require("./models/review.js");


main().then(res=>{
    console.log("connection of database established");
})
.catch(err=>{
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/js")));

const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    // let errmsg = error.details.map((el)=>{  el.message}).join(",");
    console.log(error);
    if(error){
        throw new ExpressError(400,error);
    } else {
        next();
    }
}

const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    // let errmsg = error.details.map((el)=>{  el.message}).join(",");
    if(error){
        throw new ExpressError(400,error);
    } else {
        next();
    }
}

//all listings route
app.get("/listing",wrapAsync(async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}))

//create new route
app.get("/listing/new",(req,res)=>{
    res.render("listings/new.ejs")
})

//show lists route
app.get("/listing/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("review");

    
    res.render("listings/show.ejs",{listing});
}))

//create route
app.post("/listing",validateListing,wrapAsync(async(req,res,next)=>{
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listing");
}));


//edit route
app.get("/listing/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}))


//update route
app.put("/listing/:id",validateListing,wrapAsync(async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"send a valid data");
    }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    console.log("edited and updated successfully");
    res.redirect(`/listing/${id}`);

}))

//delete route
app.delete("/listing/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let del = await Listing.findByIdAndDelete(id);
    console.log(del);
    res.redirect("/listing");
}))

//review route get review from the particular list using its id
//post
app.post("/listing/:id/review",validateReview,(async(req,res,)=>{
    let listing = await Listing.findById(req.params.id);
    let newRev = new Review(req.body.review);

    listing.review.push(newRev);
     await listing.save();
     await newRev.save();

    res.redirect("/listing/"+req.params.id);
   
}));



// app.use((err,req,res,next)=>{
//     res.send("error occured!");
// })

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found!"));
})

app.use((err, req, res,next) => {
    const status = err.status || 500; // Default to 500 if status is not provided
    const message = err.message || 'Internal Server Error'; // Default message
    res.status(status).render("error.ejs",{status,message});
});



// app.get("/testing",async(req,res)=>{
//     // let sampleListing = new Listing({
//     //     title :"my new villa",
//     //     description: "available now",
//     //     price:1200,
//     //     location:"Mysore,Karnataka",
//     //     country:"India",

//     // });

//     // await sampleListing.save();
//     let data = await Listing.find();
//     res.send(data);
// })

app.listen(8080,()=>{
    console.log("server has started!");
})

app.get("/",(req,res)=>{
    res.send("<h1>Hii , iam root </h1>");
})