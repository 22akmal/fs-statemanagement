import useNotify from "../hooks/useNotify"

const Notification = () => {
  const {notif} = useNotify()

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!notif) return null

  return <div data-testid="notification" style={style}>{notif}</div>
}

export default Notification
