import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Collection from './Pages/Collection';
import About from './Pages/About';
import Orders from './Pages/Orders';
import PlaceOrder from './Pages/PlaceOrder';
import Product from './Pages/Product';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import SearchBar from './Components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './Pages/Verify';
import MyProfile from './Pages/MyProfile';
import AddProduct from './Pages/AddProduct';

function App() {

  return (
    <>
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/my-profile' element={<MyProfile />}/>
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/verify' element={<Verify />}/>
        <Route path='/add-product' element={<AddProduct />}/>

      </Routes>
      
    </div>
    <Footer />
    </>
  )
}

export default App
