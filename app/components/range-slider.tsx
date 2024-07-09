import { useState } from "react";

export default function RangeSlider({ initialHours, name = 'range' }: { initialHours: string, name?: string}) {
    const [hours, setHours] = useState(initialHours);
    return (
        <div className="mt-8">
            <label htmlFor={name} className="block text-sm font-medium text-gray-900">Hours before now: {hours}</label>
            <input
                type="range"
                id={name}
                name={name}
                min="1"
                max="6"
                defaultValue={initialHours}
                onChange={(e) => setHours(e.target.value)}
                className="mt-2 block w-full text-gray-900"
            />
        </div>
    );
}