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
  const {viewId} = useParams();



  const navigate = useNavigate();

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };



  useEffect(() => {
    try {
      const fetchouse = async () => {
        const res = await fetch(
          `/api/contract/getAll/?FeedId=${viewId}`
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
            (hous) => hous._id === viewId
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
  }, [viewId]);



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
       navigate('/clientT')
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
      
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  


 





 


   




  return (
    <div className=" bg-slate-200 min-h-screen ">
      <div className="absolute transform -translate-x-0 translate-y-0 top-1  flex justify-center items-center">
        <div className="">
          <div className=" lg:mt-32 mt-[270px]  md:mt-20 lg:ml-[500px]  md:ml-[240px] ml-[4px] ">
            <div className=" flex justify-center items-center  ">
              <div>
                <h1 className="text-4xl font-serif opacity-70  uppercase text-gray-800">
               update term and condtions
                </h1>
                <div className="flex justify-center items-center">
                  <Link to={`/clientT`}>
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
                  <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
                  {/**   <div className="absolute rounded-xl hover: w-[150px] hover:opacity-90 h-8 ml-[810px] bg-blue-600 mt-[-10px] ">
                          <button className="ml-4 mt-1 hover:opacity-90 uppercase text-white whitespace-nowrap" onClick={handlefromsubmit}>
                            Send request 
                          </button>
                        </div>
                      */}
                    <div className="flex justify-center items-center    ">
                    
                    

                      <div>
                        <div className="flex justify-center items-center"></div>
                        <div>
                          <h3 className="font-semibold text-slate-800 uppercase ml-1">
                            term of agreement
                          </h3>
                          <textarea
                            className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                            type="text"
                            placeholder=""
                            id="Terms"
                            onChange={handlchange}
                            value={formData.Terms}
                          />
                        </div>
                        
                        <div className="mt-10">
                          <button
                            className=" bg-blue-600 bg-opacity-80 border-white border border-opacity-50 text-white p-3 rounded-lg w-[460px] h-[45px] hover:opacity-90"
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
