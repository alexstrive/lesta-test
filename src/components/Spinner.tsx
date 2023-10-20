import Gear from "../assets/gear.gif"

function Spinner() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <img src={Gear} />
    </div>
  )
}

export default Spinner
