import React from 'react'
import Header from '../components/header';

const Dashboard = ({ user }) => {
  
  return <div className="bg-gray-background">
    <Header user={user} />
    Dashboard</div>;
}

export default Dashboard