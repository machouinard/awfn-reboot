import { useState } from "react";

export default function RangeSlider( {title, initialValue}: {title: string, initialValue: number}) {
    const [hours, setHours] = useState({hours: initialValue});
    console.log('hours:', hours);
    return (
        <div className="w-2/3 mx-auto">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        {title}
                    </h2>
                </div>
            </div>
            <div className="mt-8">
                <label htmlFor="range" className="block text-sm font-medium text-gray-900">Hours before now: {hours.hours.toString()}</label>
                <input
                    type="range"
                    id="range"
                    name="range"
                    min="0"
                    max="6"
                    value={hours.hours.toString()}
                    onChange={(e) => {
                        console.log('e:', e.target.value);
                        setHours({ hours: Number(e.target.value) })
                    }}
                    className="mt-2 block w-full text-gray-900"
                />
            </div>
        </div>
    );
}