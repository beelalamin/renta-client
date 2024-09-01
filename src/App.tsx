import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import VehiclePage from "./pages/VehiclePage"
import { FiltersProvider } from "./context/FilterContext"

function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FiltersProvider>
          <VehiclePage />
        </FiltersProvider>

      </QueryClientProvider>
    </>
  )
}

export default App
