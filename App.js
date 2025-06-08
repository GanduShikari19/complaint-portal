import React, { useState } from "react";
import emailjs from "emailjs-com";
import jsPDF from "jspdf";

const ComplaintPortal = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [email, setEmail] = useState("");
  const [complaint, setComplaint] = useState("");

  const handleSubmit = async () => {
    const time = new Date().toLocaleString();

    try {
      await emailjs.send(
        "service_01sg48u",
        "template_srdveub",
        {
          from_name: name,
          relation,
          complaint,
          from_email: email,
          time,
          to_email: "pranavm190203@gmail.com"
        },
        "X9vJ_DOnlgSnLdT0K"
      );

      await emailjs.send(
        "service_01sg48u",
        "template_a91wybb",
        {
          from_name: name,
          complaint,
          to_email: email,
          time
        },
        "X9vJ_DOnlgSnLdT0K"
      );

      const doc = new jsPDF();
      doc.setFontSize(14);
      doc.text("Complaint Acknowledgment", 20, 20);
      doc.setFontSize(12);
      doc.text(`Dear ${name},`, 20, 40);
      doc.text(`We have received your complaint as a ${relation}.`, 20, 50);
      doc.text("Your complaint:", 20, 70);
      doc.text(complaint, 20, 80, { maxWidth: 170 });
      doc.text("Thank you for your feedback. We will look into it.", 20, 120);
      doc.save("complaint_acknowledgment.pdf");

      alert("Complaint submitted and acknowledgment sent!");
      setComplaint("");
      setStep(1);
    } catch (error) {
      alert("Failed to submit complaint or send acknowledgment.");
      console.error(error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffe4e6", padding: "2rem" }}>
      <div style={{
        maxWidth: "500px",
        margin: "auto",
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
      }}>
        {step === 1 ? (
          <>
            <h2 style={{ textAlign: "center", color: "#be123c" }}>Welcome 🌸</h2>
            <label>Your Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Aisha" style={{ width: "100%", marginBottom: "1rem" }} />
            <label>Your Relation to Me</label>
            <input value={relation} onChange={(e) => setRelation(e.target.value)} placeholder="e.g., Friend, Sister" style={{ width: "100%", marginBottom: "1rem" }} />
            <label>Your Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g., aisha@example.com" style={{ width: "100%", marginBottom: "1rem" }} />
            <button onClick={() => setStep(2)} disabled={!name || !relation || !email} style={{ width: "100%", backgroundColor: "#f43f5e", color: "white", padding: "0.5rem", borderRadius: "0.5rem" }}>
              Proceed to Complaint Form
            </button>
          </>
        ) : (
          <>
            <h2 style={{ textAlign: "center", color: "#be123c" }}>
              Dear {name} ({relation}), what's bothering you?
            </h2>
            <textarea value={complaint} onChange={(e) => setComplaint(e.target.value)} placeholder="Write your complaint here..." rows={6} style={{ width: "100%", marginBottom: "1rem" }} />
            <button onClick={handleSubmit} disabled={!complaint.trim()} style={{ width: "100%", backgroundColor: "#f43f5e", color: "white", padding: "0.5rem", borderRadius: "0.5rem" }}>
              Submit Complaint 💌
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ComplaintPortal;