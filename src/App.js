import React, { useState } from "react";
import { useEffect } from "react";
import redPoint from './img/redPoint_10.png'
import bluePoint from './img/bluePoint_10.png'

const { Tmapv2 } = window;

const App = () => {
  //임의의 좌표값
  var nowLat = 37.8191621
  var nowLng = 127.1007697

  const [currentLocation, setCurrentLocation] = useState(null)

  //지도 띄우기
  const initMap = () => {
    const mapDiv = document.getElementById("map_div");

    if (!mapDiv.children.length) {
      var map = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng((nowLat+37.8386259)/2, (nowLng+127.0834541)/2),
        width: "100%",
        height: "400px",
        zoom: 14,
        zoomControl: true,
        scrollwheel: true,
      });
    }

    //현재위치 불러와 값 저장

      navigator.geolocation.getCurrentPosition((position) => {
        var myLat = position.coords.latitude;
        var myLng = position.coords.longitude;

        var myLoc = new Tmapv2.LatLng(myLat, myLng);

        console.log(myLoc)

        getCurrentPosition(myLoc)
      });
    
    const getCurrentPosition = (myLoc) =>{
      console.log("가져왔어", myLoc._lat, myLoc._lng)
      var marker_me = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(myLoc._lat, myLoc._lng),
        map: map,
        icon: redPoint
      })
      return marker_me
    }
    
    // navigator.geolocation.getCurrentPosition((position) => {
    //   (myLat = position.coords.latitude), (myLng = position.coords.longitude);

    //   console.log(myLat, myLng);
    // });

    //마커 찍기
    const addMarker = (status, lat, lng) => {
      var imgURL;
      switch (status) {
        case "Start":
          imgURL = bluePoint;
          break;
        case "Pass":
          imgURL = redPoint;
          break;
        case "End":
          imgURL = redPoint;
          break;
        default:
      }

      // if((status = "Me")) {
      //   var marker_me = new Tmapv2.LatLng(myLat, myLng)
      // }

      if ((status = "Start")) {
        var marker_s = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(lat, lng),
          icon: imgURL,
          map: map,
        });
        return marker_s;
      } else if ((status = "End")) {
        var marker_e = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(lat, lng),
          icon: imgURL,
          map: map,
        });
        return marker_e;
      } else if ((status = "Pass")) {
        var marker_p = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(lat, lng),
          icon: imgURL,
          map: map,
        });
        return marker_p;
      }
    };

    addMarker("Start", nowLat, nowLng);
    addMarker("End", 37.8386259, 127.0834541);
    addMarker("Me");
  };

  //마운트 시, 한 번 실행
  useEffect(() => {
    initMap();
  }, []);

  return (
    <div id="map_div" className="sh_map">
      지도
    </div>
  );
};

export default App;