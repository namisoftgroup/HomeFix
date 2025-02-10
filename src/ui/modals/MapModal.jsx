import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import GoogleMaps from "./../cards/GoogleMaps";

const MapModal = ({
  showModal,
  setShowModal,
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
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAWMY8itemJGU-hYW5EQEUxICphzKgNKoA&libraries=places&callback=initMap";
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>{title}</h6>
      </Modal.Header>
      <Modal.Body>
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
          <div className="col-12 p-0">
            <Button onClick={() => setShowModal(false)}>Confirm</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MapModal;