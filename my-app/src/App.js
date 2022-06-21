import React from 'react';
import './App.css';
import {useState} from "react"
import Axios from "axios";



function App(){
    const [ip, setIp] = useState("")
    const [site, setSite] = useState("")
    const [ipSiteList, setIpSiteList] = useState([])

    const resolve = () => {
        console.log(ip)
        if (ip==="" || site==="")
            alert("IP and Site cannot be empty")
        else
            Axios.post("http://localhost:3001/create", {ip: ip, site: site}).then(() => {
            console.log("Successful Insertion")
        })
    }
    const show = () => {

        Axios.get("http://localhost:3001/show").then((response) => {
            setIpSiteList(response.data)
        })
    }

    const update = () => {
        Axios.put("http://localhost:3001/update",{})
    }

    return (
        <div>
        <div className="change">
            <h1> DNS Resolver </h1>
            <div>
                <label>IP address</label>
                <input
                    type="text"
                    className="box"
                    onChange={(event) => {
                        setIp(event.target.value)
                    }}/>
                <label>Host link</label>
                <input
                    type="text"
                    className="box"
                    onChange={(event) => {
                        setSite(event.target.value)
                    }}/>

            </div>
            <div>
                <button onClick={resolve} className="btn"> Resolve </button>
                <button onClick={show} className ="btn"> Show </button>
            </div>
        </div >
            <div >
                <table id = "data">
                    <tr>
                        <th >IP address</th>
                        <th>Host name</th>

                    </tr>
                    {ipSiteList.map((val,key)=>{
                        return (
                            <tr key={key} class = "txt">
                                <td>{val.ip}</td>
                                <td>{val.site}</td>
                                <button onClick={update} className = "btn">update</button>
                            </tr>

                        )
                    })}
                </table>




            </div>
        </div>
    );
}

export default App;
