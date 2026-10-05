import { useContext } from "react";
import NotifContext from "../NotificationContext";

const useNotify = () => useContext(NotifContext)

export default useNotify