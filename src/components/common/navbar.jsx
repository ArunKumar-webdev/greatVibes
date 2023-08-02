import React from "react";
import Modal from "./modal";
import JobForm from "../job/jobForm";

const Navbar = ({ isModalOpen, handleModalOpen, handleModalClose }) => {
  return (
    <nav className="flex items-center justify-between py-4 md:w-5/6 mx-auto">
      <p className="text-base md:text-2xl font-semibold mx-2 md:mx-0">
        GREAT <span className="font-normal">VIBES</span>
      </p>
      <button
        className="px-4 py-2 text-white bg-[#212121] rounded-lg invisible md:visible mr-10"
        onClick={handleModalOpen}
      >
        Create Job Openning 
      </button>
      <Modal isOpen={isModalOpen} closeModal={handleModalClose}>
        <JobForm closeModal={handleModalClose} />
      </Modal>
    </nav>
  );
};

export default Navbar;
