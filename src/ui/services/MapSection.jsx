import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function MapSection({ formData, setFormData }) {
  const { t } = useTranslation();
  const searchBox = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [searchInput, setSearchInput] = useState("");
  const [markerPosition, setMarkerPosition] = useState({
    lat: formData.latitude ? Number(formData.latitude) : 0,
    lng: formData.longitude ? Number(formData.longitude) : 0,
  });

  useEffect(() => {
    if (formData?.latitude && formData?.longitude) {
      setMarkerPosition({
        lat: Number(formData.latitude),
        lng: Number(formData.longitude),
      });
      reverseGeocodeMarkerPosition({
        lat: Number(formData.latitude),
        lng: Number(formData.longitude),
      });
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setMarkerPosition(userPosition);
            setFormData({
              ...formData,
              latitude: userPosition.lat.toFixed(6),
              longitude: userPosition.lng.toFixed(6),
            });
            reverseGeocodeMarkerPosition(userPosition);
          },
          (error) => console.error("Error getting location:", error),
          { enableHighAccuracy: true }
        );
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleMarkerDragEnd = (event) => {
    const newPos = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setMarkerPosition(newPos);
    setFormData({
      ...formData,
      latitude: newPos.lat.toFixed(6),
      longitude: newPos.lng.toFixed(6),
      address: searchInput,
    });

    reverseGeocodeMarkerPosition(newPos);
  };

  const reverseGeocodeMarkerPosition = (position) => {
    if (!window.google || !window.google.maps) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: position }, (results, status) => {
      if (status === "OK" && results[0]) {
        setSearchInput(results[0].formatted_address);
        setFormData((prev) => ({
          ...prev,
          address: results[0].formatted_address,
        }));
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
        latitude: position.lat.toFixed(6),
        longitude: position.lng.toFixed(6),
        address: selectedPlace.formatted_address || selectedPlace.name,
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
            height: "350px",
            borderRadius: "12px",
          }}
          zoom={15}
          center={markerPosition}
        >
          <Marker
            icon="/images/map-pin.svg"
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
              placeholder={t("searchPlaces")}
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
