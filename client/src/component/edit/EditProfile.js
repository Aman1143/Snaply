import React from 'react'
import './EditProfile.css'
import avatar from '../../image/avatar.png'


const EditProfile = () => {
	return (
		<>
			<div class="formbold-main-wrapper">
				<div class="formbold-form-wrapper">
					<form >
						<div class="formbold-input-flex">
							<div>
								<label for="firstname" class="formbold-form-label">
									First name
								</label>
								<input
									type="text"
									name="firstname"
									id="firstname"
									class="formbold-form-input"
								/>
							</div>
							<div>
								<label for="lastname" class="formbold-form-label"> Last name </label>
								<input
									type="text"
									name="lastname"
									id="lastname"
									class="formbold-form-input"
								/>
							</div>
						</div>
						<div class="formbold-mb-3">
							<label for="address" class="formbold-form-label">
								Bio
							</label>
							<input
								type="text"
								name="address"
								id="address"
								class="formbold-form-input"
							/>
						</div>
						<div class="formbold-input-flex">
							<div>
								<label for="state" class="formbold-form-label">YouTube</label>
								<input
									type="url"
									name="youtube"
									id="youtube"
									class="formbold-form-input"
								/>
							</div>
							<div>
								<label for="country" class="formbold-form-label">Facebook</label>
								<input
									type="url"
									name="facebook"
									id="facebook"
									class="formbold-form-input"
								/>
							</div>
						</div>

						<div class="formbold-input-flex">
							<div>
								<div className="identy">
									<label className='identy_label formbold-form-label cls'  for="image"><span style={{marginRight:'33px',fontSize:'14px',lineHeight:'14px',letterSpacing:'0.5px'}}>ProfileImage</span><img src={avatar} alt="" srcset="" /></label>
								</div>
								<input
									type="file"
									name="image"
									id="image"
									class="formbold-form-input"
									style={{ display: 'none' }}
								/>
							</div>
						</div>
						<button class="formbold-btn">Submit</button>
					</form>
				</div>
			</div>

		</>
	)
}

export default EditProfile