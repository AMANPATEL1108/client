// src/components/common/RoomTypeSelector.jsx
import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        console.log("Fetching room types...");
        setIsLoading(true);
        setError(null);
        const data = await getRoomTypes();
        console.log("Received room types:", data);
        setRoomTypes(data);
      } catch (error) {
        console.error("Failed to fetch room types:", error);
        setError(`Failed to load room types. Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomTypes();
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType.trim() !== "") {
      const updatedRoomTypes = [...roomTypes, newRoomType.trim()];
      setRoomTypes(updatedRoomTypes);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
      handleRoomInputChange({
        target: { name: "roomType", value: newRoomType.trim() },
      });
    }
  };

  if (error) {
    return (
      <div>
        <div className="alert alert-danger">{error}</div>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <select
        id="roomType"
        name="roomType"
        value={newRoom.roomType}
        onChange={(e) => {
          if (e.target.value === "Add New") {
            setShowNewRoomTypeInput(true);
          } else {
            handleRoomInputChange(e);
          }
        }}
        className="form-select"
      >
        <option value="">Select a room type</option>
        <option value="Add New">Add New</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>

      {showNewRoomTypeInput && (
        <div className="input-group mt-3">
          <input
            className="form-control"
            type="text"
            placeholder="Enter a new room type"
            value={newRoomType}
            onChange={handleNewRoomTypeInputChange}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAddNewRoomType}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomTypeSelector;
