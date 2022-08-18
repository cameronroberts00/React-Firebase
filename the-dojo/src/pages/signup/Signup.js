import "./Signup.css";
import React from "react";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleFileChange = (e) => {
    setThumbnail(null);
    //by default files are an array. since user is only uploading one, grab the first
    let selected = e.target.files[0];

    //perform checks on the file
    if (!selected) {
      setThumbnailError("Please select a file");

      return;
    }

    if (!selected.type.includes("image")) {
      setThumbnailError("File must be an image");

      return;
    }

    if (selected.size > 100000) {
      setThumbnailError("Image size must be less than 100kb");

      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log("Thumbnail updated");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, displayName, thumbnail);
    signup(email, password, displayName, thumbnail);
    // could reset stuff here if any errors occur with my janky thumbnail shit
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>password</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <label>
        <span>display name:</span>
        <input
          type="text"
          required
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>

      <label>
        <span>profile thumbnail:</span>
        <input type="file" required onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>

      {!isPending && thumbnail && (
        <button className="btn">
          Sign up
        </button>
      )}

      {/* i added this thumbnail logic below and above to stop users being able to press thumbnail button if its null. otherwise they can have account with no thumbnail */}
      {!thumbnail && (
          <button disabled className="btn" >
            Sign up
          </button>
      )}

      {isPending && (
        <button className="btn" disabled >
          Loading...
        </button>
      )}

      {error && <div className="error">{error}</div>}
    </form>
  );
}
