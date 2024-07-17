// src/components/utils/ApiFunctions.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

// this function adds a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  try {
    const response = await api.post("/rooms/add/new-room", formData);
    if (response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error adding room:", error);
    return false;
  }
}

// this function gets all room types from the database
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    console.error("Error fetching room types:", error.response || error);
    return [];
  }
}
