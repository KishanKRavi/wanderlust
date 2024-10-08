// const mongoose = require("mongoose");
// const schema = mongoose.Schema;

// const listingSchema = new schema({
//     title:String,
//     description:String,
//     // image:{
//     //     type : String,
//     //     filename:String,
//     //     default:'https://images.unsplash.com/photo-1705413868961-d652425d6278?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     //      set: (v)=>v==="" ? 'https://images.unsplash.com/photo-1705413868961-d652425d6278?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D':v,
//     // },
//     // image: {
//     //     // filename: { type: String, default: 'listingimage' },
//     //         type: String,
//     //         default: 'https://images.unsplash.com/photo-1705413868961-d652425d6278?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     //         set: (v) => v === "" ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60": v,

        
//     // },
//     image: {
//         type: String,
//         default:
//           "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//         set: (v) =>
//           v === ""
//             ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
//             : v,
//       },
//     price:Number,
//     location:String,
//     country:String
// });

// const Listing = mongoose.model("Listing",listingSchema);

// module.exports = Listing;


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description:{ type:String},
  image: {type: String,
    set:(v) =>
    (v==="")
      ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
      : v},

  price: Number,
  location: String,
  country: String,
  review:[{
    type : Schema.Types.ObjectId,
    ref:"review",
  }]
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;