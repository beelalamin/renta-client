import React from 'react';
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineBolt, HiOutlineCog6Tooth, HiOutlineRocketLaunch } from "react-icons/hi2";

interface VehicleCardProps {
    vehicle: {
        id: number;
        title: string;
        price: number | null;
        brand: string;
        vehicleNumber: string;
        model: string;
        thumbnail: string;
        transmission: string;
        fuelType: string;
        seatingCapacity: number | null;
        mileage: number | null;
        isFeatured: boolean;
    };
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
    return (
        <>
            <li key={vehicle.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="h-56 w-full overflow-hidden rounded-md p-3 bg-white">
                    <img
                        src={vehicle.thumbnail}
                        alt={vehicle.title}
                        className="object-cover w-full h-full rounded"
                    />
                </div>
                <div className="px-4 pb-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-800">
                            <a href="#" className="hover:text-blue-500">{vehicle.title}</a>
                        </h3>
                        <span className="text-xs font-medium text-gray-600 border border-gray-300 rounded-full px-3 py-1">
                            {vehicle.model}
                        </span>
                    </div>

                    <ul className="grid grid-cols-2  mb-4">
                        <li className="flex items-center text-xs py-2 text-gray-600">
                            <HiOutlineUserGroup className="mr-2 text-xl text-blue-500" />
                            {vehicle.seatingCapacity} People
                        </li>
                        <li className="flex items-center text-xs py-2 text-gray-600">
                            <HiOutlineBolt className="mr-2 text-xl text-blue-500" />
                            {vehicle.fuelType}
                        </li>

                        <li className="flex items-center text-xs py-2 text-gray-600">
                            <HiOutlineRocketLaunch className="mr-2 text-xl text-blue-500" />
                            {vehicle.mileage} km/ltr
                        </li>
                        <li className="flex items-center text-xs py-2 text-gray-600">
                            <HiOutlineCog6Tooth className="mr-2 text-xl text-blue-500" />
                            {vehicle.transmission}
                        </li>
                    </ul>

                    <div className="flex items-center justify-between">
                        <p className="text-md font-semibold text-gray-800">{vehicle.price} / month</p>
                        <button className="bg-blue-500 text-white py-1 px-3 text-sm rounded-lg hover:bg-blue-600">
                            Rent now
                        </button>
                    </div>
                </div>
            </li>

        </>
    );
};

export default VehicleCard;
