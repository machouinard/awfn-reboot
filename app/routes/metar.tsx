import type { ActionFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Input } from "~/components/input";
import { Button } from '~/components/button';
import { PlusIcon } from '@heroicons/react/16/solid';
import { getSingleMetar } from "~/models/metar.server";
import RangeSlider from "~/components/range-slider";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const icao = formData.get("icao") as string;
    const hours = formData.get("hours") as string;
    console.log('icao:', icao);

    const metar: MetarResponse = await getSingleMetar(icao, hours);

    console.log('metar:', metar);

    return metar;
}


export default function Metar() {
    const metarData = useActionData<MetarResponse>();
    console.log('metarData:', metarData);
    const first = metarData?.[0];
    return (
        <div className="w-2/3 mx-auto">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Aviation Weather
                    </h2>
                </div>

            </div>
            <Form method="post">
                <div className="max-w-96 mx-auro rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                    <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                        ICAO
                    </label>
                    <input
                        id="icao"
                        name="icao"
                        type="text"
                        placeholder="KSAC"
                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                   <RangeSlider initialHours="2" name="hours" /> 
                </div>

                <Button type="submit" className="mt-4">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Update
                </Button>
            </Form>
            <div id="metar">
                
                {first && (
                    <h3 className="text-lg font-semibold text-gray-900">METAR for {first.name}</h3>
                )}
                {metarData?.map((metar) => (
                    <div key={metar.metar_id} className="mt-8">
                        <p className="text-sm text-gray-600">Reported at {metar.reportTime}</p>
                        <div className="mt-2">
                            <p className="text-sm text-gray-600">Temperature: {metar.temp}°C</p>
                            <p className="text-sm text-gray-600">Dewpoint: {metar.dewp}°C</p>
                            <p className="text-sm text-gray-600">Wind: {metar.wdir}° at {metar.wspd} knots</p>
                            <p className="text-sm text-gray-600">Visibility: {metar.visib} miles</p>
                            <p className="text-sm text-gray-600">Altimeter: {metar.altim} inHg</p>
                            <p className="text-sm text-gray-600">Weather: {metar.wxString}</p>
                        </div>
                    </div>
                ))}

            </div> {/* This is where the METAR data will be displayed */}
        </div>
    );
}