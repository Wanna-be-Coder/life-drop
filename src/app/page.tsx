"use client";
import { addDonor, getDonors } from "@/lib/firestore/donor";
import { useState, useEffect } from "react";

export default function Home() {
  const [donors, setDonors] = useState<
    { id: string; name: string; bloodType: string }[]
  >([]);
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("");

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    const donorList = await getDonors();
    setDonors(donorList);
  };

  const handleAddDonor = async () => {
    if (!name || !bloodType) return;
    await addDonor(name, bloodType, "0123456789");
    fetchDonors(); // Refresh donor list
    setName("");
    setBloodType("");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Blood Donor List</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Donor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Blood Type"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handleAddDonor}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Donor
        </button>
      </div>

      <ul className="border p-4 rounded">
        {donors.map((donor) => (
          <li key={donor.id} className="border-b p-2">
            {donor.name} - {donor.bloodType}
          </li>
        ))}
      </ul>
    </div>
  );
}
