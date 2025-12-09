import React, { useEffect, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorDashboard = () => {
    const { dToken, dashData, getDashData } = useContext(DoctorContext);

    useEffect(() => {
        if (dToken) getDashData();
    }, [dToken]);

    if (!dashData) {
        return (
            <p className="text-center mt-10 text-gray-500">Loading dashboard...</p>
        );
    }

    const { earnings, appointments, patients, latestAppointments } = dashData;

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
                    <h3 className="text-lg font-semibold text-green-700">Appointments</h3>
                    <p className="text-2xl font-bold mt-2">{appointments}</p>
                </div>

                <div className="bg-purple-100 p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold text-purple-700">Patients</h3>
                    <p className="text-2xl font-bold mt-2">{patients}</p>
                </div>
            </div>

            {/* Latest Appointments Table */}
            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">Latest Appointments</h3>
                {latestAppointments?.length ? (
                    <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">#</th>
                                <th className="p-2 border">Patient</th>
                                <th className="p-2 border">Date</th>
                                <th className="p-2 border">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestAppointments.map((item, index) => (
                                <tr key={item._id} className="text-center border-t">
                                    <td className="p-2 border">{index + 1}</td>
                                    <td className="p-2 border">{item.userName}</td>
                                    {/* Show only date part */}
                                    <td className="p-2 border">
                                        {new Date(item.date).toLocaleDateString("en-IN")}
                                    </td>
                                    <td
                                        className={`p-2 border font-medium ${item.status === "Completed"
                                            ? "text-green-600"
                                            : item.status === "Rejected"
                                                ? "text-red-600"
                                                : "text-yellow-600"
                                            }`}
                                    >
                                        {item.status}
                                    </td>
                                </tr>
                            ))}
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
