import { useState } from "react";
import "../styles/subscription.css";

export default function Subscription() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/subscribe.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (data.success) {
        setMessage(data.message);
        setTimeout(() => setEmail(""), 800); // smooth clearing
      } else {
        setMessage(data.message);
      }

    } catch (err) {
      setMessage("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />

      <div className="wrapper11 glass">

        <div className="sub-header">
          <i className="bx bx-mail-send"></i>
          <p>Be the first to know</p>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Subscribe</h1>

          <p className="sub-desc">
            Get exclusive offers, seasonal deals, and early access<br/> to new products directly in your inbox.
          </p>

          <div className="form-body">
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className="bx bxs-envelope"></i>
            </div>

            <p className={`sub-note ${message ? "show" : ""}`}>{message}</p>
          </div>

          <button type="submit" className="btn0" disabled={loading}>
            <span className={loading ? "loading" : ""}>
              {loading ? "Submitting..." : "Subscribe"}
            </span>
          </button>

          <p className="sub-note static-note">No spam. Unsubscribe anytime.</p>
        </form>

        <div className="corner-line"></div>
      </div>
    </>
  );
}
