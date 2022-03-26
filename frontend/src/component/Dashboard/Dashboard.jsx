import React from 'react';
import Profile from "./Profile/Profile"
import Directory from './Directory/Directory';


const Dashboard = () => {
    return(
        <div>
            <Profile />
            <Directory>
                <Directory />
            </Directory>
        </div>
        
    )
}

export default Dashboard;