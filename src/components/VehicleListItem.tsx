import { ListChildComponentProps } from "react-window"
import Vehicle from "../vehicle"

function VehicleListItem(props: ListChildComponentProps) {
  const { index, style, data } = props
  const vehicleData: Vehicle = data[index]

  return (
    <div style={style} key={index} className="p-4">
      <div
        className="flex overflow-hidden border rounded bg-white shadow-md"
        style={{ minHeight: 300 }}
      >
        <div className="w-1/3 flex items-center relative">
          <img
            src={vehicleData.nation.icons.large}
            className="absolute md:w-96 sm:w-72 lg:left-7 sm:left-3 lg:top-7"
          />
          <img src={vehicleData.icons.large} className="absolute" />
        </div>
        <div className="w-2/3 p-4">
          <div className="flex pb-4 justify-between items-center">
            <h2 className="font-bold text-4xl">{vehicleData.title}</h2>
            <h3 className="font-bold text-2xl">Level {vehicleData.level}</h3>
          </div>
          <div className="flex">
            <img src={vehicleData.type.icons.default} />
            {vehicleData.type.title} • {vehicleData.nation.title}
          </div>
          <div>
            <p className="text-xl line-clamp-4">{vehicleData.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleListItem
