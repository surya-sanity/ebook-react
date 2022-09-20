const useCheckExpiryHook = () => {

  function findExpirationString(dateFuture: any) {
    let dateNow: any = new Date();

    let seconds: any = Math.floor((dateFuture - dateNow) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s left`;
    }

    if (days <= 0 && hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s left`;
    }

    if (days <= 0 && hours <= 0 && minutes > 0) {
      return `${minutes}m ${seconds}s left`;
    }

    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds > 0) {
      if (seconds < 2) {
        return `${seconds}s left`;
      }
      return `${seconds}s left`;
    }

    return "Expired";
  }


  const isExpired = (date: Date) => date < new Date()

  return { findExpirationString, isExpired }

}

export default useCheckExpiryHook;