'use client'
import { Users, UserPlus, Mail, Phone, MapPin } from 'lucide-react'

interface TeamMember {
  id: number
  name: string
  role: string
  email: string
  phone: string
  location: string
  avatar: string
}

export default function TeamManagement() {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: '张工程师',
      role: '首席技术专家',
      email: 'zhang@example.com',
      phone: '+86 138 0013 8000',
      location: '上海总部',
      avatar: '张'
    },
    {
      id: 2,
      name: '李技术员',
      role: '现场服务工程师',
      email: 'li@example.com',
      phone: '+86 139 0013 9000',
      location: '北京分部',
      avatar: '李'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">团队管理</h1>
          <p className="text-gray-600 mt-1">管理您的服务团队成员</p>
        </div>
        <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          <UserPlus className="h-4 w-4" />
          <span>邀请成员</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">{member.avatar}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{member.location}</span>
              </div>
            </div>

            <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                发消息
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                查看详情
              </button>
            </div>
          </div>
        ))}
        
        {/* 添加新成员卡片 */}
        <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300 hover:border-red-300 transition-colors flex flex-col items-center justify-center text-center">
          <UserPlus className="h-8 w-8 text-gray-400 mb-3" />
          <h3 className="font-medium text-gray-900 mb-1">添加团队成员</h3>
          <p className="text-sm text-gray-500 mb-4">邀请新的服务工程师加入团队</p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            邀请成员
          </button>
        </div>
      </div>
    </div>
  )
}