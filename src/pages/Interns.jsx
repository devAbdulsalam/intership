import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import ConfirmModal from "../components/ConfirmModal";
import SelectStateAndLGA from "../components/SelectStateAndLGA";
import LeftImage from "../components/LeftImage";
import stemImage from "./../assets/Stem2.png";
import { useState } from "react";
import { programs } from "./data";
import Social from "../components/Social";

const Interns = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [user, setUser] = useState("");
  const [programInfo, setProgramInfo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const phoneRegExp = /^(\+\d{1,4})?\d{10,11}$/;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async (formValues) => {
    setLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Include other fetch options if needed
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Registration successful");
        setUser(data?.name);
        setShowModal(true);
      } else {
        toast.error(`Unexpected Error Occur`);
        console.log(response.status);
      }
    } catch (error) {
      toast.error(error?.message || error?.msg || "Something went wrong!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const showProgramInfo = (event) => {
    const selectedProgramName = event.target.value;
    setSelectedProgram(selectedProgramName);

    // Find the selected program in the programs array
    const selectedProgramData = programs.find(
      (program) => program.name === selectedProgramName
    );

    if (selectedProgramData) {
      // Display information for the selected program
      setProgramInfo(selectedProgramData.courses);
    } else {
      setProgramInfo([]);
    }
  };
  return (
    <>
      <section className="w-full font-josefin items-center justify-center flex flex-col">
        <div className="lg:w-[50%] justify-center items-center lg:mx-auto lg:my-[20px] pt-[20px] lg:shadow-lg">
          <div className="px-3">
            <div className="relative sm:pt-[30px] sm:pb-[24px] rounded-[16px] bg-white-100 lg:px-[40px]">
              <div className="justify-center items-center w-full h-auto mb-3 flex">
                <img
                  src="/Stem.png"
                  alt="logo"
                  className="md:w-3/12 h-auto w-4/12"
                />
              </div>
              <h1
                className={`font-montserrat text-center font-[600] mt-3 text-blue-950 text-[28px]`}
              >
                Internship Registration
              </h1>
              <span
                className={`font-josefin block text-center font-[400] text-[16px] text-dark-400 `}
              >
                Fill the form to continue the Registration
              </span>

              <hr className="my-4" />

              <form
                action=""
                className="flex flex-col mt-4 z-10"
                onSubmit={handleSubmit}
              >
                <label
                  htmlFor="First Name"
                  className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter Full Name"
                  required
                  className={` mt-1 mb-3 p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
                />

                <label
                  htmlFor="phoneNumber"
                  className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
                  required
                  className={` mt-1 mb-3 p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
                />

                <label
                  htmlFor="email"
                  className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
                >
                  Email
                </label>
                <input
                  placeholder="Enter Email"
                  id="email"
                  name="email"
                  required
                  className={` mt-1 mb-3 p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
                />

                <div className="md:flex w-full items-center gap-3">
                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
                    >
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      type="date"
                      name="dob"
                      required
                      className={` mt-1 mb-3 p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="gender"
                      className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      className={` mt-1 mb-3 text-md p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <label
                  htmlFor="institute"
                  className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
                >
                  College or Institution (Optional)
                </label>
                <input
                  placeholder="Enter College/Institution"
                  id="institute"
                  name="institute"
                  required
                  className={` mt-1 mb-3 p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
                />
                <label
                  htmlFor="course"
                  className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
                >
                  Course of Studies (Optional)
                </label>
                <input
                  placeholder="Enter Course of Studies"
                  id="course"
                  name="course"
                  required
                  className={` mt-1 mb-3 p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
                />

                <div className="flex w-full items-center gap-3">
                  <SelectStateAndLGA
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                    selectedLga={selectedLga}
                    setSelectedLga={setSelectedLga}
                    register={register}
                    errors={errors}
                  />
                </div>

                <label
                  htmlFor="Program"
                  className={`font-montserrat text-blue-950 text-md text-black-main font-medium`}
                >
                  Program
                </label>
                <select
                  id="Program"
                  onChange={showProgramInfo}
                  className={` mt-1 mb-3 text-md p-[16px] w-full text-black h-[50px] border text-md font-medium rounded-md`}
                >
                  <option value="">Select Program</option>
                  {programs.map((program) => (
                    <option key={program.name} value={program.name}>
                      {program.name}
                    </option>
                  ))}
                </select>
                <button
                  className="font-montserrat p-3 bg-blue-950 hover:bg-blue-900 text-white w-full rounded-md my-3 text-[16px] bg-primary-100"
                  type="submit"
                  // disabled={!isChecked}
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen flex items-stretch text-green-600 relative overflow-y-auto bg-no-repeat bg-cover bgImage">
        <LeftImage />

        <div className="lg:w-1/2 w-full flex justify-center items-center bg-primary/30 ">
          <div className="px-2 py-4 z-10  h-full w-[768px] mx-auto flex items-center">
            <div className="mx-auto md:shadow">
              <img
                className="mx-auto my-10 md:hidden"
                src={stemImage}
                alt="stemLab"
              />
              <form
                className="mx-auto px-5 bg-white pt-8 pb-4 rounded mb-6"
                onSubmit={handleSubmit(submitHandler)}
              >
                <div className="mb-6 w-full flex flex-col">
                  <h2 className="text-center text-xl md:text-3xl font-semibold  text-primary uppercase">
                    Internship Registeration Form
                  </h2>
                  <div className="border-4 w-10 border-primary inline-block my-2 mx-auto"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="text-gray-800 font-semibold">
                    {" "}
                    Full name
                    <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-primary-light rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder="Enter your name Address"
                    id="name"
                    {...register("name", {
                      required: "Please enter your name",
                    })}
                  />
                  {errors.name && (
                    <div className="text-red-500">{errors.name.message}</div>
                  )}
                </div>
                <div className="">
                  <label
                    htmlFor="phone"
                    className="text-gray-800 font-semibold"
                  >
                    Phone number
                    <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="phone"
                    className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-primary-light rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder="Enter your phone"
                    id="phone"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: phoneRegExp,
                        message: "Enter a valid 11-digit phone number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <div className="text-red-500">{errors.phone.message}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="text-gray-800 font-semibold"
                  >
                    {" "}
                    Email
                    <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-primary-light rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder="Enter your Email Address"
                    id="email"
                    {...register("email", {
                      required: "Please enter email",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                        message: "Please enter valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="text-red-500">{errors.email.message}</div>
                  )}
                </div>
                <div className="md:flex gap-2 w-full">
                  <div className="w-full">
                    <label
                      htmlFor="dob"
                      className="text-gray-800 font-semibold"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-primary-light rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                      id="dob"
                      {...register("dob", {
                        required: "Please enter your date of birth",
                      })}
                    />
                    {errors.dob && (
                      <div className="text-red-500">{errors.dob.message}</div>
                    )}
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="gender"
                      className="text-gray-800 font-semibold"
                    >
                      Gender
                    </label>
                    <select
                      className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-primary-light rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                      id="gender"
                      {...register("gender", {
                        required: "Please enter your gender",
                      })}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.gender && (
                      <div className="text-red-500">
                        {errors.gender.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="institution"
                    className="text-gray-800 font-semibold"
                  >
                    Institution attended
                  </label>
                  <input
                    type="institution"
                    className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-primary-light rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder="Enter your institution"
                    id="institution"
                    {...register("institution")}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="course"
                    className="text-gray-800 font-semibold"
                  >
                    Course of Study
                  </label>
                  <input
                    type="course"
                    className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-primary-light rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder="Enter your course of study"
                    id="course"
                    {...register("course")}
                  />
                </div>
                <div className="">
                  <SelectStateAndLGA
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                    selectedLga={selectedLga}
                    setSelectedLga={setSelectedLga}
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="programe"
                    className="text-gray-800 font-semibold"
                  >
                    Select Programme
                  </label>
                  <select
                    {...register("programme", {
                      required: "Please select a programme",
                    })}
                    onChange={showProgramInfo}
                    className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-primary-light rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                  >
                    <option value="">Select Program</option>
                    {programs.map((program) => (
                      <option key={program.name} value={program.name}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                  {errors.programe && (
                    <div className="text-red-500">
                      {errors.programe.message}
                    </div>
                  )}
                  {selectedProgram && (
                    <div className="mt-2 mb-3 show-program-info shadow p-3 text-primary">
                      <h2 className="text-gray-800 font-semibold text-lg">{`${selectedProgram} Program Info:`}</h2>
                      <ul className="list-disc  ml-6">
                        {programInfo.map((program, index) => (
                          <li key={index} className="mt-2 text-md">
                            {program}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <button
                    className="rounded-md w-full mx-auto bg-primary hover:bg-primary-light py-2 px-4 text-xl font-semibold text-white shadow outline-none "
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? "Loading" : "Submit"}
                  </button>
                </div>
              </form>
              <div className="lg:hidden">
                <Social />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ConfirmModal
        show={showModal}
        setShow={setShowModal}
        user={user}
        setUser={setUser}
      />
      {loading && <Loading />}
    </>
  );
};

export default Interns;
