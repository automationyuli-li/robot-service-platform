export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          机器人售后服务平台
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">欢迎使用</h2>
          <p className="text-gray-600 mb-4">
            这是一个演示版的工业机器人售后服务平台。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800">设备管理</h3>
              <p className="text-sm text-red-600 mt-2">管理所有机器人设备信息</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800">工单系统</h3>
              <p className="text-sm text-blue-600 mt-2">处理维修和服务请求</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800">团队协作</h3>
              <p className="text-sm text-green-600 mt-2">管理服务工程师团队</p>
            </div>
          </div>

          {/* 添加一些统计数据展示 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">平台优势</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                响应时间减少 70%
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                设备利用率提升 25%
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                服务成本降低 40%
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                客户满意度 95%+
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}