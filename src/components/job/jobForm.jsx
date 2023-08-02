import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addJob, updateExistingJob } from "../../actions/jobs";
import {
  jobEditSuccess,
  jobPostedFailed,
  jobPostedSuccess,
} from "../../constants/error";
import { showAlert } from "../../reducers/alert";
import Button from "../common/button";

const JobForm = ({ jobData, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: jobData,
  });
  const dispatch = useDispatch();
  const [tab, setTab] = useState(1);

  const validateRadio = (value) => {
    const options = ["externalApply", "quickApply"];
    if (value === undefined || value === null || !options.includes(value)) {
      return "Please select an option";
    }
    return true;
  };

  const onSubmit = async (data) => {
    if (tab === 1) {
      setTab(2);
    } else if (tab === 2) {
      try {
        if (jobData) {
          dispatch(updateExistingJob({ jobData: jobData, data }));
          dispatch(showAlert(jobEditSuccess.message, jobEditSuccess.alert));
        } else {
          dispatch(addJob(data));
          dispatch(showAlert(jobPostedSuccess.message, jobPostedSuccess.alert));
        }
      } catch (error) {
        dispatch(showAlert(jobPostedFailed.message, jobPostedFailed.alert));
      }
      closeModal();
    }
  };
  let inputStyle =
    "text-sm  mb-2 focus:outline-none indent-1.5 placeholder:text-place-color placeholder:text-sm border-[1px] w-full rounded-md h-9";
  let errorStyle = "text-error text-xs lg:text-sm";
  let inputLabelStyle = "font-medium mb-1 text-sm";

  const renderStepOne = () => {
    return (
      <main className="md:min-h-[500px]">
        <header className="flex items-center justify-between mb-6">
          <p className="text-xl">{jobData ? "Edit" : "Create a"} job</p>
          <p>Step 1</p>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <aside className="mb-6">
              <p className={inputLabelStyle}>
                Job Title <span className="text-red-600">*</span>
              </p>
              <input
                placeholder="ex.UX UI Designer"
                className={`${inputStyle} ${
                  errors.jobTitle ? { errorStyle } : ""
                }`}
                {...register("jobTitle", { required: true })}
              />
              {errors.jobTitle && (
                <p className={errorStyle}>Job Title is required</p>
              )}
            </aside>
            <aside className="mb-6">
              <p className={inputLabelStyle}>
                Company Name <span className="text-red-600">*</span>
              </p>
              <input
                placeholder="ex.Google"
                className={`${inputStyle} ${
                  errors.companyName ? { errorStyle } : ""
                }`}
                {...register("companyName", { required: true })}
              />
              {errors.companyName && (
                <p className={errorStyle}>Company Name is required</p>
              )}
            </aside>
            <aside className="mb-6">
              <p className={inputLabelStyle}>
                Industry <span className="text-red-600">*</span>
              </p>
              <input
                placeholder="ex.Information Technology"
                className={`${inputStyle} ${
                  errors.industry ? { errorStyle } : ""
                }`}
                {...register("industry", { required: true })}
              />
              {errors.industry && (
                <p className={errorStyle}>Name of Industry is required</p>
              )}
            </aside>
            <section className="flex flex-col md:flex-row justify-between mb-6">
              <aside className="mb-6 lg:mb-0">
                <p className={inputLabelStyle}>Location</p>
                <input
                  placeholder="ex.Chennai"
                  className={`${inputStyle} md:w-[225px]`}
                  {...register("location")}
                />
              </aside>
              <aside>
                <p className={inputLabelStyle}>Remote Type</p>
                <input
                  placeholder="ex.In-Office"
                  className={`${inputStyle} md:w-[225px]`}
                  {...register("remoteType")}
                />
              </aside>
            </section>
          </section>
          <section className="flex justify-end mt-24 gap-10">
            <Button type="button" onClick={closeModal}>
              Close
            </Button>
            <Button type="button" onClick={handleSubmit(onSubmit)}>
              Next
            </Button>
          </section>
        </form>
      </main>
    );
  };
  const renderStepTwo = () => {
    return (
      <main className="md:min-h-[500px]">
        <header className="flex items-center justify-between mb-6">
          <p className="text-xl">Create a job</p>
          <p>Step 2</p>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className={inputLabelStyle}>Experience</p>
          <section className="flex flex-col md:flex-row justify-between lg:items-center mb-6">
            <aside>
              <input
                placeholder="Minimum"
                className={`${inputStyle} md:w-[225px] ${
                  errors.minExperience ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                {...register("minExperience", {
                  value: "",
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
              <div
                className={
                  errors.minExperience || errors.maxExperience ? "h-5 " : ""
                }
              >
                {errors.minExperience?.type === "required" && (
                  <p className={errorStyle}>Min experience is required.</p>
                )}
                {errors.minExperience?.type === "pattern" && (
                  <p className={errorStyle}>Min experience should be a number.</p>
                )}
              </div>
            </aside>

            <aside>
              <input
                placeholder="Maximum"
                className={`${inputStyle} md:w-[225px] ${
                  errors.maxExperience ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                {...register("maxExperience", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
              <div
                className={
                  errors.minExperience || errors.maxExperience ? "h-5" : ""
                }
              >
                {errors.maxExperience?.type === "required" && (
                  <p className={errorStyle}>Max experience is required.</p>
                )}
                {errors.maxExperience?.type === "pattern" && (
                  <p className={errorStyle}>Max experience should be a number.</p>
                )}
              </div>
            </aside>
          </section>

          <p className={inputLabelStyle}>Salary</p>
          <section className="flex flex-col md:flex-row lg:items-center  justify-between mb-6">
            <aside>
              <input
                placeholder="Minimum"
                className={`${inputStyle} md:w-[225px] ${
                  errors.minSalary ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                {...register("minSalary", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
              {errors.minSalary?.type === "required" && (
                <p className={errorStyle}>Min salary is required.</p>
              )}
              {errors.minSalary?.type === "pattern" && (
                <p className={errorStyle}>Min salary should be a number.</p>
              )}
            </aside>
            <aside>
              <input
                {...register("maxSalary", {
                  required: "Max salary is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Maximum should be a number",
                  },
                })}
                placeholder="Maximum"
                className={`${inputStyle} md:w-[225px] ${
                  errors.minSalary ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
              />
              {errors.maxSalary && (
                <p className={errorStyle}>{errors.maxSalary.message}</p>
              )}
            </aside>
          </section>

          <aside className="mb-6">
            <p className={inputLabelStyle}>Total Employee</p>
            <input
              {...register("totalEmployee", {
                required: "Total employee is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Total employee should be a number",
                },
              })}
              placeholder="ex.100"
              className={`${inputStyle} ${
                errors.minSalary ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
            />
            {errors.totalEmployee && (
              <p className={errorStyle}>{errors.totalEmployee.message}</p>
            )}
          </aside>
          <section className="flex gap-4 mb-2">
            <aside className="flex gap-1 items-center">
              <input
                type="radio"
                {...register("option", { validate: validateRadio })}
                value="quickApply"
              />
              <p className="text-sm text-place-color">Quick Apply</p>
            </aside>
            <aside className="flex gap-1 items-center">
              <input
                type="radio"
                {...register("option", { validate: validateRadio })}
                value="externalApply"
              />
              <p className="text-sm text-place-color">External Apply</p>
            </aside>
          </section>
          {errors.option && (
            <p className={errorStyle}>Select a way to apply job</p>
          )}
          <section className="flex justify-end mt-24 gap-10">
            <Button type="button" onClick={closeModal}>
              Close
            </Button>
            <Button type="submit">Save</Button>
          </section>
        </form>
      </main>
    );
  };

  return <>{tab === 1 ? renderStepOne() : renderStepTwo()}</>;
};

export default JobForm;
