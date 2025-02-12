import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

export default function MapSection({ formData, setFormData }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCE46OXa1TZgWdjl5gGvV-Vap-ONwdQN1s",
  });

  const [markerPosition, setMarkerPosition] = useState({
    lat: Number(formData?.lat) || 30.0444,
    lng: Number(formData?.lng) || 31.2357,
  });

  const [searchInput, setSearchInput] = useState("");
  const searchBox = useRef(null);

  useEffect(() => {
    if (formData?.lat && formData?.lng) {
      const position = {
        lat: Number(formData.lat),
        lng: Number(formData.lng),
      };
      setMarkerPosition(position);
      reverseGeocodeMarkerPosition(position);
    }
  }, [formData]);

  const handleMarkerDragEnd = (event) => {
    const newPos = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setMarkerPosition(newPos);
    setFormData({
      ...formData,
      lat: newPos.lat.toFixed(6),
      lng: newPos.lng.toFixed(6),
    });

    reverseGeocodeMarkerPosition(newPos);
  };

  const reverseGeocodeMarkerPosition = (position) => {
    if (!window.google || !window.google.maps) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: position }, (results, status) => {
      if (status === "OK" && results[0]) {
        setSearchInput(results[0].formatted_address);
      } else {
        console.error("Geocoder failed: " + status);
      }
    });
  };

  const handlePlaceSelect = () => {
    if (!searchBox.current) return;

    const places = searchBox.current.getPlaces();
    if (places && places.length > 0) {
      const selectedPlace = places[0];
      const position = {
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      };

      setMarkerPosition(position);
      setFormData({
        ...formData,
        lat: position.lat.toFixed(6),
        lng: position.lng.toFixed(6),
      });

      setSearchInput(selectedPlace.formatted_address || selectedPlace.name);
    }
  };

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "400px",
            borderRadius: "12px",
          }}
          zoom={10}
          center={markerPosition}
        >
          <Marker
            icon="/images/icons/map-pin.svg"
            position={markerPosition}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
          <StandaloneSearchBox
            onLoad={(ref) => (searchBox.current = ref)}
            onPlacesChanged={handlePlaceSelect}
          >
            <input
              type="search"
              placeholder="Search places..."
              className="mapSearchInput"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            />
          </StandaloneSearchBox>
        </GoogleMap>
      )}
    </div>
  );
}
