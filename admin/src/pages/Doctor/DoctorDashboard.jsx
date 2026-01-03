import React, { useEffect, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorDashboard = () => {
    const {
        dToken,
        dashData,
        getDashData,
        latestAppointments,
        getAppointments,
    } = useContext(DoctorContext);

    useEffect(() => {
        if (dToken) {
            getDashData();
            getAppointments(); // to load latestAppointments
        }
    }, [dToken]);

    if (!dashData) {
        return (
            <p className="text-center mt-10 text-gray-500">
                Loading dashboard...
            </p>
        );
    }

    const { earnings, appointments, patients } = dashData;

    // SAME status logic style as All Appointments
    const getStatusLabel = (appointment) => {
        if (appointment.cancelled) {
            return { text: "Cancelled", color: "text-red-600" };
        } else if (appointment.payment === true) {
            return { text: "Completed", color: "text-green-600" };
        } else {
            return { text: "Pending", color: "text-yellow-600" };
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Doctor Dashboard</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-100 p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold text-blue-700">Earnings</h3>
                    <p className="text-2xl font-bold mt-2">₹{earnings}</p>
                </div>

                <div className="bg-green-100 p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold text-green-700">
                        Appointments
                    </h3>
                    <p className="text-2xl font-bold mt-2">{appointments}</p>
                </div>

                <div className="bg-purple-100 p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold text-purple-700">Patients</h3>
                    <p className="text-2xl font-bold mt-2">{patients}</p>
                </div>
            </div>

            {/* Latest Appointments */}
            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">
                    Latest Appointments
                </h3>

                {latestAppointments && latestAppointments.length > 0 ? (
                    <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">#</th>
                                <th className="p-2 border">Patient</th>
                                <th className="p-2 border">Date</th>
                                <th className="p-2 border">Time</th>
                                <th className="p-2 border">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {latestAppointments.map((item, index) => {
                                const { text, color } = getStatusLabel(item);

                                return (
                                    <tr key={item._id} className="text-center border-t">
                                        <td className="p-2 border">{index + 1}</td>

                                        <td className="p-2 border">
                                            {item.userData?.name || "N/A"}
                                        </td>

                                        {/* ✅ CORRECT DATE (same as All Appointments) */}
                                        <td className="p-2 border">{item.slotDate}</td>

                                        <td className="p-2 border">{item.slotTime}</td>

                                        <td className={`p-2 border font-medium ${color}`}>
                                            {text}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No recent appointments</p>
                )}
            </div>
        </div>
    );
};

export default DoctorDashboard;
