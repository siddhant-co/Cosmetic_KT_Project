"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromCart } from "@/store/slices/cartSlice";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";

const CartPage = () => {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const shippingCost = 5;
  const subtotal = items.reduce(
    (acc, item) => acc + item.sellingPrice * item.quantity,
    0
  );
  const tax = 0;
  const total = subtotal + shippingCost + tax;

  return (
    <section className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between mb-6"
            >
              <div className="flex gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
                <div>
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="flex items-center text-red-600 mt-2 text-xs hover:underline"
                  >
                    <FiTrash2 className="mr-1 text-red-600" /> REMOVE
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-xl">₹{item.sellingPrice}</p>
                <div className="mt-2 flex items-center border rounded overflow-hidden w-fit">
                  <button className="px-2 py-1 border-r">−</button>
                  <span className="px-3">{item.quantity}</span>
                  <button className="px-2 py-1 border-l">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-[350px] bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Shipping</span>
            <span className="font-semibold">₹{shippingCost}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span>Tax</span>
            <span className="font-semibold">₹{tax}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-base font-semibold mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">
            Checkout
          </button>
          <button className="w-full mt-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm">
            Continue Shopping
          </button>

          <div className="flex justify-center mt-5 gap-2">
            <Image src="/visa.png" alt="Visa" width={40} height={24} />
            <Image src="/amex.png" alt="Amex" width={40} height={24} />
            <Image
              src="/mastercard.png"
              alt="Mastercard"
              width={40}
              height={24}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
