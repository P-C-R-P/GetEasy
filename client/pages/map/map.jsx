import 'dotenv/config';
<<<<<<< HEAD
import { useState, useCallback, memo, useRef } from 'react';
=======
import { useState, useCallback, memo, useRef, React } from 'react';
>>>>>>> 9f21545718557878d5cc417cebb1b1beade8d51e
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 42.8757,
  lng: 74.6036,
};

<<<<<<< HEAD
function Map({
  a,
  b,
  setShowPopup,
  pickUpAddressSelected,
  dropOffAddressSelected,
  setAddresses,
  addresses,
}) {
=======
function Map ({ a, b, setShowPopup, pickUpAddressSelected, setAddresses }) {
>>>>>>> 9f21545718557878d5cc417cebb1b1beade8d51e
  const [pointA, setPointA] = useState(a || {});
  const [pointB, setPointB] = useState(b || {});
  const [response, setResponse] = useState(null);
  const DirectionsServiceOption = {
    origin: pointA,
    destination: pointB,
<<<<<<< HEAD
    travelMode: 'DRIVING',
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDYWEs65yBtu51Wd3DG9_DJbl0FaydXasY',
=======
    travelMode: 'DRIVING'
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY
>>>>>>> 9f21545718557878d5cc417cebb1b1beade8d51e
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

<<<<<<< HEAD
  function pickDestinations(event) {
=======
  function pickDestinations (event) {
    if (pointB.lat) return;
>>>>>>> 9f21545718557878d5cc417cebb1b1beade8d51e
    if (!pickUpAddressSelected) setPointA({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    else {
      setPointB({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      // setPointB(() => {
      //   const secondPoint = {
      //     lat: event.latLng.lat(),
      //     lng: event.latLng.lng(),
      //   };
      //   setAddresses([pointA, secondPoint]);
      //   return secondPoint;
      // });
    }
    setShowPopup(true);
    if (pickUpAddressSelected && dropOffAddressSelected) setAddresses([pointA, pointB]);
  }

  let count = useRef(0);
  const directionsCallback = (response) => {
    if (response !== null && count.current < 2) {
      if (response.status === 'OK') {
        count.current += 1;
        setResponse(response);
      } else {
        count.current = 0;
        console.log('Response: ', response);
      }
    }
  };

<<<<<<< HEAD
  return isLoaded ? (
    <>
      <GoogleMap
        id="maps"
        mapContainerStyle={containerStyle}
        zoom={13}
        onClick={pickDestinations}
        center={center}
        onLoad={onMapLoad}
      >
        {dropOffAddressSelected && (
          <>
            {response !== null && (
              <DirectionsRenderer
                options={{
                  directions: response,
                  polylineOptions: {
                    strokeOpacity: 1,
                    strokeColor: '#FF0000',
                  },
                }}
=======
  return isLoaded
    ? (
      <>
        <GoogleMap
          id="maps"
          mapContainerStyle={containerStyle}
          zoom={13}
          onClick={pickDestinations}
          center={center}
          onLoad={onMapLoad}
        >
          {pointB !== {} && (
            <>
              {response !== null && (
                <DirectionsRenderer
                  options={{
                    directions: response,
                    polylineOptions: {
                      strokeOpacity: 1,
                      strokeColor: '#FF0000'
                    }
                  }}
                />
              )}
              <DirectionsService
                options={DirectionsServiceOption}
                callback={directionsCallback}
>>>>>>> 9f21545718557878d5cc417cebb1b1beade8d51e
              />
            </>
          )}
          {Object.keys(pointA).length >= 1 && (
            <Marker
              position={{
                lat: pointA.lat,
                lng: pointA.lng
              }}
            />
<<<<<<< HEAD
          </>
        )}
        {Object.keys(pointA).length >= 1 && !dropOffAddressSelected && (
            <Marker
              position={{
                lat: pointA.lat,
                lng: pointA.lng,
              }}
            />
        )}
        {pickUpAddressSelected && !dropOffAddressSelected && (
            <Marker
              position={{
                lat: pointB.lat,
                lng: pointB.lng,
              }}
            />
          )}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
=======
          )}
          {Object.keys(pointB).length >= 1 && (
            <Marker
              position={{
                lat: pointB.lat,
                lng: pointB.lng
              }}
            />
          )}
        </GoogleMap>
      </>
      )
    : (
      <></>
      );
>>>>>>> 9f21545718557878d5cc417cebb1b1beade8d51e
}

export default memo(Map);
