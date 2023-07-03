import React from 'react'
import Header from '../components/header';
import Timeline from './../components/Timeline';
import Sidebar from '../components/Sidebar';

const Dashboard = ({ user }) => {
  
  return (
    <div className="bg-gray-background">
      <Header user={user} />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar/>
      </div>
      Dashboard
    </div>
  );
}

export default Dashboard