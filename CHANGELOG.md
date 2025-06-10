# 更新日志

本项目的所有重要更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范。

## [未发布]

### 计划添加
- [ ] 数据加密功能
- [ ] 批量数据操作
- [ ] 数据导出功能
- [ ] 移动端优化
- [ ] 多语言支持

## [1.0.0] - 2025-06-10

### 新增
- ✨ 智能合约 DataStorage.sol
  - 数据存储功能
  - 数据查询功能
  - 用户数据管理
  - 事件日志记录

- 🌐 前端界面
  - 现代化响应式设计
  - MetaMask 钱包集成
  - 双重数据存储方式
  - 实时状态反馈
  - 数据展示界面

- 🔧 开发工具
  - Hardhat 开发环境
  - 自动化测试套件
  - 部署脚本
  - Gas 优化配置

- 📊 The Graph 集成
  - GraphQL Schema 定义
  - 事件索引映射
  - 数据统计功能
  - 查询接口

- 📚 文档系统
  - 完整的 README
  - API 参考文档
  - 使用示例
  - 设置指南
  - 贡献指南

### 功能特性

#### 方式1: 直接转账附加数据
- 通过 ethers.js 发送交易
- 在交易 data 字段附加数据
- 数据永久存储在区块链
- 最小化 gas 消耗

#### 方式2: 智能合约存储
- 结构化数据存储
- 事件驱动的数据记录
- 支持数据查询和统计
- 用户数据索引

#### The Graph 数据索引
- 自动事件索引
- GraphQL 查询接口
- 实时数据同步
- 复杂查询支持

### 技术栈
- **区块链**: Ethereum Sepolia 测试网
- **智能合约**: Solidity ^0.8.19
- **前端**: HTML5, CSS3, JavaScript ES6+
- **库**: ethers.js v5.7.2
- **开发框架**: Hardhat
- **数据索引**: The Graph Protocol
- **测试**: Chai, Mocha

### 安全特性
- ✅ 输入验证
- ✅ 重入攻击防护
- ✅ 溢出保护
- ✅ 访问控制
- ✅ 事件日志

### 性能优化
- ⚡ Gas 使用优化
- ⚡ 批量操作支持
- ⚡ 前端缓存
- ⚡ 异步数据加载

### 部署信息
- **网络**: Sepolia 测试网
- **合约地址**: 待部署后更新
- **The Graph**: 待配置后更新

### 学习目标
本项目帮助开发者学习：
- 区块链开发基础
- Solidity 智能合约编写
- ethers.js 库使用
- 去中心化应用 (DApp) 开发
- The Graph 数据索引
- Web3 前端集成

### 文件结构
```
data_to_chain/
├── contracts/              # 智能合约
│   └── DataStorage.sol      # 主合约
├── frontend/               # 前端界面
│   └── index.html           # 主页面
├── scripts/                # 部署脚本
│   ├── deploy.js            # 简单部署
│   └── hardhat-deploy.js    # Hardhat 部署
├── subgraph/              # The Graph 配置
│   ├── subgraph.yaml        # 子图配置
│   ├── schema.graphql       # GraphQL Schema
│   └── src/mapping.ts       # 事件映射
├── test/                  # 测试文件
│   └── DataStorage.test.js  # 合约测试
├── docs/                  # 文档
│   ├── SETUP.md             # 设置指南
│   ├── API.md               # API 文档
│   └── EXAMPLES.md          # 使用示例
├── hardhat.config.js      # Hardhat 配置
├── package.json           # 项目配置
├── .env.example           # 环境变量模板
├── .gitignore             # Git 忽略文件
├── README.md              # 项目说明
├── LICENSE                # 开源许可证
├── CONTRIBUTING.md        # 贡献指南
└── CHANGELOG.md           # 更新日志
```

### 致谢
感谢以下开源项目和社区：
- [Ethereum](https://ethereum.org/) - 以太坊区块链平台
- [Hardhat](https://hardhat.org/) - 以太坊开发环境
- [ethers.js](https://ethers.org/) - 以太坊 JavaScript 库
- [The Graph](https://thegraph.com/) - 区块链数据索引协议
- [OpenZeppelin](https://openzeppelin.com/) - 智能合约安全标准

### 许可证
本项目采用 [MIT 许可证](LICENSE)。

---

**项目状态**: 稳定版本 v1.0.0 🚀

**下一个版本预览**: v1.1.0 将添加数据加密和批量操作功能