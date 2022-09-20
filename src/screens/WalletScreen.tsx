import Skeleton from "../components/skeleton";
import { useGetAllTransactionsQuery } from "../services/transactionApi";
import {
  useGetWalletQuery,
  useUpdateWalletBalanceMutation,
} from "../services/walletApi";
import { FaWallet, FaPlus, FaMinus } from "react-icons/fa";
import { Mode, UpdateWalletModel } from "../models/walletModel";
import { toastError, toastSuccess } from "../components/Toast";

const WalletScreen = () => {
  const {
    data: wallet,
    isLoading: walletLoading,
    isError: walletError,
  } = useGetWalletQuery();
  const {
    data: transactions,
    isLoading: transactionsLoading,
    isError: transactionsError,
  } = useGetAllTransactionsQuery();

  const [updateWallet] = useUpdateWalletBalanceMutation();

  if (
    !wallet ||
    walletLoading ||
    walletError ||
    !transactions ||
    transactionsLoading ||
    transactionsError
  ) {
    return <Skeleton />;
  }

  const updateWalletBal = ({ mode }: { mode: Mode }) => {
    const updateData = {
      mode,
      amount: 1000,
    } as UpdateWalletModel;

    updateWallet({ walletUpdate: updateData })
      .unwrap()
      .then((_) => {
        toastSuccess("Wallet balance updated !");
      })
      .catch((err) => {
        toastError(err?.data?.message);
      });
  };

  return (
    <>
      <div className="text-4xl font-semibold self-center flex flex-row justify-center items-center">
        <span className="mr-4">
          <FaWallet />
        </span>
        My Wallet
      </div>
      <div className="text-5xl self-center flex flex-row justify-center items-center mt-10">
        <span onClick={() => updateWalletBal({ mode: Mode.DEBIT })}>
          <FaMinus className="h-5 w-5 mr-5" />
        </span>
        ${wallet?.walletBalance}
        <span onClick={() => updateWalletBal({ mode: Mode.CREDIT })}>
          <FaPlus className="h-5 w-5 ml-5" />
        </span>
      </div>
      <div className="flex mt-8 mb-10">
        {transactions?.length ? (
          <div className="w-auto mx-auto ">
            <div className="text-2xl my-2">All Transactions</div>
            {transactions?.map((transaction) => {
              return (
                <div
                  key={transaction.id}
                  className="rounded-md shadow-md flex flex-col w-[40rem] items-center p-4"
                >
                  <div className="w-full flex flex-row justify-between ">
                    <div
                      className={`${
                        transaction.mode === Mode.CREDIT
                          ? "text-green-500"
                          : "text-red-500"
                      } text-3xl`}
                    >
                      {`${transaction.mode === Mode.CREDIT ? "+" : "-"} $${
                        transaction.amount
                      }`}
                    </div>
                    <div
                      className={`${
                        transaction.mode === Mode.CREDIT
                          ? "text-green-500"
                          : "text-red-500"
                      } text-xl`}
                    >
                      {transaction.mode}
                    </div>
                  </div>
                  <div className="flex flex-row w-full mt-3 justify-end">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default WalletScreen;
