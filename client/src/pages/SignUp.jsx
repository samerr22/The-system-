import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(null);
  const navigate = useNavigate();
  console.log(formData);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Plese fill out all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  //contact number validation
  const handleContactChange = (e) => {
    const contactN = e.target.value.trim();
    const contactPattern = /^[0-9]{10}$/;

    if (!contactPattern.test(contactN)) {
      setValidation("Contact number must be a 10-digit number");
    } else {
      setFormData({ ...formData, contactN });
      setValidation(null); // Clear error message if contact number is valid
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 ">
      <div className="flex p-3 max-w-3xl mx-auto  flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <form
            className="flex flex-col ml-[-100px] mt-8 gap-8"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center items-center gap-10  ">
              <div className="">
                <div className="flex justify-center items-center">
                  <div className="font-serif  uppercase text-xl">register</div>
                </div>

                <div className="">
                  <h3 className="font-semibold text-slate-800 uppercase ml-1">
                    suplier's name
                  </h3>
                  <input
                    className=" bg-slate-100 p-3 shadow-lg rounded-lg w-[460px] h-11"
                    type="text"
                    placeholder=""
                    id="supname"
                    onChange={handlchange}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-slate-800 uppercase ml-1">
                    contact person
                  </h3>

                  <input
                    className=" bg-slate-100 p-3 shadow-lg rounded-lg w-[460px] h-11"
                    type="text"
                    placeholder=""
                    id="contname"
                    onChange={handlchange}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-slate-800 uppercase ml-1">
                    contact number
                  </h3>
                  <input
                    className=" bg-slate-100 p-3 shadow-lg rounded-lg w-[460px] h-11"
                    type="text"
                    placeholder=""
                    maxLength={10}
                    id="contactN"
                    onChange={handleContactChange}
                  />
                  {validation && (
                    <p className="mt-0 text-red-600 h-0     rounded-lg text-center ">
                      {validation}
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-slate-800 uppercase ml-1">
                    username
                  </h3>

                  <input
                    className=" bg-slate-100 p-3 shadow-lg rounded-lg w-[460px] h-11"
                    type="text"
                    placeholder=""
                    id="username"
                    onChange={handlchange}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-slate-800 uppercase ml-1">
                    email
                  </h3>

                  <input
                    className=" bg-slate-100 p-3 shadow-lg rounded-lg w-[460px] h-11"
                    type="email"
                    placeholder="name@company.com"
                    id="email"
                    onChange={handlchange}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-slate-800 uppercase ml-1">
                    password
                  </h3>

                  <input
                    className=" bg-slate-100 p-3 shadow-lg rounded-lg w-[460px] h-11"
                    type="password"
                    placeholder=""
                    id="password"
                    onChange={handlchange}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-center items-center">
                  <div className="font-serif  uppercase text-xl">Company</div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 uppercase ml-1">
                    head office address
                  </h3>
                  <input
                    className=" bg-slate-100 p-3 shadow-lg rounded-lg w-[460px] h-11"
                    type="text"
                    placeholder=""
                    id="headAddress"
                    onChange={handlchange}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-slate-800 uppercase ml-1">
                    factory address
                  </h3>

                  <input
                    className=" bg-slate-100 p-3 shadow-lg rounded-lg w-[460px] h-11"
                    type="text"
                    placeholder=""
                    id="factoryAddress"
                    onChange={handlchange}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold shadow-lg text-slate-800 uppercase ml-1">
                    country of origin
                  </h3>
                  <input
                    className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                    type="text"
                    placeholder=""
                    id="counuty"
                    onChange={handlchange}
                  />
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-slate-800 uppercase ml-1">
                    business registration number
                  </h3>
                  <input
                    className=" bg-slate-100 shadow-lg p-3 rounded-lg w-[460px] h-11"
                    type="text"
                    placeholder=""
                    id="businessNumber"
                    onChange={handlchange}
                  />
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold  text-slate-800 uppercase ml-1">
                    tax identification number
                  </h3>
                  <input
                    className=" bg-slate-100 p-3 shadow-lg rounded-lg w-[460px] h-11"
                    type="text"
                    placeholder=""
                    id="taxnumber"
                    onChange={handlchange}
                  />
                </div>
                <div className="mt-10">
                  <button
                    className=" bg-blue-700 text-white p-3 shadow-lg rounded-lg w-[460px] h-11 hover:opacity-90"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <sapn className="pl-3">Loading...</sapn>
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="flex gap-2 text-sm mt-2 ml-[400px]">
            <span>Have an account?</span>
            <Link to="/" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
