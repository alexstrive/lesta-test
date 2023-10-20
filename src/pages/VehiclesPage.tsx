import { gql, useQuery } from "@apollo/client"
import VehicleList from "../components/VehicleList.tsx"
import Vehicle from "../vehicle.ts"
import Spinner from "../components/Spinner.tsx"
import { ChangeEvent, useCallback, useMemo, useState } from "react"

const GET_VEHICLES = gql`
  query GetVehicles {
    vehicles {
      title
      description
      icons {
        large
        medium
      }
      level
      type {
        name
        title
        icons {
          default
        }
      }
      nation {
        name
        title
        color
        icons {
          small
          medium
          large
        }
      }
    }
  }
`

function Vehicles() {
  const [nameSearch, setNameSearch] = useState("")
  const [levelSearch, setLevelSearch] = useState(0)
  const [typeSearch, setTypeSearch] = useState("")
  const [nationSearch, setNationSearch] = useState("")

  const { loading, error, data } = useQuery<{ vehicles: Vehicle[] }>(
    GET_VEHICLES
  )

  // BEGIN: HANDLERS
  const handleNameSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement
      setNameSearch(input.value)
    },
    []
  )

  const handleLevelSearchChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) =>
      setLevelSearch(Number(e.target.value)),
    []
  )

  const handleTypeSearchChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setTypeSearch(e.target.value),
    []
  )

  const handleNationSearchChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setNationSearch(e.target.value),
    []
  )
  // END: HANDLERS

  const filteredVehicles = useMemo(() => {
    if (!data?.vehicles) {
      return []
    }

    const originalData = data.vehicles
    let filtered: Vehicle[] = originalData

    // Filter name
    if (nameSearch) {
      filtered = originalData.filter((item) =>
        item.title.toLowerCase().includes(nameSearch.toLowerCase())
      )
    }

    // Filter level
    if (levelSearch) {
      filtered = filtered.filter((item) => item.level === levelSearch)
    }

    // Filter class
    if (typeSearch) {
      filtered = filtered.filter((item) => item.type.title === typeSearch)
    }

    // Filter nation
    if (nationSearch) {
      filtered = filtered.filter((item) => item.nation.title === nationSearch)
    }

    return filtered
  }, [data, nameSearch, levelSearch, typeSearch, nationSearch])

  // Utility Functions
  // Better to receive this information from the server
  // Rather than generating it from recieved data
  const allLevels = useMemo(
    () => [
      ...new Set(data?.vehicles.map((vehicle) => Number(vehicle.level)).sort()),
    ],
    [data]
  )

  const allTypes = useMemo(
    () => [...new Set(data?.vehicles.map((vehicle) => vehicle.type.title))],
    [data]
  )

  const allNations = useMemo(
    () => [...new Set(data?.vehicles.map((vehicle) => vehicle.nation.title))],
    [data]
  )

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (!data) {
    return <div>No data</div>
  }

  return (
    <div className="container mx-auto" style={{ minHeight: "90vh" }}>
      <div className="p-5 flex">
        <input
          className="p-2 w-2/5 mr-2"
          placeholder="Enter name of ship"
          value={nameSearch}
          onChange={handleNameSearchChange}
        />
        <select
          className="p-2 w-1/5 mr-2"
          value={levelSearch}
          onChange={handleLevelSearchChange}
        >
          <option value="">Choose level</option>
          {allLevels.map((level) => (
            <option value={level} key={level}>
              Level {level}
            </option>
          ))}
        </select>
        <select
          className="p-2 w-1/5 mr-2"
          value={typeSearch}
          onChange={handleTypeSearchChange}
        >
          <option value="">Choose type</option>
          {allTypes.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          className="p-2 w-1/5"
          value={nationSearch}
          onChange={handleNationSearchChange}
        >
          <option value="">Choose nation</option>
          {allNations.map((nation) => (
            <option value={nation} key={nation}>
              {nation}
            </option>
          ))}
        </select>
      </div>
      <VehicleList vehicles={filteredVehicles} />
    </div>
  )
}

export default Vehicles
