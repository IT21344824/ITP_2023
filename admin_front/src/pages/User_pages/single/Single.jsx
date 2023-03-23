import "./single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import List from "../../../components/table/Table";

const Single = () => {
  return (
    <div className="single">
       <Sidebar/>
        <div className="singleContainer">
          <Navbar/>
            <div className="top">
              <div className="left">
                  <div className="editbutton"> Edit </div>

                     <h1 className="title"> Information </h1>

                  <div className="item"> 

                   <img src="https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg"
                    alt="" className="itemImg" /> 
                    
                      <div className="details">

                        <h1 className="itemTitle"> akidu ekanayake </h1>

                        <div className="detailItem">
                          <span className="itemKey"> Email </span>
                          <span className="itemValue"> sadaff@gmail,com </span>
                          
                        </div>
                        <div className="detailItem">
                          <span className="itemKey"> Phone </span>
                          <span className="itemValue"> +43653634637 </span>
                         
                        </div>
                        <div className="detailItem">
                          <span className="itemKey"> Address </span>
                          <span className="itemValue"> 37 f kappale watta. gangoda. pilimathalawa </span>
                          
                        </div>
                        <div className="detailItem">
                          <span className="itemKey"> Status </span>
                          <span className="itemValue"> member </span>
                          
                        </div>
                      </div>
                  </div>
              </div>

              <div className="right">
              <Chart aspect={3/1} title="user attendence ( Last 6 Months )"/>
              </div>
                
            </div>
            <div className="bottom">

              <h1 className="title"> Last Transactions </h1>
              <List/>
            </div>
        </div>
    </div>
  )
}

export default Single
