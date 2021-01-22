import React, {Component} from "react";
import {GoogleMap, withScriptjs, withGoogleMap, Marker  } from "react-google-maps"
//import {GoogleMap, Marker, useLoadScript, } from "@react-google-maps/api";
import MapStyles from "./MapStyles"
import { Button } from "antd";

require('dotenv-defaults').config()

const mapContainerStyle = {
    height: "90vh",
    width: "45vw",
  };

const options = {
    styles: MapStyles,
    disableDefaultUI: true,
    zoomControl: true,
}


let center = {
    lat: "",
    lng: "",
  };

let nowLoc = {
    lat: "",
    lng: ""
};

function onMapClick(e){
    //console.log(e.latLng.lat())
    nowLoc = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
    }
    
}

function locOnClick(loc){
    center = {
        lat: parseFloat(loc.lat),
        lng: parseFloat(loc.lng)
    }
    console.log(center)
    WrappedMap = withScriptjs(withGoogleMap(map))
}

/*function map(){
    return(
        <GoogleMap 
            defaultZoom={16} 
            defaultCenter={{lat: 25.018, lng: 121.540}}
            options = {options}
            onClick = {(e)=>onMapClick(e)}
        >
            {busData.Buses.map((bus)=>(
                <Marker key={bus.PlateNumb} position={{lat:bus.BusPosition.PositionLat, lng:bus.BusPosition.PositionLon}}/>
            ))}
        </GoogleMap>
    )   
};*/

function map(){
    return(
        <GoogleMap 
            defaultZoom={16} 
            defaultCenter={{lat: (center.lat  ? center.lat : 25.018), lng: (center.lng  ? center.lng : 121.540)}}
            options = {options}
            onClick = {(e)=>onMapClick(e)}
        >
            <Marker key={nowLoc.lat} position={{lat:center.lat, lng:center.lng}}/>
        </GoogleMap>
    )   
};

let WrappedMap = withScriptjs(withGoogleMap(map))


/*export default function App() {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: "AIzaSyCF_WVOfafinjM09YWk4Wcp_zotxdN7jDQ",
      libraries,
    });
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    
  
    const onMapClick = React.useCallback((e) => {
      setMarkers((current) => [
        ...current,
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          time: new Date(),
        },
      ]);q
    }, []);
  
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
      mapRef.current = map;
    }, []);
  
    const panTo = React.useCallback(({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(14);
    }, []);
  
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
  
    return (
      <div>
  
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={16}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => (
            <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          ))}
        </GoogleMap>
      </div>
    );
}*/


export default class Map extends Component{
    constructor(props) {
        super(props)
        
        this.state = {
            nowLoc : nowLoc
        }
    }

    insertLoc(e){
        this.props.setNowLoc({
            lat: nowLoc.lat,
            lng: nowLoc.lng
        }) 
    }

    render(){
        if(this.props.isGoToAct === true){
            console.log(this.props.goTo)
            locOnClick(this.props.goTo)
            this.props.changeIsGoToAct()
        }
        return(
            <>
                <div onClick={(e)=>this.setState({})} className="mapContainer">
                    <WrappedMap googleMapURL ={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`} 
                        loadingElement={<div style={{ height: `100%` }}/>}
                        containerElement={<div style={{ height: `100%`, width: `100%`}} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />  
                </div>
                <Button type = "primary" onClick={(e)=>this.insertLoc(e)}>
                    Insert Location
                </Button>
            </>
        )
    }
}