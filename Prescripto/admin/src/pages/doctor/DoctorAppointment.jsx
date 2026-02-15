import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorAppointment = () => {
  const {
    appointments,
    dToken,
    completeAppointment,
    cancelAppointment,
    getAppointments,
  } = useContext(DoctorContext);

  const { calcAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1.2fr_3fr_1fr_1fr] grid-flow-col px-6 py-3 border-b">
          <p>#</p>
          <p>Patient </p>
          <p>Age</p>
          <p>Payment</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Actions </p>
        </div>
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1.2fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                className="w-14 rounded-full"
                alt="user_img"
              />
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calcAge(item.userData.dob)}</p>
            <div>
              <p className="text-s inline border border-primary px-2 rounded-full">
                {item.payment ? "Online" : "Cash"}
              </p>
            </div>
            <p>
              {slotDateFormat(item.slotDate)},{item.slotTime}
            </p>
            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-500 text-s font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-400 text-s font-medium">Completed</p>
            ) : (
              <div className="flex">
                <img
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="cancel icon"
                  onClick={() => cancelAppointment(item._id)}
                />
                <img
                  src={assets.tick_icon}
                  className="w-10 cursor-pointer"
                  onClick={() => completeAppointment(item._id)}
                  alt="tick"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
