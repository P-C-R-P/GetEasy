import 'dotenv/config';
import { useState, useCallback, memo, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 42.8757,
  lng: 74.6036
};


function Map({ a, b, setShowPopup, pickUpAddressSelected, setAddress }) {

  const [pointA, setPointA] = useState(a || {});
  const [pointB, setPointB] = useState(b || {});
  const [response, setResponse] = useState(null);
  const DirectionsServiceOption = {
    origin: pointA,
    destination: pointB,
    travelMode: "DRIVING",
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  function pickDestinations(e) {
    if (a) return;
    if (!pickUpAddressSelected) setPointA({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    else {
      setPointB(() => {
        const secondPint = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        setAddress([pointA, secondPint]);
        return secondPint;
      });
    }
    setShowPopup(true);
  }

  let count = useRef(0);
  const directionsCallback = (response) => {
    if (response !== null && count.current < 2) {
      if (response.status === "OK") {
        count.current += 1;
        setResponse(response);
      } else {
        count.current = 0;
        console.log("response: ", response);
      }
    }
  };

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={13}
        onClick={pickDestinations}
        center={center}
        onLoad={onMapLoad}
      >
        {
          pointB !== {} &&
          <>
            {
              response !== null && (
                <DirectionsRenderer
                  options={{
                    directions: response,
                    polylineOptions: {
                      strokeOpacity: 1,
                      strokeColor: '#FF0000',
                    },
                  }}
                />
              )
            }
            <DirectionsService
              options={DirectionsServiceOption}
              callback={directionsCallback}
            />
          </>
        }
        {
          Object.keys(pointB).length < 1 &&
          <Marker
            position={{
              lat: pointA.lat,
              lng: pointA.lng
            }} />
        }
      </GoogleMap>
    </>
  ) : <></>
}



export default memo(Map);

