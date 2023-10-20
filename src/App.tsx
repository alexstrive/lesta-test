import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import VehiclesPage from "./pages/VehiclesPage"

import "./index.css"

const client = new ApolloClient({
  uri: import.meta.env.VITE_LESTA_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <VehiclesPage />
    </ApolloProvider>
  )
}

export default App
