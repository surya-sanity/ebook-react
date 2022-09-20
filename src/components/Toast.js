import toast from "react-hot-toast";

export function toastSuccess(message) {
  toast.success(message, {
    id: message ? message.toString() : undefined,
    duration: 4000,
    position: "bottom-center",
    style: { backgroundColor: "#008000", color: "#FFFFFF" },
  });
}

export function toastError(message) {
  toast.error(message, {
    id: message ? message.toString() : undefined,
    duration: 4000,
    position: "bottom-center",
    style: { backgroundColor: "#FF0000", color: "#FFFFFF" },
  });
}
