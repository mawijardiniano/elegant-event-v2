import React from 'react'
import DashboardLayout from '../../components/layout/dashboard-layout'
import Cards from './component/cards'
import Graph from "./component/graph"
export default function Dashboard() {
  return (
    <DashboardLayout>
      <section>
        <Cards/>
      </section>
      <section className='pt-3'>
        <Graph/>
      </section>
    </DashboardLayout>
  )
}
