import React from 'react';
import './App.css';
import {useState} from "react"
import Axios from "axios";
import SearchIcon from '@material-ui/icons/Search';


function App() {
    const [ip, setIp] = useState("")
    const [site, setSite] = useState("")
    const [id, setId] = useState('')
    const [ipSiteList, setIpSiteList] = useState([])
    const [filterData, setFilterData] = useState([])
    const isEmpty = Object.keys(ipSiteList).length === 0


    const resolve = () => {
        console.log(ip)
        if (ip === "" || site === "")
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
        Axios.put("http://localhost:3001/update", {})
    }
    const Delete = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
           /* setIpSiteList(ipSiteList.filter((val) => {
                return val.id != id
            }))*/
            setIpSiteList(response.data)
        })
    }
    const checkEmpty = () => {
        if (!isEmpty)
            return (
                <tr>
                    <th>IP address</th>
                    <th>Host name</th>
                    <th>Want to Update or Delete?</th>
                </tr>
            )}
        const handleChange = (event) => {
            const searchWord = event.target.value
            Axios.get("http://localhost:3001/show").then((response) => {
                setFilterData(response.data)

            })


        }



    return (
        <div>
            <div className="change">
                <div className="searchBar">
                    <input type="text" placeholder="Search.." name="search" className="searchInp"
                           onChange={handleChange}/>
                    <button className="searchBtn">
                        <SearchIcon className="searchIcon"/>
                    </button>

                </div>
                { setFilterData.length != 0 && (
                    <div className = "searchBar">

                        {filterData.map((value, key) => {
                            return (<p> {value.site} </p>
                            )
                        })
                        }
                    </div>
                )
                }



                <h1>DNS Resolver</h1>

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
                    <button onClick={resolve} className="btn">Resolve</button>
                    <button onClick={show} className="btn">Show</button>
                </div>
            </div>

            <table>
                {checkEmpty()}

                {ipSiteList.map((val, key) => {
                    return (
                        <tr key={key} className="txt">
                            <td>{val.ip}</td>
                            <td>{val.site}</td>
                            <button onClick={update} className="btn">update</button>
                            <button onClick={() => {
                                Delete(val.id)
                            }} className="btn">Delete
                            </button>
                        </tr>

                    )
                })}
            </table>


        </div>
    );
}

export default App;
