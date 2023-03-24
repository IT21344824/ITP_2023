import React from 'react';
import './Coach.scss'

const Coach = () => {
  return (
    <div className="coach">
      <div className='coach'>
        <div className="header-container">
          <center>
            <h1>ONLINE COACHING</h1>
          </center>
        </div>
        <div className="button-container">
          <a href="#joinform"><button className="join_btn">JOIN</button></a>
          <button className="learn_more_btn">COACHING DETAILS</button>
        </div>

        <center>
          <h1>MONTHLY SUBSCRIPTION</h1>
          <h5>ALL SUBSCRIPTIONS WILL INCLUDE A CUSTOMIZED TRAINING/MEAL PLAN</h5>

        </center>
        <div className="subsCribtionImg">
          <img decoding="async" width="520" height="174" src="https://alf.lk/wp-content/uploads/2022/10/Copy-of-RS.26550.png" class="elementor-animation-grow attachment-large size-large wp-image-51746" alt="" loading="lazy" srcset="https://alf.lk/wp-content/uploads/2022/10/Copy-of-RS.26550.png 520w, https://alf.lk/wp-content/uploads/2022/10/Copy-of-RS.26550-300x100.png 300w" sizes="(max-width: 520px) 100vw, 520px"></img>
          <img decoding="async" width="520" height="174" src="https://alf.lk/wp-content/uploads/2022/10/Copy-of-RS.26550.png" class="elementor-animation-grow attachment-large size-large wp-image-51746" alt="" loading="lazy" srcset="https://alf.lk/wp-content/uploads/2022/10/Copy-of-RS.26550.png 520w, https://alf.lk/wp-content/uploads/2022/10/Copy-of-RS.26550-300x100.png 300w" sizes="(max-width: 520px) 100vw, 520px"></img>
          <img decoding="async" width="520" height="174" src="https://alf.lk/wp-content/uploads/2022/10/Copy-of-RS.26550.png" class="elementor-animation-grow attachment-large size-large wp-image-51746" alt="" loading="lazy" srcset="https://alf.lk/wp-content/uploads/2022/10/Copy-of-RS.26550.png 520w, https://alf.lk/wp-content/uploads/2022/10/Copy-of-RS.26550-300x100.png 300w" sizes="(max-width: 520px) 100vw, 520px"></img>
        </div>
        <center>
          <h1>BUNDLED PACKAGES</h1>
          <h5>ALL BUNDLES WILL GIVE YOU A CUSTOMIZED TRAINING/MEAL PLAN</h5>
        </center>
        <img decoding="async" width="462" height="329" src="https://alf.lk/wp-content/uploads/2022/07/rookie-bundle.png" class="elementor-animation-grow attachment-large size-large wp-image-51405" alt="" loading="lazy" srcset="https://alf.lk/wp-content/uploads/2022/07/rookie-bundle.png 462w, https://alf.lk/wp-content/uploads/2022/07/rookie-bundle-300x214.png 300w" sizes="(max-width: 462px) 100vw, 462px"></img>
        <img decoding="async" width="462" height="329" src="https://alf.lk/wp-content/uploads/2022/07/rookie-bundle.png" class="elementor-animation-grow attachment-large size-large wp-image-51405" alt="" loading="lazy" srcset="https://alf.lk/wp-content/uploads/2022/07/rookie-bundle.png 462w, https://alf.lk/wp-content/uploads/2022/07/rookie-bundle-300x214.png 300w" sizes="(max-width: 462px) 100vw, 462px"></img>
        <img decoding="async" width="462" height="329" src="https://alf.lk/wp-content/uploads/2022/07/rookie-bundle.png" class="elementor-animation-grow attachment-large size-large wp-image-51405" alt="" loading="lazy" srcset="https://alf.lk/wp-content/uploads/2022/07/rookie-bundle.png 462w, https://alf.lk/wp-content/uploads/2022/07/rookie-bundle-300x214.png 300w" sizes="(max-width: 462px) 100vw, 462px"></img>
        <img decoding="async" width="462" height="329" src="https://alf.lk/wp-content/uploads/2022/07/rookie-bundle.png" class="elementor-animation-grow attachment-large size-large wp-image-51405" alt="" loading="lazy" srcset="https://alf.lk/wp-content/uploads/2022/07/rookie-bundle.png 462w, https://alf.lk/wp-content/uploads/2022/07/rookie-bundle-300x214.png 300w" sizes="(max-width: 462px) 100vw, 462px"></img>

        <center>
          <h1>WHY SELECT A BUNDLE?</h1>
          <h3>YOU MAKE A SAVING OF 15%</h3>
          <p>If you have a goal that requires several months of work, purchasing a bundle will be more cost effective.We’ve bundled the monthly subscriptions together by taking into account, the differences in experience people bring to the table and the difference in attention required as the the months go by. Significant physical and lifestyle changes often require a significant commitment, both in time and effort.</p>
        </center>


        <div id="joinform" className="join-form-container">
          <h2>Join Now!</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>

      </div>

    </div>
  )
}

export default Coach
