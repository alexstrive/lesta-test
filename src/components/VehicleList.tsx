import { FixedSizeList } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

import Vehicle from "../vehicle"
import VehicleListItem from "./VehicleListItem"

export default function VirtualizedList(props: { vehicles: Vehicle[] }) {
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <FixedSizeList
            height={height}
            width={width}
            itemSize={320}
            itemCount={props.vehicles.length}
            overscanCount={5}
            itemData={props.vehicles}
          >
            {VehicleListItem}
          </FixedSizeList>
        )
      }}
    </AutoSizer>
  )
}
