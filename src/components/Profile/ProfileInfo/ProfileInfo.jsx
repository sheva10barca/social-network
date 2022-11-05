import React from 'react';

import s from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <div>
            <div className={s.content}>
                <img
                    src='https://static.maiutazas.hu/uploads/mu_campaign/2/1/8/_/218079_5369ab0620d65a13ab192053829d91f0577edd4d_original.jpg' alt=''/>
            </div>
            <div className={s.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;