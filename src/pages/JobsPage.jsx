import React from "react";
import TempJobsData from "../Data/TempJobsData";
import JobCard from "../components/JobCard";
import { useState } from "react";
import "../styling/JobPage.css"
import SearchBar from "../components/SearchBar";
function JobsPage() {
  const [tours, setTours] = useState(TempJobsData);
  console.log(tours);
  console.log(TempJobsData);
  return (
    <div className="  jobpagecss   overflow-x-hidden max-w-screen md:flex-row     font-bold">
      <div className="flex  text-black justify-center items-center text-[5rem]">
        Current Job Openings
      </div>
      <div className="p-4 rounded-3xl bg-[#F5F7FA] text-black flex flex-col justify-center ml-[33%] mr-[26%] gap-3 mt-3 mb-4">
        <p>
          Ignite your career at AIchefmaster, where innovation meets flavor!.
        </p>
        <p> Join us in redefining the future of culinary technology.</p>
        <p> Embrace excellence, become a tastemaker in our dynamic team.</p>
      </div>
       <SearchBar/>
      <div className="cards pt-6">
        {TempJobsData.map((e) => {
          return <JobCard key={e.id} {...e} />;
        })}
      </div>
    </div>
  );
}

export default JobsPage;
