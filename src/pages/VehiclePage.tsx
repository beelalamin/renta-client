// import FeaturedCars from "../components/FeaturedCars";
import { useQuery } from "@tanstack/react-query";
import VehicleCard from "../components/VehicleCard";
import FilterComponent from "../components/FilterComponent";
import { useFilters } from "../context/FilterContext";


export default function VehiclePage() {
    const { filters } = useFilters();

    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['data', filters.toString()], // Include filters in queryKey to trigger refetch
        queryFn: async () => {
            const response = await fetch(
                `http://localhost:8000/api/v1/vehicles?${filters.toString()}`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return await response.json();
        },
    });
    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="w-full flex">
            <div className="w-1/5 sticky top-0 h-screen overflow-y-auto bg-gray-200 border-r">
                <FilterComponent />
            </div>
            <div className="w-4/5 p-4">
                <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {data?.data.map((vehicle: any) => (
                        <VehicleCard vehicle={vehicle} key={vehicle.id} />
                    ))}
                </ul>
            </div>
        </div>

    )
}