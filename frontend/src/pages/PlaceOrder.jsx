import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/cartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {

    const [method,setMethod] = useState('COD');
    const {navigate ,  backendUrl , token , cartItems, setCartItems, getCartAmount , delivery_fee , products} = useContext(ShopContext);

    const [formData , setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        // console.log(formData);
        try {
            let orderItems = [];

            for(const items in cartItems){
                console.log(items);
                // console.log(cartItems[items]);
                for(const item in cartItems[items]){
                    console.log(item);
                    
                    if (cartItems[items][item] > 0) {
                        const itemInfo =  structuredClone(products.find(product => product._id === items));
                        // console.log(itemInfo);
                        
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                    
                }
            }
            
            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
            }
            
            

            switch(method){
                //api calls for cod
                
                case 'COD': {
                    
                    const response = await axios.post(
                        `${backendUrl}/api/order/place`,
                        orderData,
                        { headers:  { token } }
                    );
                    
                    if (response.data.success) {
                        setCartItems({});
                        navigate('/orders');
                    }else{
                        toast.error(response.data.message);
                    }
                    break;
                }
                default: {
                    console.log('Invalid Payment Method');
                    
                    break;
                }
            }
            
        } catch (error) {
            toast.error(error.message);
            console.log("something went wrong");
            
        }
        
    }

    return(
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
            {/* left section */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                <div className="flex gap-3 ">
                    <input onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First Name" required/>
                    <input onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last Name" required />
                </div>

                <input onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" required />
                <input onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" required />

                <div className="flex gap-3 ">
                    <input  onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" required />
                    <input onChange={onChangeHandler} name="state" value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" required />
                </div>

                <div className="flex gap-3 ">
                    <input onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="ZIP code" required />
                    <input onChange={onChangeHandler} name="country" value={formData.country}  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" required />
                </div>

                <input onChange={onChangeHandler} name="phone" value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="phone" placeholder="Phone Number" required />

            </div>

            {/* right section */}

            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <CartTotal />
                </div>

                <div className="mt-12">
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    {/* payment method selection */}
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div onClick={()=>{setMethod('stripe')}} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={()=>{setMethod('razorpay')}} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
                        </div>
                        <div onClick={()=>{setMethod('COD')}} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'COD' ? 'bg-green-400' : ''}`}></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className="w-full text-end mt-8">
                        <button type="submit" className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
                    </div>

                </div>
            </div>

        </form>
    )
}

export default PlaceOrder;