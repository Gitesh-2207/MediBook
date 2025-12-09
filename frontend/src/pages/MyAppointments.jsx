import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [showPayConfirm, setShowPayConfirm] = useState(null); // Track which appointment shows confirm/cancel

  // -------------------- FETCH USER APPOINTMENTS --------------------
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error("Failed to load appointments");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // -------------------- CANCEL APPOINTMENT --------------------
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setAppointments((prev) =>
          prev.filter((item) => item._id !== appointmentId)
        );
      } else {
        toast.error(data.message || "Failed to cancel appointment");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // -------------------- CONFIRM PAYMENT --------------------
  const confirmPayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/confirm-payment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Payment confirmed successfully!");
        // Update the payment status in UI
        setAppointments((prev) =>
          prev.map((item) =>
            item._id === appointmentId ? { ...item, payment: true } : item
          )
        );
        setShowPayConfirm(null); // Hide confirm/cancel buttons
      } else {
        toast.error(data.message || "Failed to confirm payment");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  // -------------------- RENDER --------------------
  return (
    <div>
      <p className="pb-3 mt-2 font-medium text-zinc-700 border-b">
        My Appointments
      </p>

      <div>
        {appointments.length > 0 ? (
          appointments.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            >
              {/* Doctor Image */}
              <img
                className="w-32 h-32 object-cover rounded-lg bg-indigo-50"
                src={item.docData?.image || "/placeholder.png"}
                alt={item.docData?.name || "Doctor"}
                onError={(e) => (e.target.src = "/placeholder.png")}
              />

              {/* Appointment Details */}
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.docData?.name || "Doctor not specified"} (
                  {item.docData?.speciality || "Speciality N/A"})
                </p>

                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.docData?.address?.line1}</p>
                <p className="text-xs">{item.docData?.address?.line2}</p>

                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>{" "}
                  {item.slotDate} | {item.slotTime}
                </p>

                <p className="text-xs mt-1">
                  <span className="font-medium text-neutral-700">Payment:</span>{" "}
                  {item.payment ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Pending</span>
                  )}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 justify-end">
                {!item.payment ? (
                  showPayConfirm === item._id ? (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => confirmPayment(item._id)}
                        className="text-sm text-white bg-green-500 text-center sm:min-w-48 py-2 border rounded hover:bg-green-600 transition-all duration-300"
                      >
                        Confirm Pay
                      </button>
                      <button
                        onClick={() => setShowPayConfirm(null)}
                        className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-gray-300 transition-all duration-300"
                      >
                        Cancel Pay
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowPayConfirm(item._id)}
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#5f6FFF] hover:text-white transition-all duration-300"
                    >
                      Pay Online
                    </button>
                  )
                ) : null}

                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-500 text-sm mt-4">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
