import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import CTA from "../components/CTA";
import Modal from "../components/Modal";
import Skeleton from "../components/skeleton";
import { toastError, toastSuccess } from "../components/Toast";
import { CartItemModel } from "../models/cartItemModel";
import { useGetAllBooksQuery } from "../services/booksApi";
import {
  cartApi,
  useClearCartMutation,
  useGetCartQuery,
} from "../services/cartApi";
import { useCreateUserBookMutation } from "../services/userBookApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { getCartItems } from "../store/reducers/cartReducer";
import { getWallet } from "../store/reducers/walletReducer";

const CartScreen = () => {
  const { data: cart, isLoading, isError } = useGetCartQuery();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const cartItems = useAppSelector(getCartItems);
  const [rentPurchase] = useCreateUserBookMutation();
  const [clearCart] = useClearCartMutation();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const isNoOfDaysNan = cartItems?.find(
    (item) => !item?.noOfDays || isNaN(item?.noOfDays)
  );

  if (!cart || isLoading || isError) {
    return <Skeleton />;
  }

  const isEmpty = !cart.items || cart.items.length === 0;

  const handleProceedToPay = async () => {
    if (cartItems) {
      setIsPurchasing(true);

      Promise.all(cartItems.map(async (item) => await purchaseItem(item)))
        .then(() => {
          toastSuccess("Rented books successfully !");
          setIsPurchasing(false);
          clearCart();
          dispatch(cartApi.util.invalidateTags(["Cart", "Wallet", "UserBook"]));
          navigate("/myBooks");
        })
        .catch((err) => {
          toastError("Something went wrong !");
        });
    }
  };

  const purchaseItem = async (cartItem: CartItemModel) => {
    return new Promise(async (resolve, reject) => {
      return await rentPurchase({
        bookId: cartItem.itemId,
        noOfDays: cartItem.noOfDays,
      })
        .unwrap()
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(JSON.stringify(err));
        });
    });
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="text-4xl font-semibold"></div>
        <div className="text-4xl font-semibold">My Cart</div>
        {isEmpty && <div className="text-4xl font-semibold"></div>}
        {!isEmpty && (
          <CTA
            disabled={isPurchasing}
            className="w-auto"
            onClick={() => {
              if (isNoOfDaysNan) {
                toastError("Enter valid rental days");
              } else {
                setIsConfirmModalOpen(true);
              }
            }}
          >
            Proceed to Payment
          </CTA>
        )}
      </div>
      {isEmpty && (
        <div className="mt-10 flex flex-row justify-center items-center text-2xl">
          Cart is Empty
        </div>
      )}
      {!isEmpty && (
        <div className="flex flex-row flex-wrap mt-5">
          {cart.items.map((cartItem) => (
            <div key={cartItem.itemId}>
              <CartItemCard bookId={cartItem.itemId} />
            </div>
          ))}
        </div>
      )}
      <PaymentConfirmModal
        isOpen={isConfirmModalOpen}
        setIsOpen={setIsConfirmModalOpen}
        handlePayment={handleProceedToPay}
      />
    </>
  );
};

export default CartScreen;

interface PaymentConfirmModalType {
  isOpen: boolean;
  setIsOpen: Function;
  handlePayment: Function;
}
const PaymentConfirmModal = (props: PaymentConfirmModalType) => {
  const { data: books } = useGetAllBooksQuery();

  const { isOpen, setIsOpen, handlePayment } = props;
  const wallet = useAppSelector(getWallet);

  const [amountToBePaid, setAmountToBePaid] = useState<number>(0);
  const items = useAppSelector(getCartItems);

  const notEnoughBalance = amountToBePaid > wallet?.walletBalance;

  useEffect(() => {
    if (items && items.length && books) {
      setAmountToBePaid(0);
      items.forEach((item) => {
        const bookExist = books.find((book) => book.id === item.itemId);
        if (bookExist) {
          setAmountToBePaid(
            (value) => value + bookExist.pricePerDay * item.noOfDays
          );
        }
      });
    }
  }, [items, books]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={"Are you sure ?"}>
      <div className="flex flex-col gap-5 ">
        {isOpen && (
          <div>
            <div className="text-3xl font-semibold mb-3">Are you sure?</div>
            <div className="text-xl mb-2">
              Wallet Balance :
              <span className="font-semibold">${wallet?.walletBalance}</span>
            </div>
            <div className="text-xl">
              Total amount to be paid :
              <span
                className={`font-semibold ${
                  notEnoughBalance ? "text-red-500" : "text-green-500"
                }`}
              >
                ${amountToBePaid}
              </span>
            </div>
            <div className="flex flex-row mt-6 justify-end items-center">
              <CTA
                className="w-20  bg-transparent text-black  mr-4 font-semibold focus:bg-transparent hover:bg-red-500"
                onClick={() => setIsOpen(false)}
              >
                NO
              </CTA>
              <CTA
                className="w-20 font-semibold"
                onClick={() => {
                  if (notEnoughBalance) {
                    setIsOpen(false);
                    toastError("Not enough balance");
                  } else {
                    handlePayment();
                    setIsOpen(false);
                  }
                }}
              >
                YES
              </CTA>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
