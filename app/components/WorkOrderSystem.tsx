'use client'
import { useState } from 'react'
import { Clock, Plus, Search, Filter, AlertTriangle, CheckCircle } from 'lucide-react'

interface WorkOrder {
  id: number
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  reporter_name: string
  created_at: string
}

export default function WorkOrderSystem() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([
    {
      id: 1,
      title: '焊接精度偏差',
      description: '机器人焊接路径出现约2mm偏差，影响产品质量',
      status: 'in_progress',
      priority: 'high',
      reporter_name: '张主管',
      created_at: '2024-01-15'
    }
  ])
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all')

  const filteredOrders = workOrders.filter(order => 
    filter === 'all' || order.status === filter
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in_progress': return <AlertTriangle className="h-4 w-4 text-blue-600" />
      default: return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-green-100 text-green-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和操作栏 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">工单系统</h1>
          <p className="text-gray-600 mt-1">管理和跟踪所有服务请求</p>
        </div>
        <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>新建工单</span>
        </button>
      </div>

      {/* 筛选标签 */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: '全部', count: workOrders.length },
          { key: 'pending', label: '待处理', count: workOrders.filter(o => o.status === 'pending').length },
          { key: 'in_progress', label: '处理中', count: workOrders.filter(o => o.status === 'in_progress').length },
          { key: 'completed', label: '已完成', count: workOrders.filter(o => o.status === 'completed').length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              filter === tab.key 
                ? 'bg-red-100 text-red-700 border border-red-200' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              filter === tab.key ? 'bg-red-200' : 'bg-gray-200'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 工单列表 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">工单列表</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索工单..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4" />
                <span>筛选</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredOrders.map((order) => (
            <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(order.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900">{order.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                        {order.priority === 'high' ? '紧急' : order.priority === 'medium' ? '重要' : '一般'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{order.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>报告人: {order.reporter_name}</span>
                      <span>•</span>
                      <span>创建时间: {order.created_at}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    order.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status === 'completed' ? '已完成' : 
                     order.status === 'in_progress' ? '处理中' : '待处理'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}