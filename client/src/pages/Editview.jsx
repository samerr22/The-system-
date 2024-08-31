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
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function supplierAdd() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [validation, setValidation] = useState(null);
  const { eId } = useParams();
  console.log(formData);
    
  

  useEffect(() => {
    try {
      const fetchouse = async () => {
        const res = await fetch(`/api/edit/EgetAll/?FeedId=${eId}`);
        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedhouse = data.contract.find(
            (hous) => hous._id === eId
          );
          console.log(selectedhouse);

          if (selectedhouse) {
            setFormData(selectedhouse);
          }
        }
      };
      fetchouse();
    } catch (error) {
      console.log(error.message);
    }
  }, [eId]);

  return (
    <div className="  min-h-screen ">
      <div className="absolute transform -translate-x-0 translate-y-0 top-1  flex justify-center items-center">
        <div className="">
          <div className=" lg:mt-32 mt-[270px]  md:mt-20 lg:ml-[300px]  md:ml-[240px] ml-[4px] ">
            <div className=" flex justify-center items-center ">
              <div className="">
                <div>
                  <h1 className="text-4xl font-serif opacity-70 uppercase text-gray-800">
                    contract
                  </h1>
                </div>
                <div className="flex justify-center items-center">
                  <Link to={`/table`}>
                    <button className="text-md  font-serif underline text-gray-800">
                      Back
                    </button>
                  </Link>
                </div>
             
              </div>
            </div>

            <div className="flex justify-center items-center gap-80">
              <div>
                <div className="mt-10">
                  <div className="mt-4">
                    <h1 className="font-serif text-3xl  text-gray-700 text-opacity-70">
                      supplier's Name
                    </h1>
                    {formData.name}
                  </div>
                </div>
                <div className="mt-10">
                  <div className="mt-4">
                    <h1 className="font-serif text-3xl  text-gray-700 text-opacity-70">
                      contact person
                    </h1>
                    {formData.contactp}
                  </div>
                </div>
                <div className="mt-10">
                  <div className="mt-4">
                    <h1 className="font-serif text-3xl  text-gray-700 text-opacity-70">
                      start date
                    </h1>
                    {formData.startdate}
                  </div>
                </div>
                <div className="mt-10">
                  <div className="mt-4">
                    <h1 className="font-serif text-3xl  text-gray-700 text-opacity-70">
                      end date
                    </h1>
                    {formData.enddate}
                  </div>
                </div>
              </div>

              <div>
                <div className="mt-10">
                  <div className="mt-4">
                    <h1 className="font-serif whitespace-nowrap text-3xl w-48 break-words  text-gray-700 text-opacity-70">
                      Tearms and agreement
                    </h1>
                    {formData.Terms}
                  </div>
                </div>
                <div className="mt-10">
                  <div className="mt-4">
                    <h1 className="font-serif text-3xl  text-gray-700 text-opacity-70">
                      payment conditions
                    </h1>
                    {formData.payment}
                  </div>
                </div>
                <div className="mt-10">
                  <div className="mt-4">
                    <h1 className="font-serif text-3xl  text-gray-700 text-opacity-70">
                      delivery schedule
                    </h1>
                    {formData.delivery}
                  </div>
                </div>
                <div className="mt-10">
                  <div className="mt-4">
                    <h1 className="font-serif text-3xl  text-gray-700 text-opacity-70">
                      renewal conditions
                    </h1>
                    {formData.Renewal}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mt-10">
                <div className="mt-4">
                  <h1 className="font-serif text-3xl  text-gray-700 text-opacity-70">
                    status
                  </h1>
                  {formData.status}
                </div>
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
