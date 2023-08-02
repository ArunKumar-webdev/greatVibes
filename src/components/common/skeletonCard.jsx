import React from "react";

const SkeletonCardItem = ({ numOfLines }) => {
  const lines = Array(numOfLines).fill("");

  return (
    <div className="w-full sm:w-1/2  md:w-min-[500px] h-auto  p-4">
      <div className="rounded-lg shadow-lg p-4 bg-white md:min-h-72 ">
        <div className="animate-pulse flex flex-col justify-between h-full">
          <div className="flex justify-between">
            <div className="bg-gray-200 h-4 w-1/4 mt-1 rounded"></div>
            <div className="bg-gray-200 h-4 w-1/4 mt-1 rounded"></div>
          </div>
          <div className="flex-1 items-center py-2">
            {lines.map((line, index) => (
              <div
                key={index}
                className="bg-gray-200 h-4 rounded w-full mt-2"
              ></div>
            ))}
            <div className="bg-gray-200 h-4 rounded w-2/3 mt-2"></div>
          </div>
          <div className="flex justify-between">
            <div className="bg-gray-200 h-4 w-1/4 mt-1 rounded"></div>
            <div className="bg-gray-200 h-4 w-1/4 mt-1 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = ({ numOfLines }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center bg-background md:px-20 ">
        <SkeletonCardItem numOfLines={numOfLines} />
        <SkeletonCardItem numOfLines={numOfLines} />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center bg-background md:px-20 ">
        <SkeletonCardItem numOfLines={numOfLines} />
        <SkeletonCardItem numOfLines={numOfLines} />
      </div>
    </>
  );
};

export default SkeletonCard;
