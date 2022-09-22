import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changeNumberOfDays, getCart } from "../store/reducers/cartReducer";
import BookCard from "./BookCard";
import Field from "./Field";

interface CartItemCartPropType {
  bookId: string;
}

const CartItemCard = (props: CartItemCartPropType) => {
  const { bookId } = props;

  const cart = useAppSelector(getCart);
  const cartItem = cart.items.find((item) => item.itemId === bookId);

  const dispatch = useAppDispatch();

  if (!cartItem) {
    return null;
  }

  const handleChange = (value: number) => {
    dispatch(
      changeNumberOfDays({
        noOfDays: value,
        itemId: bookId,
      })
    );
  };

  return (
    <>
      <div className="mb-5 mr-5 flex flex-col items-center justify-center" key={bookId}>
        <BookCard bookId={bookId} />
        <div>
          <div className="flex flex-col mt-2">
            <span className="text-xs text-black">Renting Days</span>
            <Field
              value={cartItem.noOfDays}
              type={"number"}
              name={bookId}
              placeholder={"Enter no of days"}
              min="1"
              onChange={(e) => {
                handleChange(e.target.valueAsNumber);
              }}
            />
          </div>
          {(cartItem.noOfDays < 1 || !cartItem.noOfDays) && (
            <span className="text-xs text-red-500">
              Rent is for atleast 1 day
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
