// import React from 'react'
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/User_comp/table/Table";
import Widget from "../../components/widget/Widget";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar/>
      <div className="homeContainer"> 

        <Navbar/>
        <hr />
       
       <div className="widgets">
          <Widget type="user" />
          <Widget type="product" />
          <Widget type="coaches" />
          <Widget type="members" />

       </div>

       <div className="charts">
          <Featured/>
          <Chart title="Last 6 Months ( Members Attendence )" aspect={2/1}/>


       </div>

       <div className="listContainer">
        <div className="listTitle"> Latest Members </div>
        {/* This is  dashboard table */}<Table/>
       </div>


      </div>
    </div>
  )
}

export default Home
