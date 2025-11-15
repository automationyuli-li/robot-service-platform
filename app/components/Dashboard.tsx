'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Package
} from 'lucide-react'

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Wrench className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">机器人售后服务平台</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">演示版本 v1.0</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* 数据统计卡片 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Package className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">总设备数</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stats.totalDevices}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">待处理工单</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stats.pendingOrders}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">处理中工单</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stats.inProgressOrders}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">已完成工单</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stats.completedOrders}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 设备列表 */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">设备列表</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">所有注册的机器人设备</p>
            </div>
            <div className="divide-y divide-gray-200">
              {devices.map((device) => (
                <div key={device.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{device.name}</div>
                        <div className="text-sm text-gray-500">{device.model} • {device.serial_number}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${device.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {device.status === 'active' ? '运行中' : '离线'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    位置: {device.location} • 安装日期: {new Date(device.installation_date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 工单列表 */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">最近工单</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">最新的服务请求和处理状态</p>
            </div>
            <div className="divide-y divide-gray-200">
              {workOrders.map((order) => (
                <div key={order.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full 
                        ${order.priority === 'high' ? 'bg-red-500' : 
                          order.priority === 'medium' ? 'bg-yellow-500' : 
                          'bg-green-500'}`} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{order.title}</div>
                        <div className="text-sm text-gray-500">
                          {order.devices?.name} • 报告人: {order.reporter_name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          order.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {order.status === 'completed' ? '已完成' : 
                         order.status === 'in_progress' ? '处理中' : '待处理'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {order.description}
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    分配工程师: {order.assigned_engineer || '待分配'} • 
                    创建时间: {new Date(order.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}