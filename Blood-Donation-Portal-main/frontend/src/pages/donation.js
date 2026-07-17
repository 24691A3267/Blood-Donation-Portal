import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "../styles/Profile.css";

const Donation = () => {

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    getDonations();
  }, []);

  const getDonations = async () => {
    try {
      const response = await api.get("/donations/my-donations");

      setDonations(response.data.donations || []);

    } catch (error) {
      console.log("Donation error:", error);
    }
  };


  return (
    <div className="profile-page">

      <div className="profile-card">

        <h2>🩸 My Donations</h2>

        {donations.length === 0 ? (

          <p>No donations found</p>

        ) : (

          donations.map((donation) => (

            <div key={donation._id}>

              <h3>Donation Details</h3>

              <p>
                Blood Group: {donation.bloodGroup}
              </p>

              <p>
                Location: {donation.location}
              </p>

              <p>
                Date: {new Date(donation.donationDate).toLocaleDateString()}
              </p>

              <hr />

            </div>

          ))

        )}

      </div>

    </div>
  );
};


export default Donation;