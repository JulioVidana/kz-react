import React, { useState } from 'react';
import { Map, Popup, TileLayer, Circle } from 'react-leaflet';
import { Card } from '@material-ui/core'
import './mapa.css'



const MapaView = (props) => {
    const [coloniaActiva, setColoniaActiva] = useState(null);
    const getRadio = (total) => {
        return total >= 1000 ? 600 :
            total >= 500 ? 400 :
                total >= 100 ? 300 :
                    total >= 50 ? 200 :
                        total > 10 ? 100 :
                            50;
    }
    /* const getColor = (x) => {
        return x >= 6.5 ? "#808080" :
            x >= 6 ? "#FF0000" :
                x >= 5.5 ? "#FF5500" :
                    x >= 5 ? "#FFAA00" :
                        x >= 4.5 ? "#FFFF00" :
                            x >= 4 ? "#FFFF80" :
                                "#808080";
    } */
    //console.log(props.mapeo);
    //props.mapeo.length != 0 ? console.log('hola', Math.log(2, 16)) : console.log(props.mapeo.length)

    return (
        <Card>
            <Map center={[29.092466, -110.980490]} zoom={12.5}>
                <TileLayer
                    attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
                    url='https://api.mapbox.com/styles/v1/julyzon/ckf8un7780fta19o0j1onuywv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoianVseXpvbiIsImEiOiJja2Y4dXdsbWMwZnlyMnVvNzNoNDV0Z3NkIn0.NW6CpMCBL0WKph_d6GiSNA'
                />
                {

                    props.mapeo.map(colonia => (

                        <Circle key={colonia._id}
                            center={[colonia.datosColonia[0].latitud, colonia.datosColonia[0].longitud]}
                            color='red'
                            fillColor='red'
                            fillOpacity={0.8}

                            radius={getRadio(colonia.total)}
                            onclick={() => {
                                setColoniaActiva(colonia);
                            }}
                        />
                    ))}
                {coloniaActiva && (
                    <Popup position={[
                        coloniaActiva.datosColonia[0].latitud, coloniaActiva.datosColonia[0].longitud
                    ]}
                        onClose={() => {
                            setColoniaActiva(null);
                        }}>
                        <div>
                            <h2>{coloniaActiva._id}</h2>
                            <h3>APOYOS: {coloniaActiva.total}</h3>
                            {/* <ul>
                                {
                                    coloniaActiva.apoyos.map(item => (
                                        <li key={item}>{item}</li>
                                    ))
                                }

                            </ul> */}
                        </div>
                    </Popup>
                )}
            </Map>
        </Card>
    )
}

export default MapaView
