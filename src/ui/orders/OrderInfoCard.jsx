import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Card } from "react-bootstrap";

export default function OrderInfoCard({ orderDetails }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  return (
    <div className="order-info-card">
      <div className="details p-3">
        <Card className="orderInfo technical">
          <div className="order-header">
            <div className="order-info">
              <div className="order-id w-100">
                <img
                  src="/icons/code.svg"
                  alt="Order Icon"
                  className="order-icon"
                />
                <p>#{orderDetails?.code}</p>
              </div>

              <p>
                <i className="fa-regular fa-calendar"></i> {orderDetails?.date}
              </p>

              <p>
                <i className="fa-regular fa-clock"></i> {orderDetails?.time}
              </p>

              <p className="w-100">
                <i className="fa-solid fa-location-dot"></i>{" "}
                {orderDetails?.address}
              </p>
            </div>
          </div>

          <div className="mapPlaceholder">
            {isLoaded ? (
              <GoogleMap
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                  disableDefaultUI: true,
                  clickableIcons: false,
                  gestureHandling: "greedy",
                }}
                zoom={16}
                center={{
                  lat: orderDetails?.latitude,
                  lng: orderDetails?.longitude,
                }}
                mapContainerStyle={{ width: "100%", height: "100%" }}
              >
                <Marker
                  icon="/images/map-pin.svg"
                  position={{
                    lat: orderDetails?.latitude,
                    lng: orderDetails?.longitude,
                  }}
                />
              </GoogleMap>
            ) : (
              <div className="map_loader">
                <i className="fa-regular fa-spinner fa-spin"></i>
              </div>
            )}
          </div>

          <div className="imagesRow">
            {orderDetails?.order_files?.map((file) => (
              <img
                src={file?.file}
                alt={file?.id}
                className="orderImage"
                key={file?.id}
              />
            ))}
          </div>

          <p className="order-description">{orderDetails?.description}</p>

          <div className="audioSection">
            {orderDetails?.voice && (
              <audio src={orderDetails?.voice} controls></audio>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
