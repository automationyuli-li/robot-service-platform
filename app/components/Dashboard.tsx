'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { 
  Wrench, 
  Package,
  Clock,
  Users,
  Settings,
  Bell,
  Search,
  Home
} from 'lucide-react'
import DeviceManagement from './DeviceManagement'
import WorkOrderSystem from './WorkOrderSystem'
import TeamManagement from './TeamManagement'
import DashboardHome from './DashboardHome' // 我们将把原来的首页内容移到这里

// 定义类型
interface Device {
  id: number
  name: string
  model: string
  serial_number: string
  location: string
  status: string
  installation_date: string
  created_at: string
}

interface WorkOrder {
  id: number
  device_id: number
  title: string
  description: string
  status: string
  priority: string
  reporter_name: string
  reporter_email: string
  assigned_engineer: string
  created_at: string
  updated_at: string
  devices: {
    name: string
    model: string
    location: string
  }
}

export default function Dashboard() {
  const [devices, setDevices] = useState<Device[]>([])
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // 获取设备数据
      const { data: devicesData } = await supabase
        .from('devices')
        .select('*')
        .order('created_at', { ascending: false })
      
      // 获取工单数据
      const { data: ordersData } = await supabase
        .from('work_orders')
        .select(`
          *,
          devices (name, model, location)
        `)
        .order('created_at', { ascending: false })
      
      setDevices(devicesData || [])
      setWorkOrders(ordersData || [])
    } catch (error) {
      console.error('获取数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 统计数据
  const stats = {
    totalDevices: devices.length,
    pendingOrders: workOrders.filter(order => order.status === 'pending').length,
    inProgressOrders: workOrders.filter(order => order.status === 'in_progress').length,
    completedOrders: workOrders.filter(order => order.status === 'completed').length,
  }

  // 渲染当前激活的模块
  const renderActiveModule = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome devices={devices} workOrders={workOrders} stats={stats} />
      case 'devices':
        return <DeviceManagement />
      case 'orders':
        return <WorkOrderSystem />
      case 'team':
        return <TeamManagement />
      default:
        return <DashboardHome devices={devices} workOrders={workOrders} stats={stats} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 侧边栏 */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">机器人服务</h1>
          </div>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {[
              { id: 'dashboard', label: '仪表盘', icon: Home, count: null },
              { id: 'devices', label: '设备管理', icon: Package, count: stats.totalDevices },
              { id: 'orders', label: '工单系统', icon: Clock, count: stats.pendingOrders },
              { id: 'team', label: '团队管理', icon: Users, count: null }
            ].map((item) => (
              <button 
                key={item.id}
                className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-red-50 text-red-700 border border-red-200' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count !== null && item.count > 0 && (
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full min-w-6 text-center">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
              <span className="font-medium">设置</span>
            </button>
          </div>
        </nav>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航栏 */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索设备、工单或文档..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">您</span>
              </div>
            </div>
          </div>
        </header>

        {/* 动态内容区域 */}
        <main className="flex-1 p-8">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  )
}