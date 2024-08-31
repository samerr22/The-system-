import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSilce";
import girl from "../img/img.jpg";

export default function supplierAdd() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [validation, setValidation] = useState(null);
  const {upId} = useParams();

  const navigate = useNavigate();

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };



  useEffect(() => {
    try {
      const fetchouse = async () => {
        const res = await fetch(
          `/api/contract/getAll/?FeedId=${upId}`
        );
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedhouse = data.contract.find(
            (hous) => hous._id === upId
          );
          if (selectedhouse) {
            setFormData(selectedhouse);
          }
        }
      };
      fetchouse();
    } catch (error) {
      console.log(error.message);
    }
  }, [upId]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/contract/sup/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      }

      if (res.ok) {
        console.log(null);
       alert('success')
       navigate('/Table')
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  //form submit
  const handlefromsubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/edit/EPcreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        console.log("sussessfull");
        alert("suscessfull");
        navigate("/table");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  


 





  //contact number validation
  const handleContactChange = (e) => {
    const contact = e.target.value.trim();
    const contactPattern = /^[0-9]{10}$/;

    if (!contactPattern.test(contact)) {
      setValidation("Contact number must be a 10-digit number");
    } else {
      setFormData({ ...formData, contact });
      setValidation(null); // Clear error message if contact number is valid
    }
  };


   




  return (
    <div className="  min-h-screen ">
      <div className="absolute transform -translate-x-0 translate-y-0 top-1  flex justify-center items-center">
        <div className="">
          <div className=" lg:mt-32 mt-[270px]  md:mt-20 lg:ml-[300px]  md:ml-[240px] ml-[4px] ">
            <div className=" flex justify-center items-center ">
              <div>
                <h1 className="text-4xl font-serif opacity-70 uppercase text-gray-800">
                  create new contract
                </h1>
                <div className="flex justify-center items-center">
                  <Link to={`/table`}>
                    <button className="text-md  font-serif underline text-gray-800">
                      Back
                    </button>
                  </Link>
                </div>

              
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center">
                <div className="mt-2">
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="absolute rounded-xl hover: w-[100px] ml-[860px] bg-slate-400 bg-opacity-25 mb-4 ">
                          <button className="ml-2 whitespace-nowrap" onClick={handlefromsubmit}>
                            Edit request 
                          </button>
                        </div>
                    <div className="flex justify-center items-center gap-10  ">
                    
                      <div className="">
                        
                        <div className="">
                          <h3 className="font-semibold text-slate-800 uppercase ml-1">
                            suplier's name
                          </h3>
                          <input
                            className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                            type="text"
                            placeholder=""
                            id="name"
                            onChange={handlchange}
                            value={formData.name}
                          />
                        </div>
                        <div className="mt-4">
                          <h3 className="font-semibold text-slate-800 uppercase ml-1">
                            contact person
                          </h3>

                          <input
                            className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                            type="text"
                            placeholder=""
                            id="contactp"
                            onChange={handlchange}
                            value={formData.contactp}
                          />
                        </div>
                        <div className="mt-4">
                          <h3 className="font-semibold text-slate-800 uppercase ml-1">
                            start date
                          </h3>
                          <input
                            className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                            type="text"
                            placeholder=""
                            id="startdate"
                            onChange={handlchange}
                            value={formData.startdate}
                          />
                          <p className="mt-0 text-red-600 h-0   text-sm   rounded-lg text-center ">
                          Invalid date format. Please use mm/dd/yy format.
                    </p>
                        </div>
                        <div className="mt-4">
                          <h3 className="font-semibold text-slate-800 uppercase ml-1">
                            end data
                          </h3>

                          <input
                            className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                            type="text"
                            placeholder=""
                            id="enddate"
                            onChange={handlchange}
                            value={formData.enddate}
                          />
                          <p className="mt-0 text-red-600 h-0  text-sm    rounded-lg text-center ">
                          Invalid date format. Please use mm/dd/yy format.
                    </p>
                        </div>
                        <div className="mt-10">
                          <button
                            className=" bg-blue-950 bg-opacity-80 border-white border border-opacity-50 text-white p-3 rounded-lg w-[460px] h-[45px] hover:opacity-90"
                            type="submit"
                          >
                            <div className="flex items-center justify-center">
                              <div className="font-serif text-xl opacity-75 uppercase">
                                Submit
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-center items-center"></div>
                        <div>
                          <h3 className="font-semibold text-slate-800 uppercase ml-1">
                            tearm of agreement
                          </h3>
                          <input
                            className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                            type="text"
                            placeholder=""
                            id="Terms"
                            onChange={handlchange}
                            value={formData.Terms}
                          />
                        </div>
                        <div className="mt-4">
                          <h3 className="font-semibold text-slate-800 uppercase ml-1">
                            pyment
                          </h3>

                          <select
                            className="bg-slate-100 p-3 rounded-lg w-[460px] h-11 "
                            id="payment"
                            onChange={handlchange}
                            value={formData.payment}
                          >
                            <option value="">Select </option>
                            <option value="credit card">credit card</option>
                            <option value="debit card">debit card</option>
                          </select>
                        </div>
                        <div className="mt-4">
                          <h3 className="font-semibold text-slate-800 uppercase ml-1">
                            delivery shcedule
                          </h3>

                          <select
                            className="bg-slate-100 p-3 rounded-lg w-[460px] h-11 "
                            id="delivery"
                            onChange={handlchange}
                            value={formData.delivery}
                          >
                            <option value="">Select </option>
                            <option value="3 moth">3 moth</option>
                            <option value="6 month">6 month</option>
                          </select>
                        </div>

                        <div className="mt-4">
                          <h3 className="font-semibold text-slate-800 uppercase ml-1">
                            renewal conditions
                          </h3>

                          <select
                            className="bg-slate-100 p-3 rounded-lg w-[460px] h-11 "
                            id="Renewal"
                            onChange={handlchange}
                            value={formData.Renewal}

                          >
                            <option value="">Select </option>
                            <option value="one">one</option>
                            <option value="two">two</option>
                          </select>
                        </div>
                        <div className="mt-4">
                          <h3 className="font-semibold text-slate-800 uppercase ml-1">
                            status
                          </h3>

                          <select
                            className="bg-slate-100 p-3 rounded-lg w-[460px] h-11 "
                            id="status"
                            onChange={handlchange}
                            value={formData.status || ''}
                            
                          >
                            <option value="">Select </option>
                            <option value="Active">Active</option>
                            <option value="Expired">Expired</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>

                  {publishError && (
                    <p className="mt-0 text-red-600 absolute bg-slate-100 bg-opacity-50  w-300 h-12 ml-[-50px] rounded-lg text-center ">
                      {publishError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
