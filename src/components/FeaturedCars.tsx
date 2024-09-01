import { IoArrowForwardOutline, IoHeartOutline } from 'react-icons/io5';

const FeaturedCars = () => {
    const cars = [
        {
            id: 1,
            image: './assets/images/car-1.jpg',
            name: 'Toyota RAV4',
            year: 2021,
            people: 4,
            fuel: 'Hybrid',
            mileage: '6.1km / 1-litre',
            transmission: 'Automatic',
            price: '$440',
        },
        {
            id: 2,
            image: './assets/images/car-2.jpg',
            name: 'BMW 3 Series',
            year: 2019,
            people: 4,
            fuel: 'Gasoline',
            mileage: '8.2km / 1-litre',
            transmission: 'Automatic',
            price: '$350',
        },
        {
            id: 3,
            image: './assets/images/car-3.jpg',
            name: 'Volkswagen T-Cross',
            year: 2020,
            people: 4,
            fuel: 'Gasoline',
            mileage: '5.3km / 1-litre',
            transmission: 'Automatic',
            price: '$400',
        },
        {
            id: 4,
            image: './assets/images/car-4.jpg',
            name: 'Cadillac Escalade',
            year: 2020,
            people: 4,
            fuel: 'Gasoline',
            mileage: '7.7km / 1-litre',
            transmission: 'Automatic',
            price: '$620',
        },
        {
            id: 5,
            image: './assets/images/car-5.jpg',
            name: 'BMW 4 Series GTI',
            year: 2021,
            people: 4,
            fuel: 'Gasoline',
            mileage: '7.6km / 1-litre',
            transmission: 'Automatic',
            price: '$530',
        },
        {
            id: 6,
            image: './assets/images/car-6.jpg',
            name: 'BMW 4 Series',
            year: 2019,
            people: 4,
            fuel: 'Gasoline',
            mileage: '7.2km / 1-litre',
            transmission: 'Automatic',
            price: '$490',
        },
    ];

    return (
        <section id="featured-car" className="py-10 bg-gradient-to-r from-gray-100 to-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Featured cars</h2>
                    <a href="#" className="flex items-center text-gray-600 hover:text-blue-500">
                        <span>View more</span>
                        <IoArrowForwardOutline className="ml-2 text-xl" />
                    </a>
                </div>

                <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {cars.map((car) => (
                        <li key={car.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                            <figure className="relative aspect-w-3 aspect-h-2">
                                <img src={car.image} alt={car.name} className="object-cover w-full h-full" />
                            </figure>

                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        <a href="#" className="hover:text-blue-500">{car.name}</a>
                                    </h3>
                                    <span className="text-sm font-medium text-gray-600 border border-gray-300 rounded-full px-3 py-1">
                                        {car.year}
                                    </span>
                                </div>

                                <ul className="divide-y divide-gray-200 mb-4">
                                    <li className="flex items-center py-2 text-gray-600">
                                        <IoHeartOutline className="mr-2 text-xl text-blue-500" />
                                        {car.people} People
                                    </li>
                                    <li className="flex items-center py-2 text-gray-600">
                                        <IoHeartOutline className="mr-2 text-xl text-blue-500" />
                                        {car.fuel}
                                    </li>
                                    <li className="flex items-center py-2 text-gray-600">
                                        <IoHeartOutline className="mr-2 text-xl text-blue-500" />
                                        {car.mileage}
                                    </li>
                                    <li className="flex items-center py-2 text-gray-600">
                                        <IoHeartOutline className="mr-2 text-xl text-blue-500" />
                                        {car.transmission}
                                    </li>
                                </ul>

                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-semibold text-gray-800">{car.price} / month</p>
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                                        Rent now
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default FeaturedCars;
