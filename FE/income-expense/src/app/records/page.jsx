import { AddButton } from "@/components/files/addButton"
import { DashboardDetail } from "@/components/files/dashboardComps/detail"
import { DashboardHeader } from "@/components/files/dashboardComps/header"

const Records = () => {
  return (
    <div>
        <DashboardHeader isSemiBold={false}/>
        <DashboardDetail/>
    </div>
  )
}

export default Records