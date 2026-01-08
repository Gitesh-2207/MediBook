import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const DoctorAppointments = () => {
    const { dToken, appointments, getAppointments } =
        useContext(DoctorContext);
    const { calculateAge, backendUrl } = useContext(AppContext);
    const [loadingIds, setLoadingIds] = useState({});

    useEffect(() => {
        if (dToken) {
            getAppointments();
        }
    }, [dToken]);

    // ---- STATUS LOGIC (UNCHANGED) ----
    const getStatusLabel = (appointment = {}) => {
        if (appointment.cancelled === true) {
            return { text: "Cancelled", color: "text-red-600 bg-red-100" };
        }
        if (appointment.payment === true) {
            return { text: "Completed", color: "text-green-600 bg-green-100" };
        }
        return { text: "Pending", color: "text-yellow-600 bg-yellow-100" };
    };

    // ---- DATE FORMAT ----
    const formatSlotDate = (dateStr) => {
        if (!dateStr) return "-";
        const [day, month, year] = dateStr.split("_");
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="w-full max-w-6xl mx-auto my-6 px-4">
            {/* Title */}
            <p className="mb-4 text-lg font-semibold text-gray-800">
                📅 All Appointments
            </p>

            <div className="bg-white rounded-xl shadow-md border border-white overflow-hidden">
                {/* ---- DESKTOP HEADER ---- */}
                <div className="hidden md:grid grid-cols-[0.3fr_2fr_1fr_2fr_1fr_1fr_1fr] bg-blue-50 font-semibold py-3 px-6 text-sm">
                    <p className="text-center">#</p>
                    <p>Patient</p>
                    <p className="text-center">Age</p>
                    <p>Date & Time</p>
                    <p className="text-center">Payment</p>
                    <p className="text-center">Fees</p>
                    <p className="text-center">Status</p>
                </div>

                {/* ---- APPOINTMENTS ---- */}
                {appointments && appointments.length > 0 ? (
                    appointments.map((appointment, index) => {
                        const { text, color } = getStatusLabel(appointment);

                        return (
                            <div
                                key={appointment._id || index}
                                className="border-t border-white hover:bg-blue-50 transition px-4 py-4 md:px-6 md:py-3"
                            >
                                {/* ---- MOBILE VIEW ---- */}
                                <div className="md:hidden space-y-2">
                                    <p className="font-medium text-gray-800">
                                        {appointment.userData?.name || "N/A"}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Age:{" "}
                                        {appointment.userData?.dob
                                            ? calculateAge(appointment.userData.dob)
                                            : "-"}
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        {formatSlotDate(appointment.slotDate)} •{" "}
                                        {appointment.slotTime}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <p
                                            className={`font-semibold ${appointment.payment
                                                    ? "text-green-600"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            {appointment.payment ? "Paid" : "Unpaid"}
                                        </p>

                                        <p className="font-semibold text-green-600">
                                            {appointment.amount
                                                ? `₹${appointment.amount}`
                                                : "N/A"}
                                        </p>
                                    </div>

                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${color}`}
                                    >
                                        {text}
                                    </span>
                                </div>

                                {/* ---- DESKTOP VIEW ---- */}
                                <div className="hidden md:grid grid-cols-[0.3fr_2fr_1fr_2fr_1fr_1fr_1fr] items-center">
                                    <p className="text-center">{index + 1}</p>

                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {appointment.userData?.name || "N/A"}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {appointment.userData?.email || "No email"}
                                        </p>
                                    </div>

                                    <p className="text-center">
                                        {appointment.userData?.dob
                                            ? calculateAge(appointment.userData.dob)
                                            : "-"}
                                    </p>

                                    <p>
                                        {formatSlotDate(appointment.slotDate)}{" "}
                                        <span className="text-gray-500 text-sm">
                                            {appointment.slotTime}
                                        </span>
                                    </p>

                                    <p
                                        className={`text-center font-semibold ${appointment.payment
                                                ? "text-green-600"
                                                : "text-gray-500"
                                            }`}
                                    >
                                        {appointment.payment ? "Paid" : "Unpaid"}
                                    </p>

                                    <p className="text-center font-semibold text-green-600">
                                        {appointment.amount
                                            ? `₹${appointment.amount}`
                                            : "N/A"}
                                    </p>

                                    <p
                                        className={`text-center font-semibold rounded-full px-3 py-1 text-xs ${color}`}
                                    >
                                        {text}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="py-8 text-center text-gray-500">
                        No appointments found
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorAppointments;
