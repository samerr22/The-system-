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
  const { viewId } = useParams();
  console.log(formData);
    
  

  useEffect(() => {
    try {
      const fetchouse = async () => {
        const res = await fetch(`/api/contract/getAll/?FeedId=${viewId}`);
        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedhouse = data.contract.find(
            (hous) => hous._id === viewId
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
  }, [viewId]);

    // Function to generate and download PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
    
        doc.setFontSize(16);
        doc.text("Contract Details", 20, 20);
    
        doc.setFontSize(12);
        const y = 30;
        let offsetY = y;
    
        const addText = (label, value) => {
          doc.text(`${label}: ${value}`, 20, offsetY);
          offsetY += 10;
        };
    
        addText("Supplier's Name", formData.name || "N/A");
        addText("Contact Person", formData.contactp || "N/A");
        addText("Start Date", formData.startdate || "N/A");
        addText("End Date", formData.enddate || "N/A");
        addText("Terms and Agreement", formData.Terms || "N/A");
        addText("Payment Conditions", formData.payment || "N/A");
        addText("Delivery Schedule", formData.delivery || "N/A");
        addText("Renewal Conditions", formData.Renewal || "N/A");
        addText("Status", formData.status || "N/A");
    
        doc.save("contract-details.pdf");
      };
    

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
                <button onClick={downloadPDF} className=" absolute w-32 shadow-sm border border-white  bg-blue-700 text-lg text-white hover:opacity-90  uppercase rounded-xl   ml-[600px]">
                  download
                </button>
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
