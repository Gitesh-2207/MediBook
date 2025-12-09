import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // ✅ Get doctor info by ID
  const fetchDocInfo = () => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
  };

  // ✅ Generate available slots
  const getAvaliableSlots = async () => {
    if (!docInfo) return;
    setDocSlots([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // Adjust current time
      if (today.getDate() === currentDate.getDate()) {
        if (currentDate.getHours() < 10) {
          currentDate.setHours(10, 0, 0, 0);
        } else {
          currentDate.setHours(currentDate.getHours() + 1);
          currentDate.setMinutes(0);
        }
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const bookedSlots = docInfo?.slots_booked?.[slotDate] || [];
        const isSlotAvailable = !bookedSlots.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            Time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  // ✅ Book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    if (!slotTime || !docSlots[slotIndex]?.length) {
      return toast.warn("Please select a date and time slot");
    }

    const date = docSlots[slotIndex][0].datetime;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}_${month}_${year}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          docId,
          slotDate: formattedDate,
          slotTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Appointment booked successfully!");
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to book appointment");
    }
  };

  // ✅ Effects
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvaliableSlots();
  }, [docInfo]);

  if (!docInfo) return <div>Loading...</div>;

  return (
    <div>
      {/* Doctor Info */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="verified" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="info" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-600">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4 scrollbar-hide">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index
                    ? "bg-[#5f6FFF] text-white"
                    : "border border-gray-300"
                  }`}
                key={index}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        {/* Time Slots */}
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4 scrollbar-hide">
          {docSlots.length > 0 &&
            docSlots[slotIndex]?.map((item, index) => (
              <p
                onClick={() => setSlotTime(item.Time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.Time === slotTime
                    ? "bg-[#5f6FFF] text-white"
                    : "text-gray-400 border border-gray-300"
                  }`}
                key={index}
              >
                {item.Time.toLowerCase()}
              </p>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-[#5f6FFF] text-white text-sm font-light px-14 py-3 rounded-full my-6"
        >
          Book An Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
