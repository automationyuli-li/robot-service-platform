'use client'
import { useState } from 'react'
import { Package, Plus, Search, Filter, Download } from 'lucide-react'

interface Device {
  id: number
  name: string
  model: string
  serial_number: string
  location: string
  status: string
  installation_date: string
}

export default function DeviceManagement() {
  const [devices, setDevices] = useState<Device[]>([])
  const [showAddDevice, setShowAddDevice] = useState(false)
  const [newDevice, setNewDevice] = useState({
    name: '',
    model: '',
    serial_number: '',
    location: '',
    installation_date: ''
  })

  const handleAddDevice = () => {
    // 这里实际应该调用 API
    const device: Device = {
      id: devices.length + 1,
      ...newDevice,
      status: 'active'
    }
    setDevices([...devices, device])
    setNewDevice({ name: '', model: '', serial_number: '', location: '', installation_date: '' })
    setShowAddDevice(false)
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和操作栏 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">设备管理</h1>
          <p className="text-gray-600 mt-1">管理所有工业机器人设备信息</p>
        </div>
        <button 
          onClick={() => setShowAddDevice(true)}
          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>添加设备</span>
        </button>
      </div>

      {/* 搜索和筛选栏 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索设备..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            <span>筛选</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            <span>导出</span>
          </button>
        </div>
      </div>

      {/* 添加设备模态框 */}
      {showAddDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">添加新设备</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">设备名称</label>
                <input
                  type="text"
                  value={newDevice.name}
                  onChange={(e) => setNewDevice({...newDevice, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">设备型号</label>
                <input
                  type="text"
                  value={newDevice.model}
                  onChange={(e) => setNewDevice({...newDevice, model: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">序列号</label>
                <input
                  type="text"
                  value={newDevice.serial_number}
                  onChange={(e) => setNewDevice({...newDevice, serial_number: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowAddDevice(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleAddDevice}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  添加
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 设备列表 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">设备列表</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {devices.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无设备</h3>
              <p className="text-gray-500 mb-4">添加您的第一台工业机器人设备开始管理</p>
              <button 
                onClick={() => setShowAddDevice(true)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                添加设备
              </button>
            </div>
          ) : (
            devices.map((device) => (
              <div key={device.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{device.name}</h3>
                      <p className="text-sm text-gray-500">{device.model} • {device.serial_number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      device.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {device.status === 'active' ? '运行中' : '离线'}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{device.location}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}