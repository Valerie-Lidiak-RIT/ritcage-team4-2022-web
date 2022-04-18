import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./pages/login/login";
import Home from "./pages/userindex/Home";
import Reservation from "./pages/reservation/Reservation";
import Checkout from "./pages/shoppingcart/Checkout";
import Kit from "./pages/kit/Kit";
import CreateKit from "./pages/kit/CreateKit";
import ViewKit from "./pages/kit/ViewKit";
import SearchResults from "./pages/usersearch/SearchResults";
import StaffLogin from "./staff/pages/login/StaffLogin";
import StaffDashboard from "./staff/pages/dashboard/StaffDashboard";
import StaffCheckIn from "./staff/pages/checkin/StaffCheckIn";
import StaffCart from "./staff/pages/cart/StaffCart";
import StaffReservation from "./staff/pages/reservation/StaffReservation";
import StaffKit from "./staff/pages/kit/StaffKit";
import StaffCreateKit from "./staff/pages/kit/StaffCreateKit";
import StaffViewKit from "./staff/pages/kit/StaffViewKit";
import Inventory from "./staff/pages/inventory/Inventory";
import SearchByID from "./staff/pages/search/SearchByID";
import StaffReport from "./staff/pages/report/StaffReport";
import AddItem from "./staff/pages/inventory/AddItem";
import AddItemType from "./staff/pages/inventory/AddItemType";
import ViewItem from "./staff/pages/inventory/ViewItem";
import ItemDetails from "./pages/usersearch/ItemDetails";
import StaffCheckOut from "./staff/pages/checkout/StaffCheckOut";

function App() {
  const API_URL = "http://192.168.192.31:3000/item_types";
  const [itemTypes, setItemTypes] = useState([]);
  
  // Query the api call to get item from inventory, set the itemType array
  useEffect(() => {
    const loadTypes = async () => {
      let result = await fetch(API_URL);
      if (!result.ok) throw Error("Unable to get item types");
      let res = await result.json();
      console.log(res.item_type);
      setItemTypes(res.item_type);
      
      // set localStorage just incase the query failed next time
      if (!localStorage.getItem("all-items", JSON.stringify(res.item_type))) {
        localStorage.setItem("all-items", JSON.stringify(res.item_type));
      }
      if (localStorage.getItem("all-items", JSON.stringify(res.item_type))) {
        localStorage.removeItem("all-items");
        localStorage.setItem("all-items", JSON.stringify(res.item_type));
      }
    };
    loadTypes();
  }, []);
  
  // Create empty useState to store in values
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    // We need to ignore lowercase, and we just filter based of the itemType array
    // itemType array was set earlier when we query all the iventory items above
    const filteredResults = itemTypes.filter((itemType) =>
      itemType.model.toLowerCase().includes(search.toLowerCase())
    );

    // We want to show the newest item that got added (last to first view)
    // else, we could just set it as filterResults without using reverse(),
    // but it would means the viewer will view from first to last
    setSearchResults(filteredResults.reverse());
  }, [itemTypes, search]);

  return (
    <div className="App">
      <main className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Home />} />
          <Route
            path="/search"
            element={
              <SearchResults
                itemTypes={searchResults}
                search={search}
                setSearch={setSearch}
              />
            }
          />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/cart" element={<Checkout />} />
          <Route path="/kit" element={<Kit />} />
          <Route path="/createkit" element={<CreateKit />} />
          <Route path="/kit/viewkit/:id" element={<ViewKit />} />
          <Route path="/search/viewitem/:id" element={<ItemDetails />} />

          {/* 
            Staff section 
            - StaffLogin: Staff Login Page
            - StaffDashboard: Staff Home Page
            - StaffCheckOut: Check Out
            - StaffCheckIn: Check In
            - StaffReservation: List of all users (faculty and student) reservations
            - StaffKit: View List of Kits and Create Kit, including adding items to Kit
            - Inventory: Inventory Management, able to view/add items
          */}
          <Route path="/staff" element={<StaffLogin />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/checkout" element={<StaffCheckOut />} />
          <Route path="/staff/checkin" element={<StaffCheckIn />} />
          <Route path="/staff/cart" element={<StaffCart />} />
          <Route path="/staff/reservation" element={<StaffReservation />} />
          <Route path="/staff/kit" element={<StaffKit />} />
          <Route
            path="/staff/kit/staffcreatekit"
            element={<StaffCreateKit />}
          />
          <Route
            path="/staff/kit/staffviewkit/:id"
            element={<StaffViewKit />}
          />

          <Route
            path="/staff/inventory"
            element={
              <Inventory
                itemTypes={searchResults}
                search={search}
                setSearch={setSearch}
              />
            }
          />
          <Route path="/staff/checkin/searchbyid" element={<SearchByID />} />
          <Route path="/staff/report" element={<StaffReport />} />
          <Route path="/staff/inventory/addItem" element={<AddItem />} />
          <Route
            path="/staff/inventory/addItemType"
            element={<AddItemType />}
          />
          <Route path="/staff/inventory/viewitem/:id" element={<ViewItem />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
