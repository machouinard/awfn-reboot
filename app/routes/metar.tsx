import type { ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Input } from "~/components/input";
import { Button } from '~/components/button'
import { PlusIcon } from '@heroicons/react/16/solid'

export const action: ActionFunction = async ({ request }) => {

}

export default function Metar() {
    return (
        <div className="flex h-full min-h-screen flex-col">
            <h1>Metar</h1>
            <Form method="post">
                <Input name="icao" />
                <Button type="submit">
                    <PlusIcon />
                    Add ICAO
                </Button>
            </Form>
        </div>
    );
}