import { useState } from 'react';
import './Coach.scss'
import Packageimg from '../../../components/Coach_comp/Package/Packages'
import BPackageimg from '../../../components/Coach_comp/Package/BPackage'
import Trainers from '../../../components/Coach_comp/Trainers/Trainers';
import { useNavigate, Link } from 'react-router-dom';


const Coach = () => {

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handlepay = (e) => {
    e.preventDefault();
    navigate('/DirectP');
  }

  //  data
  const initialFormData = {
    PACKAGES: "",
    phone: "",
    email: "",
    message: "",
    
    // img: [], // add imgs to formData to store multiple image urls
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      navigate('/DirectP', { state: formData });
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <div className="coach">
      {/* <img src="/img/C-bannder.png" alt="Banner Image" className="banner-image" /> */}
      <div className='coach'>
        <div className="header-container">
          <center>
            <h1>ONLINE COACHING</h1>
          </center>
        </div>
        <div className="button-container">
          <a href="#joinform"><button className="join_btn">JOIN</button></a>
          <Link to={'/CoachDetails'}><button className="learn_more_btn">COACHING DETAILS</button> </Link>
        </div>

        <center>
          <h1>MONTHLY SUBSCRIPTION</h1>
          <h5>ALL SUBSCRIPTIONS WILL INCLUDE A CUSTOMIZED TRAINING/MEAL PLAN</h5>

        </center>
        <div className="subsCribtionImg">

          <Packageimg />

        </div>


        <center>
          <h1>BUNDLED PACKAGES</h1>
          <h5>ALL BUNDLES WILL GIVE YOU A CUSTOMIZED TRAINING/MEAL PLAN</h5>
        </center>
        <div className="bundelImg">

          <BPackageimg />

        </div>


        <center>
          <h1 className='Specialized'>SPECIALIZED TRAINING PROGRAMS</h1>
        </center>
        <div>

          <Trainers />

        </div>


        <center className='discription_b'>
          <h1>WHY SELECT A BUNDLE?</h1>
          <h3>YOU MAKE A SAVING OF 15%</h3>
          <p>If you have a goal that requires several months of work, purchasing a bundle will be more cost effective.We’ve bundled the monthly subscriptions together by taking into account, the differences in experience people bring to the table and the difference in attention required as the the months go by. Significant physical and lifestyle changes often require a significant commitment, both in time and effort.</p>
        </center>


        <div id="joinform" className="join-form-container">
          <h2 class="elementor-heading-title">Interested</h2>
          <h2 class="elementor-joining ">in Joining?</h2>
          <div class="elementor-widget-container">
            <p><span >Submit your interest and we will WhatsApp you and get your set up &amp; payment process started..</span></p>
          </div>

          <form onSubmit={handleSubmit}>
            <label for="country">PACKAGES:</label>
            <select id="PACKAGES" name="PACKAGES" required onChange={handleInputChange}>
              <option value="">--Select PACKAGES--</option>
              <option value="MONTHLY SUBSCRIPTION">MONTHLY SUBSCRIPTION</option>
              <option value="BUNDLED PACKAGES">BUNDLED PACKAGES</option>
              <option value="SPECIALIZED TRAINING PROGRAMS">SPECIALIZED TRAINING PROGRAMS</option>

            </select>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="tel" placeholder="Whatsapp Number" id="phone" name="phone" required onChange={handleInputChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required onChange={handleInputChange} ></textarea>
            </div>
            <button type="submit" className="submit-btn">Pay Now</button>
          </form>
        </div>

      </div>

    </div>
  )
}

export default Coach
