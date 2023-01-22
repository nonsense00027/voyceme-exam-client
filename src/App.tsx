import "./App.css";
import { FormEvent, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { VITE_REACT_SERVER_API } = import.meta.env;

    const form = e.target as unknown as HTMLInputElement[];

    const name = form[0].value;
    const email = form[1].value;
    const message = form[2].value;

    const notification = toast.loading("Submitting message...");

    try {
      await fetch(`${VITE_REACT_SERVER_API}/accounts/submit`, {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          message,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      toast.success("Submitted successfully", {
        id: notification,
      });
      formRef.current?.reset();
    } catch (error) {
      toast.error((error as Error).message, {
        id: notification,
      });
    }
  }
  return (
    <>
      <Toaster />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-96"
      >
        <input
          autoFocus
          required
          type="text"
          name="name"
          placeholder="Name"
          className="py-2 px-4"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          className="py-2 px-4"
        />
        <textarea
          required
          name="message"
          placeholder="Message"
          className="py-2 px-4"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 rounded-sm uppercase font-semibold"
        >
          submit
        </button>
      </form>
    </>
  );
}

export default App;
