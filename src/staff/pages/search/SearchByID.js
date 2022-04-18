import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import StaffNavBar from "../../components/StaffNavBar";
import * as FaIcons from "react-icons/fa";

const SearchByID = () => {
  const navigate = useNavigate();
  const API_URL = "http://192.168.192.31:3000/";
  const [myUser, setMyUser] = useState("");
  const [itemID, setItemID] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setMyUser(localStorage.getItem("user"));
    }
  }, []);

  // need this function to format the date for parameters in the check in routes
  // check in requires a parameter called "checkin"
  // It will need to be formatted as follows: YYYY-MM-DD HH:MM:SS
  function formatDate(date) {
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = date.getFullYear();
    function checkTime(i) {
      return i < 10 ? "0" + i : i;
    }
    date =
      yyyy +
      "-" +
      mm +
      "-" +
      dd +
      " " +
      checkTime(date.getHours()) +
      ":" +
      checkTime(date.getMinutes()) +
      ":" +
      checkTime(date.getSeconds());
    return date;
  }

  // checkin will use two endpoints:
  // - borrower_contents/item/reservation/ (1)
  // - borrower_contents/checkin (2)
  // We will use (1) to get the reservationID, which is a
  // required parameter for (2)
  const checkin = async (e) => {
    e.preventDefault();
    console.log("checking in item: " + itemID);
    const result = await fetch(
      API_URL + "borrower_contents/item/reservation/" + itemID
    );
    if (result.ok) {
      let respond = await result.json();
      let reservationID = respond.borrower_contents[0].reservationID;
      let checkin = formatDate(new Date());
      let conditionID = 1;
      const instance = {
        reservationID,
        itemID: parseInt(itemID),
        checkin,
        conditionID,
      };
      console.log(JSON.stringify(instance));
      const patchCmd = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(instance),
      };
      const response = await fetch(
        API_URL + "borrower_contents/checkin",
        patchCmd
      );
      if (response.ok) {
        alert("Reservation matched. Item: " + itemID + " checked in");
        navigate("/staff/checkin/searchbyid");
      }
    }
  };

  return (
    <>
      <StaffNavBar />
      <div className="mainContainerRight">
        <div style={{ padding: "50px" }}>
          <h3>Enter Item ID</h3>
          <form className="input-group" onSubmit={checkin}>
            <input
              type="text"
              className="form-control rounded"
              placeholder="Enter ID"
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={(e) => setItemID(e.target.value)}
            />
            <button type="submit" className="btn btn-dark">
              Check in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchByID;
