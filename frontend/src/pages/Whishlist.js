import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./Wishlist.css";

import iphone from "../assets/images/iphone.jpg";
import laptop from "../assets/images/laptop.jpg";
import watch from "../assets/images/watch.jpg";
import headphones from "../assets/images/headphones.jpg";

function Wishlist() {

const wishlist = [

{
id:1,
name:"iPhone 16 Pro",
price:"₹1,29,999",
image:iphone
},

{
id:2,
name:"MacBook Air",
price:"₹99,999",
image:laptop
},

{
id:3,
name:"Smart Watch",
price:"₹4,999",
image:watch
},

{
id:4,
name:"Wireless Headphones",
price:"₹2,499",
image:headphones
}

];

return(

<>

<Navbar/>

<div className="wishlist-page">

<h1>❤️ My Wishlist</h1>

<div className="wishlist-grid">

{

wishlist.map((item)=>(

<div className="wishlist-card" key={item.id}>

<img
src={item.image}
alt={item.name}
className="wishlist-image"
/>

<h2>{item.name}</h2>

<h3>{item.price}</h3>

<Link to="/cart">

<button className="move-btn">

🛒 Move To Cart

</button>

</Link>

</div>

))

}

</div>

</div>

<Footer/>

</>

);

}

export default Wishlist;