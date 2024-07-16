import axios from "axios";
import { Form } from "react-bootstrap/lib/Navbar";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

//this function add a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
  const fromData = new FormData();
  fromData.append("photo", photo);
  fromData.append("roomType", roomType);
  fromData.append("roomPrice", roomPrice);

  const response = await api.post("/rooms/add.new-room", formData);
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}

//this function gets all room types from the database

export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/roomtypes");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room types");
  }
}
