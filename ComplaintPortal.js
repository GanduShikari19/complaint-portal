import React, { useState } from "react";

function ComplaintPortal() {
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Complaint Portal</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Write your complaint..."
          rows="5"
          cols="40"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {submitted && <p>Complaint submitted: {complaint}</p>}
    </div>
  );
}

export default ComplaintPortal;
