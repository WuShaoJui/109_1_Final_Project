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