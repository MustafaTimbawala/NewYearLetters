import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { accessLetter } from "../../api/letters";

export default function NameSelectorPage() {
  const recipientRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const recipient = recipientRef.current?.value.trim();
    console.log(recipient);
    const password = passwordRef.current?.value.trim();
    console.log(password);

    if (!recipient || !password) {
      setError("Please enter your name and password.");
      return;
    }

    try {
      const letter = await accessLetter(recipient, password);
      navigate("/letter", { state: letter });
    } catch (err: unknown) {
      setError(err.message);
    }
  }

  return (
    <div className="centered">
      <form className="card" onSubmit={handleSubmit}>
        <div className="introduction"> 
            <h1 className="title">Happy New Years!!!</h1>
            <p>For being an important part of my life I wanted to write you a letter.</p>
            <p>From: Mustafa</p>
            <p>To:</p>

        </div>
        

        <label className="label" htmlFor="recipient">
          Your Name
        </label>
        <input
          id="recipient"
          className="input"
          ref={recipientRef}
          required
        />

        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="input"
          ref={passwordRef}
          required
        />

        {error && <p className="error">{error}</p>}

        <button className="button" type="submit">
          Open Letter
        </button>
      </form>
    </div>
  );
}
