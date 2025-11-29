import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [donations, setDonations] = useState([]);
  const [address, setAddress] = useState(null);
  const [editingInfo, setEditingInfo] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [formData, setFormData] = useState({ FullName: "", Phone: "" });
  const [addressData, setAddressData] = useState({
    FullName: "",
    Phone: "",
    Province: "",
    Area: "",
    ZipCode: "",
    AddressLine: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/session_check.php", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (data.logged_in) {
          setUser(data.user);
          setFormData({ FullName: data.user.FullName || "", Phone: data.user.Phone || "" });
          fetchOrders(data.user.UserID);
          fetchDonations(data.user.UserID);
          fetchAddress();
        }
      });
  }, []);

  const fetchOrders = async (userId) => {
    const res = await fetch(`http://localhost:8000/api/get_orders.php?user_id=${userId}`, { credentials: "include" });
    const data = await res.json();
    if (data.success) setOrders(data.orders);
  };

  const fetchDonations = async (userId) => {
    const res = await fetch(`http://localhost:8000/api/get_donations.php?user_id=${userId}`, { credentials: "include" });
    const data = await res.json();
    if (data.success) setDonations(data.donations);
  };

  const fetchAddress = async () => {
    const res = await fetch("http://localhost:8000/api/get_address.php", { credentials: "include" });
    const data = await res.json();
    if (data.success) {
      setAddress(data.address);
      setAddressData({
        FullName: data.address?.FullName || "",
        Phone: data.address?.Phone || "",
        Province: data.address?.Province || "",
        Area: data.address?.Area || "",
        ZipCode: data.address?.ZipCode || "",
        AddressLine: data.address?.AddressLine || "",
      });
    }
  };

  const handleInfoChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleAddressChange = (e) => setAddressData({ ...addressData, [e.target.name]: e.target.value });

  const saveUserInfo = async () => {
    const res = await fetch("http://localhost:8000/api/update_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      setUser(data.user);
      setFormData({
        FullName: data.user.FullName,
        Phone: data.user.Phone,
      });

      alert("Updated!");
      setEditingInfo(false);
    } else {
      alert(data.message);
    }
  };

  const saveAddress = async () => {
    const res = await fetch("http://localhost:8000/api/update_address.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(addressData),
    });

    const data = await res.json();

    if (data.success) {
      alert("Address saved!");
      fetchAddress();
      setEditingAddress(false);
    } else alert(data.message);
  };

  const handleLogout = async () => {
    await fetch("http://localhost:8000/api/logout.php", { credentials: "include" });
    window.location.reload();
  };

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-full">
      <h1>Welcome, {user.FullName || "User"}!</h1>

      {/* === BENTO GRID START === */}
      <div className="dashboard-grid">

        {/* PERSONAL INFO */}
        <div className="panel5 personal-info glass">
          <h2>Personal Info</h2>
          <div className="panel5-content">
            {editingInfo ? (
              <>
                <input type="text" name="FullName" value={formData.FullName} onChange={handleInfoChange} placeholder="Full Name" />
                <input type="text" name="Phone" value={formData.Phone} onChange={handleInfoChange} placeholder="Phone" />
              </>
            ) : (
              <>
                <p><strong>Full Name:</strong> {user.FullName || "Not set"}</p>
                <p><strong>Email:</strong> {user.Email}</p>
                <p><strong>Phone:</strong> {user.Phone || "Not set"}</p>
              </>
            )}
          </div>
          {editingInfo ? (
            <>
              <button className="btn save" onClick={saveUserInfo}>Save</button>
              <button className="btn cancel" onClick={() => setEditingInfo(false)}>Cancel</button>
            </>
          ) : (
            <button className="btn edit" onClick={() => setEditingInfo(true)}>Edit Info</button>
          )}
        </div>

        {/* ADDRESS */}
        <div className="panel5 address glass">
          <h2>Billing Address</h2>
          <div className="panel5-content">
            {editingAddress ? (
              <>
                <input type="text" name="FullName" placeholder="Full Name" value={addressData.FullName} onChange={handleAddressChange} />
                <input type="text" name="Phone" placeholder="Phone" value={addressData.Phone} onChange={handleAddressChange} />
                <input type="text" name="Province" placeholder="Province" value={addressData.Province} onChange={handleAddressChange} />
                <input type="text" name="Area" placeholder="Area" value={addressData.Area} onChange={handleAddressChange} />
                <input type="text" name="ZipCode" placeholder="Zip Code" value={addressData.ZipCode} onChange={handleAddressChange} />
                <input type="text" name="AddressLine" placeholder="Address" value={addressData.AddressLine} onChange={handleAddressChange} />
              </>
            ) : (
              <>
                {address ? (
                  <>
                    <p><strong>Name:</strong> {address.FullName}</p>
                    <p><strong>Phone:</strong> {address.Phone}</p>
                    <p><strong>Province:</strong> {address.Province}</p>
                    <p><strong>Area:</strong> {address.Area}</p>
                    <p><strong>Zip:</strong> {address.ZipCode}</p>
                    <p><strong>Address:</strong> {address.AddressLine}</p>
                  </>
                ) : <p>No address set.</p>}
              </>
            )}
          </div>
          {editingAddress ? (
            <>
              <button className="btn save" onClick={saveAddress}>Save</button>
              <button className="btn cancel" onClick={() => setEditingAddress(false)}>Cancel</button>
            </>
          ) : (
            <button className="btn edit" onClick={() => setEditingAddress(true)}>Edit Address</button>
          )}
        </div>

        {/* DONATIONS */}
        <div className="panel5 donations glass">
          <h2>Latest Donations</h2>
          <div className="panel5-content">
            {donations.length === 0 ? <p>No donations yet.</p> :
              <table>
                <thead>
                  <tr><th>ID</th><th>Date</th><th>Amount</th></tr>
                </thead>
                <tbody>
                  {donations.map((d) => (
                    <tr key={d.DonationID}>
                      <td>{d.DonationID}</td>
                      <td>{new Date(d.DonateDate).toLocaleString()}</td>
                      <td>${d.Amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          </div>
        </div>

        {/* ORDERS */}
        <div className="panel5 orders glass">
          <h2>Latest Orders</h2>
          <div className="panel5-content">
            {orders.length === 0 ? <p>No orders yet.</p> :
              <table>
                <thead>
                  <tr><th>ID</th><th>Date</th><th>Status</th><th>POD</th><th>Total</th></tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.OrderID}>
                      <td>{o.OrderID}</td>
                      <td>{new Date(o.OrderDate).toLocaleString()}</td>
                      <td>{o.Status}</td>
                      <td>{o.IsPOD ? o.PODStatus : "No"}</td>
                      <td>${o.TotalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          </div>
        </div>

      </div>
      {/* === BENTO GRID END === */}

      <button className="btn logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}
