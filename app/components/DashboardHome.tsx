import { Package, Clock, AlertTriangle, CheckCircle, Wrench, Users } from 'lucide-react'

interface DashboardHomeProps {
  devices: any[]
  workOrders: any[]
  stats: {
    totalDevices: number
    pendingOrders: number
    inProgressOrders: number
    completedOrders: number
  }
}

export default function DashboardHome({ devices, workOrders, stats }: DashboardHomeProps) {
  return (
    <div className="space-y-6">
      {/* 欢迎横幅 */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white">
        <h1 className="text-2xl font-bold mb-2">机器人售后服务中心</h1>
        <p className="text-red-100 opacity-90">
          管理您的工业机器人设备，快速处理服务请求，确保生产线的持续运行
        </p>
      </div>

      {/* 数据统计卡片 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">总设备数</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalDevices}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">待处理工单</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.pendingOrders}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">处理中</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.inProgressOrders}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">已完成</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.completedOrders}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors group">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <Wrench className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">新建工单</p>
              <p className="text-sm text-gray-500">报告设备问题</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors group">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <Package className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">添加设备</p>
              <p className="text-sm text-gray-500">注册新机器人</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors group">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <Users className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">团队管理</p>
              <p className="text-sm text-gray-500">邀请成员</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}