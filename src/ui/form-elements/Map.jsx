import { useState, useEffect } from "react";
import GoogleMaps from "./../cards/GoogleMaps";

const MapSection = ({
  formData,
  setFormData,
  title,
  target,
  setSearchedPlace,
  showLocationFirst,
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyD_N1k4WKCdiZqCIjjgO0aaKz1Y19JqYqw";
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="map-section">
      <h6>{title}</h6>
      <div className="row">
        <div className="col-12 p-0 mb-2">
          <div className="map">
            {mapLoaded && (
              <GoogleMaps
                target={target}
                formData={formData}
                setFormData={setFormData}
                setSearchedPlace={setSearchedPlace}
                showLocationFirst={showLocationFirst}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
