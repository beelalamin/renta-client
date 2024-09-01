import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo, useState, useEffect } from 'react';
import { useFilters } from '../context/FilterContext';
import { useSearchParams } from 'react-router-dom';

// Interface for filter data
interface FiltersData {
    categories: { id: number; parent_id: number | null; title: string }[];
    brands: { id: number; title: string }[];
    minPrice: number;
    maxPrice: number;
    transmissions: string[];
    fuelTypes: string[];
}

// Fetch filters data
const fetchFilters = async (params: URLSearchParams): Promise<FiltersData> => {
    const { data } = await axios.get(`http://localhost:8000/api/v1/filters?${params}`);
    return {
        categories: data.categories,
        brands: data.brands,
        minPrice: data.minPrice,
        maxPrice: data.maxPrice,
        transmissions: data.transmissions,
        fuelTypes: data.fuelTypes,
    };
};

const FilterComponent = () => {
    const { setFilters } = useFilters();
    const [searchParams, setSearchParams] = useSearchParams();

    // Local state to manage user interactions
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([100, 5000]);
    const [selectedTransmission, setSelectedTransmission] = useState<string>('');
    const [selectedFuelType, setSelectedFuelType] = useState<string>('');
    const [collapse, setCollapse] = useState({ categories: true, brands: false });
    const [isFetching, setIsFetching] = useState(false);

    // Fetch filters data with useQuery
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['filters', searchParams.toString()],
        queryFn: () => fetchFilters(searchParams),
        enabled: false, // Disable auto-fetching
    });

    // Memoize the fetched data to avoid re-renders
    const categories = useMemo(() => data?.categories || [], [data]);
    const brands = useMemo(() => data?.brands || [], [data]);

    // Sync URL parameters and refetch data
    const syncFiltersToURL = () => {
        const queryParams = new URLSearchParams();

        if (selectedCategories.length) queryParams.set('filter[categories]', selectedCategories.join(','));
        if (selectedBrands.length) queryParams.set('filter[brands]', selectedBrands.join(','));
        if (selectedTransmission) queryParams.set('filter[transmission]', selectedTransmission);
        if (priceRange) queryParams.set('filter[price_range]', priceRange.join(','));
        if (selectedFuelType) queryParams.set('filter[fuelType]', selectedFuelType);

        setSearchParams(queryParams);
        refetch();
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (!isFetching) {
                setIsFetching(true);
                syncFiltersToURL();
                setIsFetching(false);
            }
        }, 300); // Debounce delay

        return () => clearTimeout(handler);
    }, [selectedCategories, selectedBrands, selectedTransmission, priceRange, selectedFuelType]);

    // Handle category checkbox change
    const handleCategoryChange = (categoryId: number) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
        );
    };

    // Filter parent and child categories
    const parentCategories = useMemo(() => categories.filter((cat) => cat.parent_id === null), [categories]);
    const childCategories = useMemo(() => categories.filter((cat) => cat.parent_id !== null), [categories]);

    if (isLoading) return <div>Loading filters...</div>;
    if (error) return <div>Error loading filters</div>;

    return (
        <div className="w-full p-4 bg-gray-50 border rounded-md">
            <h2 className="font-bold mb-4">Filters</h2>

            {/* Categories */}
            <div className="mb-4 cursor-pointer">
                <div className="flex justify-between" onClick={() => setCollapse((prev) => ({ ...prev, categories: !prev.categories }))}>
                    <h3 className="font-medium uppercase mb-2">Categories</h3>
                    <button>{collapse.categories ? '-' : '+'}</button>
                </div>
                <hr />

                {collapse.categories &&
                    parentCategories.map((parent) => (
                        <div key={parent.id} className="mb-2 mt-2">
                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    checked={selectedCategories.includes(parent.id)}
                                    onChange={() => handleCategoryChange(parent.id)}
                                />
                                <label className="capitalize ms-2 text-sm font-medium text-gray-900">{parent.title}</label>
                            </div>
                            {childCategories
                                .filter((child) => child.parent_id === parent.id)
                                .map((child) => (
                                    <div key={child.id} className="ml-4">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                            checked={selectedCategories.includes(child.id)}
                                            onChange={() => handleCategoryChange(child.id)}
                                        />
                                        <label className="capitalize ms-2 text-sm font-medium text-gray-900">{child.title}</label>
                                    </div>
                                ))}
                        </div>
                    ))}
            </div>

            {/* Brands */}
            <div className="mb-4">
                <div className="flex justify-between">
                    <h3 className="font-medium uppercase mb-2">Brands</h3>
                    <button onClick={() => setCollapse((prev) => ({ ...prev, brands: !prev.brands }))}>
                        {collapse.brands ? '-' : '+'}
                    </button>
                </div>
                <hr className="mb-2" />
                {collapse.brands &&
                    brands.map((brand) => (
                        <div key={brand.id}>
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                checked={selectedBrands.includes(brand.id)}
                                onChange={() =>
                                    setSelectedBrands((prev) => (prev.includes(brand.id) ? prev.filter((id) => id !== brand.id) : [...prev, brand.id]))
                                }
                            />
                            <label className="capitalize ms-2 text-sm font-medium text-gray-900">{brand.title}</label>
                        </div>
                    ))}
            </div>

            {/* Transmission */}
            <div className="mb-4 uppercase">
                <h3 className="font-medium mb-2">Transmission</h3>
                <hr className="mb-3" />
                {data?.transmissions.map((transmission) => (
                    <div key={transmission}>
                        <input
                            type="radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            name="transmission"
                            value={transmission}
                            checked={selectedTransmission === transmission}
                            onChange={() => setSelectedTransmission(transmission)}
                        />
                        <label className="ms-2 text-sm font-medium text-gray-900">{transmission}</label>
                    </div>
                ))}
            </div>

            {/* Fuel Types */}
            <div className="mb-4 uppercase">
                <h3 className="font-medium mb-2">Fuel Type</h3>
                <hr className="mb-3" />
                {data?.fuelTypes.map((fuelType) => (
                    <div key={fuelType}>
                        <input
                            type="radio"
                            name="fuelType"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            value={fuelType}
                            checked={selectedFuelType === fuelType}
                            onChange={() => setSelectedFuelType(fuelType)}
                        />
                        <label className="ms-2 text-sm font-medium text-gray-900">{fuelType}</label>
                    </div>
                ))}
            </div>

            {/* Price Range */}
            <div className="mb-4">
                <h3 className="font-medium uppercase mb-2">Price Range</h3>
                <hr className="mb-3" />
                <input
                    type="range"
                    min={data?.minPrice}
                    max={data?.maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                />
                <input
                    type="range"
                    min={data?.minPrice}
                    max={data?.maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                />
                <div>
                    {priceRange[0]} - {priceRange[1]}
                </div>
            </div>

            {/* Reset Filters Button */}
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {
                setSelectedCategories([]);
                setSelectedBrands([]);
                setPriceRange([100, 5000]);
                setSelectedTransmission('');
                setSelectedFuelType('');
                setSearchParams('');
                refetch();
            }}>Reset Filters</button>
        </div>
    );
};

export default FilterComponent;
