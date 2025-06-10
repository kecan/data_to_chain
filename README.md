# 数据上链练习项目 🔗

这是一个完整的区块链数据存储练习项目，演示了如何使用两种不同的方式将数据存储到以太坊区块链，并通过 The Graph 查询链上数据。

## 🌟 项目特色

- **双重存储方式**: 支持直接转账附加数据和智能合约存储
- **现代化前端**: 响应式设计，支持 MetaMask 钱包连接
- **智能合约**: 基于 Solidity 0.8.19 的安全合约
- **数据索引**: 集成 The Graph 协议进行数据查询
- **完整工具链**: Hardhat 开发环境，自动化部署和测试

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/kecan/data_to_chain.git
cd data_to_chain
```

### 2. 安装依赖

```bash
npm install
```

### 3. 环境配置

复制环境变量模板并填入您的配置：

```bash
cp .env.example .env
```

在 `.env` 文件中配置：
- `INFURA_API_KEY`: 从 [Infura](https://infura.io) 获取
- `PRIVATE_KEY`: 您的钱包私钥（请使用测试网账户）
- `ETHERSCAN_API_KEY`: 从 [Etherscan](https://etherscan.io/apis) 获取

### 4. 部署智能合约

#### 方式A: 使用 Hardhat（推荐）

```bash
# 编译合约
npm run compile

# 部署到 Sepolia 测试网
npm run deploy
```

#### 方式B: 使用 Remix

1. 访问 [Remix IDE](https://remix.ethereum.org)
2. 上传 `contracts/DataStorage.sol`
3. 编译并部署到 Sepolia 网络

### 5. 使用前端界面

1. 在浏览器中打开 `frontend/index.html`
2. 连接 MetaMask 钱包并切换到 Sepolia 网络
3. 输入已部署的合约地址
4. 开始测试数据存储功能！

## 📁 项目结构

```
data_to_chain/
├── contracts/              # 智能合约
│   └── DataStorage.sol
├── frontend/               # 前端界面
│   └── index.html
├── scripts/                # 部署脚本
│   ├── deploy.js
│   └── hardhat-deploy.js
├── subgraph/              # The Graph 配置
│   ├── subgraph.yaml
│   ├── schema.graphql
│   └── src/
│       └── mapping.ts
├── test/                  # 测试文件
│   └── DataStorage.test.js
├── hardhat.config.js      # Hardhat 配置
├── package.json
└── README.md
```

## 🔧 功能特性

### 方式1: 直接转账附加数据
- 使用 ethers.js 发送交易
- 在交易的 `data` 字段中附加数据
- 数据永久存储在区块链上

### 方式2: 智能合约存储
- 通过智能合约的 `storeData` 函数存储
- 触发 `DataStored` 事件
- 支持数据查询和统计

### The Graph 集成
- 自动索引合约事件
- 提供 GraphQL 查询接口
- 支持复杂数据查询和统计

## 🧪 测试

运行合约测试：

```bash
npm test
```

测试覆盖：
- 数据存储功能
- 数据查询功能
- 错误处理
- 事件触发

## 📊 The Graph 部署

### 1. 安装 Graph CLI

```bash
npm install -g @graphprotocol/graph-cli
```

### 2. 创建子图项目

访问 [Graph Studio](https://thegraph.com/studio/) 创建新的子图项目。

### 3. 配置和部署

```bash
# 更新 subgraph.yaml 中的合约地址
# 生成代码
npm run graph:codegen

# 构建子图
npm run graph:build

# 部署子图
npm run graph:deploy
```

## 🔍 使用示例

### 存储数据

```javascript
// 方式1: 直接转账
const tx = await signer.sendTransaction({
  to: userAccount,
  value: ethers.utils.parseEther("0.001"),
  data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes("Hello, Blockchain!"))
});

// 方式2: 智能合约
const contract = new ethers.Contract(contractAddress, contractABI, signer);
const tx = await contract.storeData("Hello, Smart Contract!");
```

### 查询数据

```javascript
// 查询总条数
const total = await contract.getTotalEntries();

// 查询特定数据
const [sender, data, timestamp] = await contract.getDataEntry(0);

// 查询用户数据
const userEntries = await contract.getUserEntries(userAddress);
```

### Graph 查询

```graphql
query {
  dataStoreds(first: 10, orderBy: timestamp, orderDirection: desc) {
    id
    sender
    data
    timestamp
    transactionHash
  }
}
```

## 🔐 安全注意事项

- 永远不要将私钥提交到代码仓库
- 使用 `.env` 文件管理敏感信息
- 仅在测试网络上进行练习
- 部署前充分测试合约功能

## 📚 学习资源

- [以太坊官方文档](https://ethereum.org/zh/developers/docs/)
- [Solidity 文档](https://docs.soliditylang.org/)
- [Hardhat 文档](https://hardhat.org/docs)
- [The Graph 文档](https://thegraph.com/docs/)
- [ethers.js 文档](https://docs.ethers.io/v5/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙋‍♂️ 获取帮助

如果您在使用过程中遇到问题：

1. 查看 [Issues](https://github.com/kecan/data_to_chain/issues) 页面
2. 创建新的 Issue 描述您的问题
3. 参考项目文档和代码注释

---

**⚠️ 免责声明**: 本项目仅用于教育和学习目的，请勿在生产环境中直接使用。使用前请充分了解区块链技术和相关风险。