import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Card } from "react-bootstrap";

export default function OrderInfo({ orderDetails }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  return (
    <div className="details p-3">
      <Card className="orderInfo">
        <div className="order-header">
          <span className="order-category">
            <img
              src={orderDetails?.service?.image}
              alt={orderDetails?.service?.title}
              className="category-icon"
            />
            {orderDetails?.service?.title}
          </span>
          <div className="order-id">
            <p>#{orderDetails?.code}</p>
            <img
              src="/icons/code.svg"
              alt="Order Icon"
              className="order-icon"
            />
          </div>
        </div>

        <p className="order-location">
          <i className="fa-solid fa-location-dot mx-1"></i>
          {orderDetails?.address}
        </p>

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
                icon="/public/images/map-pin.svg"
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
          {orderDetails?.voice && <audio src={orderDetails?.voice} controls></audio>}
        </div>
      </Card>
    </div>
  );
}
