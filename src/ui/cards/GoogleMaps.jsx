import { useState, useRef, useEffect } from "react";
import { GoogleMap, Marker, StandaloneSearchBox } from "@react-google-maps/api";

export default function GoogleMaps({
  formData,
  setFormData,
  setSearchedPlace,
  target,
  showLocationFirst,
}) {
  const [markerPosition, setMarkerPosition] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const searchBox = useRef(null);

  useEffect(() => {
    if (showLocationFirst) {
      if (formData?.[target]) {
        reverseGeocodeMarkerPosition({
          lat: Number(formData?.[target]?.lat),
          lng: Number(target?.[target]?.lng),
        });
      }
      reverseGeocodeMarkerPosition({
        lat: Number(formData.lat),
        lng: Number(formData.lng),
      });
    }

    if (target) {
      setMarkerPosition({
        lat: Number(formData?.[target]?.lat),
        lng: Number(formData?.[target]?.lng),
      });
    } else {
      setMarkerPosition({
        lat: Number(formData.lat),
        lng: Number(formData.lng),
      });
    }
    reverseGeocodeMarkerPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, target]);

  const handleMarkerDragEnd = (coord) => {
    setMarkerPosition(coord);
    if (target) {
      setFormData({
        ...formData,
        [target]: {
          lat: coord.lat.toFixed(6),
          lng: coord.lng.toFixed(6),
        },
      });
    } else {
      setFormData({
        ...formData,
        lat: coord.lat.toFixed(6),
        lng: coord.lng.toFixed(6),
      });
    }
    console.log(coord);
    reverseGeocodeMarkerPosition(coord);
  };

  const reverseGeocodeMarkerPosition = (position) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: position }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          setSearchInput(results[0].formatted_address);
          setSearchedPlace(results[0].formatted_address);
        } else {
          console.error("No results found");
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  const handlePlaceSelect = () => {
    const places = searchBox.current.getPlaces();
    if (places.length > 0) {
      const selectedPlace = places[0];
      const position = {
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      };
      setMarkerPosition(position);
      if (target) {
        setFormData({
          ...formData,
          [target]: {
            lat: position.lat.toFixed(6),
            lng: position.lng.toFixed(6),
          },
        });
      } else {
        setFormData({
          ...formData,
          lat: position.lat.toFixed(6),
          lng: position.lng.toFixed(6),
        });
      }
      setSearchInput(selectedPlace.name);
      setSearchedPlace(selectedPlace.name);
    }
  };
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleSearchInputKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
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
        onDragEnd={(e) => {
          handleMarkerDragEnd({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });
        }}
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
          onChange={handleInputChange}
          onKeyDown={handleSearchInputKeyPress}
        />
      </StandaloneSearchBox>
    </GoogleMap>
  );
}