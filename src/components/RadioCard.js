import React from 'react'
import {Card} from 'antd';

const gridStyle = {
    width: '50%',
    textAlign: 'center',
};
  
const RadioCard = ({name,country,language,votes,bitrate}) => {
    return (
        <Card key={name} title={name.substring(0,30)} className="mycard" style={{height:'fit-content'}}>
             <Card.Grid style={gridStyle}>{!country?'NA':country.substring(0,20)}</Card.Grid>
             <Card.Grid style={gridStyle}>{!language?'NA':language.substring(0,20)} </Card.Grid>
             <Card.Grid style={gridStyle}>Votes {!votes?'NA ':votes}</Card.Grid>
             <Card.Grid style={gridStyle}>Rate {!bitrate?'NA ':bitrate}kbps</Card.Grid>

        </Card>
    )
}

export default RadioCard
