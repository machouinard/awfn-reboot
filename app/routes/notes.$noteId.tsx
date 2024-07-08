import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import type { Note } from "~/models/note.server";
import { deleteNote, getNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import { useRef } from "react";

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

export const action: ActionFunction = async ({ request, params }) => {
  console.log('params', params);
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  const formData = await request.formData();
  const buttonAction = formData.get("buttonAction") as string;

  console.log('buttonAction', buttonAction);

  switch (buttonAction) {
    case "delete":
      await deleteNote({ userId, id: params.noteId });
      return redirect("/notes");
    case "edit":
      return redirect(`/notes/edit/${params.noteId}`);
    default:
      throw new Error("Invalid buttonAction");
  }


};

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;
  const fetcher = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.note.title}</h3>
      <p className="py-6">{data.note.body}</p>
      <hr className="my-4" />
      <fetcher.Form ref={formRef} method="post">
        <button
          type="submit"
          className="rounded bg-red-500  py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400"
          name="buttonAction"
          value="delete"
        >
          Delete
        </button>
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          name="buttonAction"
          value="edit"
        >
          Edit
        </button>
      </fetcher.Form>
    </div>
  );
}
