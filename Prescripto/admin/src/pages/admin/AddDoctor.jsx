import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [exp, setExp] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [spl, setSpl] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [about, setAbout] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        toast.error("Image not Selected");
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("email", email);
      formData.append("name", name);
      formData.append("password", password);
      formData.append("fees", fee);
      formData.append("experience", exp);
      formData.append("about", about);
      formData.append("speciality", spl);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: addr1, line2: addr2 })
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setAbout("");
        setName("");
        setEmail("");
        setAddr1("");
        setAddr2("");
        setPassword("");
        setFee("");
        setDegree("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form className="m-5 w-full" onSubmit={onsubmitHandler}>
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              alt="img"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>Upload Doctor Picture</p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600 ">
          <div className="w-full gap-4 lg:flex-1 flex flex-col">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                required
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Email</p>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                required
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                required
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => setExp(e.target.value)}
                value={exp}
                name=""
                id=""
                className="border rounded px-3 py-2"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                type="number"
                onChange={(e) => setFee(e.target.value)}
                value={fee}
                placeholder="fees"
                required
                className="border rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpl(e.target.value)}
                value={spl}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                type="text"
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                placeholder="education"
                required
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                type="text"
                onChange={(e) => setAddr1(e.target.value)}
                value={addr1}
                placeholder="address 1"
                required
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                onChange={(e) => setAddr2(e.target.value)}
                value={addr2}
                placeholder="address 2"
                required
                className="border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 mb-2 ">
          <p>About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            rows={5}
            className="w-full px-4 pt-2 border rounded"
            placeholder="write about doctor"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
