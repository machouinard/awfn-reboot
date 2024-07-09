import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { useRef } from "react";
import invariant from "tiny-invariant";
import { getNote, type Note, updateNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
    note: Note;
};

export async function loader({ request, params }: LoaderFunctionArgs) {
    const userId = await requireUserId(request);
    invariant(params.noteId, "noteId not found");

    const note = await getNote({ userId, id: params.noteId });
    if (!note) {
        throw new Response("Not Found", { status: 404 });
    }

    return json({ note });
}

export const action: ActionFunction = async ({ request }) => {
    const userId = await requireUserId(request);

    const formData = await request.formData();
    const title = formData.get("title");
    const body = formData.get("body");
    const id = formData.get("noteId") as string;

    if (typeof title !== "string" || title.length === 0) {
        return json({ errors: { title: "Title is required" } }, { status: 400 });
    }

    if (typeof body !== "string" || body.length === 0) {
        return json({ errors: { body: "Body is required" } }, { status: 400 });
    }

    await updateNote({ id, title, body })

    return redirect(`/notes/${id}`);

};

export default function EditNotePage() {
    const data = useLoaderData<typeof loader>() as LoaderData;
    const fetcher = useFetcher();
    const formRef = useRef<HTMLFormElement>(null);
    console.log('data', data);
    return (
        <Form
            className="flex flex-col gap-8 w-2/3 mx-auto"
            method="post"
        >
            <div>
                <label className="flex w-full flex-col gap-1">
                    <span>Title: </span>
                    <input
                        name="title"
                        className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                        defaultValue={data.note.title}
                    />
                </label>
            </div>
            <div>
                <label className="flex w-full flex-col gap-1">
                    <span>Body: </span>
                    <textarea
                        name="body"
                        rows={8}
                        className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
                        defaultValue={data.note.body}
                    />
                </label>
            </div>

            <div className="text-right">
                <button
                    type="submit"
                    className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
                >
                    Save
                </button>
            </div>
            <input type="hidden" name="noteId" value={data.note.id} />
        </Form>
    );
}