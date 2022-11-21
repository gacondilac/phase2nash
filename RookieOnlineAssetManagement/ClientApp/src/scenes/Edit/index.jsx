import "./CreateUser.css";
import { getUserAPI, editUserAPI } from "../../api/getapi";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate, useRoutes } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { boolean } from "yup";

function GetAge(birthDate) {
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function CreateUser() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    joinedDay: "",
    dateofBirth: "",
    gender: null,
    type: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getUserAPI("300988ca-2d96-4177-b01c-e6cc7b41cb4f").then((respond) => {
      setUser(respond);
      console.log(new Intl.DateTimeFormat("en-US").format(respond.dateOfBirth));
      const genderInput = document.querySelectorAll("input[name=gender]");
      genderInput.forEach((item) => {
        console.log(item, respond.gender);
        if (respond.gender == item.value) {
          item.checked = true;
        }
      });
    });
  };

  //set user

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    control,
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    editUserAPI(data);

    navigate("/user");
  };

  return (
    <div>
      <h1 style={{ fontSize: "27px", color: "#cf2338", fontWeight: "750" }}>
        Create New User
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-3 mt-4">
        <div className="row mb-3">
          <label
            htmlFor="firstName"
            className="col-sm-3 col-form-label"
            style={{ fontSize: "20px" }}
          >
            First Name
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={user.firstName}
              id="firstName"
              disabled
              style={{ border: "3px solid #aaaaaa" }}
            ></input>
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="lastName"
            className="col-sm-3 col-form-label"
            style={{ fontSize: "20px" }}
          >
            Last Name
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={user.lastName}
              id="lastName"
              disabled
              style={{ border: "3px solid #aaaaaa" }}
            ></input>
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="dateOfBirth"
            className="col-sm-3 col-form-label"
            style={{ fontSize: "20px" }}
          >
            Date of Birth
          </label>
          <div className="col-sm-9">
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, value } }) => (
                <div className="position-relative">
                  <DatePicker
                    selected={value}
                    id="dateOfBirth"
                    dateFormat="dd/MM/yyyy"
                    value={new Intl.DateTimeFormat("en-GB").format(
                      user.dateOfBirth
                    )}
                    onChange={onChange}
                    className={`form-control ${
                      errors?.dateOfBirth?.message
                        ? "date-picker__error-message"
                        : "date-picker"
                    }`}
                    // {...register("dateofBirth")}
                  />
                  <label
                    htmlFor="dateOfBirth"
                    className="position-absolute"
                    style={{ right: "15px", top: "3px" }}
                  >
                    <i
                      className="bi bi-calendar-date-fill"
                      style={{ color: "#707070" }}
                    ></i>
                  </label>
                </div>
              )}
              rules={{
                required: "Date of birth is required!",
                validate: () => {
                  return GetAge(getValues("dateOfBirth")) >= 18
                    ? true
                    : "User is under 18. Please select a different date";
                },
              }}
            />
            <ErrorMessage
              errors={errors}
              name="dateOfBirth"
              render={({ message }) => (
                <p className="error-message">{message}</p>
              )}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="gender"
            className="col-sm-3 col-form-label"
            style={{ fontSize: "20px" }}
          >
            Gender
          </label>
          <div className="col-sm-9 d-flex" style={{ fontSize: "20px" }}>
            <div className="row align-self-center ms-1 radio-gender-group">
              <label className="container col-sm-4 me-5 my-0 ps-4">
                <input
                  type="radio"
                  value="Female"
                  id="radio1"
                  {...register("gender")}
                />
                <span className="checkmark"></span>
                <span>Female</span>
              </label>
              <label className="container col-sm-4 my-0 ps-4">
                <input
                  type="radio"
                  value="Male"
                  id="radio1"
                  {...register("gender")}
                />
                <span className="checkmark"></span>
                <span>Male</span>
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="joinedDate"
            className="col-sm-3 col-form-label"
            style={{ fontSize: "20px" }}
          >
            Joined Date
          </label>
          <div className="col-sm-9">
            <Controller
              control={control}
              name="joinedDate"
              render={({ field: { onChange, value } }) => (
                <div className="position-relative">
                  <DatePicker
                    selected={value}
                    id="joinedDate"
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    className={`form-control ${
                      errors?.joinedDate?.message
                        ? "date-picker__error-message"
                        : "date-picker"
                    }`}
                  />
                  <label
                    htmlFor="joinedDate"
                    className="position-absolute"
                    style={{ right: "15px", top: "3px" }}
                  >
                    <i
                      className="bi bi-calendar-date-fill"
                      style={{ color: "#707070" }}
                    ></i>
                  </label>
                </div>
              )}
              rules={{
                required: "Joined date is required",
                validate: () => {
                  if (getValues("dateOfBirth") > getValues("joinedDate"))
                    return "Joined date is not later than Date of Birth. Please select a different date";
                  if (
                    getValues("joinedDate").getDay() === 0 ||
                    getValues("joinedDate").getDay() === 6
                  )
                    return "Joined date is Saturday or Sunday. Please select a different date";
                  return true;
                },
              }}
            />
            <ErrorMessage
              errors={errors}
              name="joinedDate"
              render={({ message }) => (
                <p className="error-message">{message}</p>
              )}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="userType"
            className="col-sm-3 col-form-label"
            style={{ fontSize: "20px" }}
          >
            Type
          </label>
          <div className="col-sm-9">
            <div className="position-relative">
              <select
                className="form-control"
                id="userType"
                {...register("userType", { required: "User type is required" })}
                style={{ border: "3px solid #aaaaaa", appearance: "none" }}
              >
                <option selected={user.type === 1}>Admin</option>
                <option selected={user.type === 2}>Staff</option>
              </select>
              <label
                htmlFor="userType"
                className="position-absolute"
                style={{ right: "18px", top: "3px" }}
              >
                <i
                  className="bi bi-caret-down-fill"
                  style={{ fontSize: "16px", color: "#707070" }}
                ></i>
              </label>
            </div>
            <ErrorMessage
              errors={errors}
              name="userType"
              render={({ message }) => (
                <p className="error-message">{message}</p>
              )}
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-3"></div>
          <div className="col-sm-9 d-flex justify-content-end">
            <button // disabled={!isValid}
              type="submit"
              className="btn form-btn"
              onClick={() => {
                const values = getValues();
                console.log(values);
              }}
            >
              Save
            </button>
            <button
              type="button"
              className="btn form-btn ms-5"
              onClick={() => navigate("/user")}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
