import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const {
    appointments,
    aToken,
    setAppointments,
    cancelAppointment,
    getAllAppointments,
  } = useContext(AdminContext);

  const { calcAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl  m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col px-6 py-3 border-b">
          <p>#</p>
          <p>Patient </p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Actions </p>
        </div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 "
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
            <p className="">
              {slotDateFormat(item.slotDate)},{item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                src={item.docData.image}
                className="w-14 bg-gray-200 rounded-full"
                alt="user_img"
              />
              <p>{item.docData.name}</p>
            </div>
            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <img
                className="w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt="cancel icon"
                onClick={() => cancelAppointment(item._id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
