import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability, setDoctors } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  const handleAvailabilityChange = async (docId) => {
    await changeAvailability(docId);
    // ✅ Instantly update UI without waiting for refetch
    setDoctors((prev) =>
      prev.map((doc) =>
        doc._id === docId ? { ...doc, available: !doc.available } : doc
      )
    );
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item, index) => (
          <div
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
            key={index}
          >
            <img
              className="bg-indigo-50 group-hover:bg-[#5f6FFF] transition-all duration-500"
              src={item.image}
              alt=""
            />
            <div className="p-4 ">
              <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
              <p className="text-zinc-600 text-sm">{item.speciality}</p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => handleAvailabilityChange(item._id)}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
