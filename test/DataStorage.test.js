const { expect } = require("chai");
const { ethers } = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("DataStorage", function () {
  let DataStorage;
  let dataStorage;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // 获取测试账户
    [owner, addr1, addr2] = await ethers.getSigners();

    // 部署合约
    DataStorage = await ethers.getContractFactory("DataStorage");
    dataStorage = await DataStorage.deploy();
    await dataStorage.deployed();
  });

  describe("存储数据", function () {
    it("应该成功存储数据", async function () {
      const testData = "Hello, Blockchain!";
      
      await expect(dataStorage.storeData(testData))
        .to.emit(dataStorage, "DataStored")
        .withArgs(owner.address, testData, anyValue, 0);
      
      const totalEntries = await dataStorage.getTotalEntries();
      expect(totalEntries).to.equal(1);
    });

    it("不应该允许存储空数据", async function () {
      await expect(dataStorage.storeData(""))
        .to.be.revertedWith("Data cannot be empty");
    });

    it("应该正确记录多条数据", async function () {
      const testData1 = "第一条数据";
      const testData2 = "第二条数据";
      
      await dataStorage.storeData(testData1);
      await dataStorage.connect(addr1).storeData(testData2);
      
      const totalEntries = await dataStorage.getTotalEntries();
      expect(totalEntries).to.equal(2);
      
      // 检查第一条数据
      const [sender1, data1, timestamp1] = await dataStorage.getDataEntry(0);
      expect(sender1).to.equal(owner.address);
      expect(data1).to.equal(testData1);
      
      // 检查第二条数据
      const [sender2, data2, timestamp2] = await dataStorage.getDataEntry(1);
      expect(sender2).to.equal(addr1.address);
      expect(data2).to.equal(testData2);
    });
  });

  describe("查询数据", function () {
    beforeEach(async function () {
      await dataStorage.storeData("测试数据1");
      await dataStorage.connect(addr1).storeData("测试数据2");
      await dataStorage.storeData("测试数据3");
    });

    it("应该返回正确的总条数", async function () {
      const total = await dataStorage.getTotalEntries();
      expect(total).to.equal(3);
    });

    it("应该正确返回数据条目", async function () {
      const [sender, data, timestamp] = await dataStorage.getDataEntry(0);
      expect(sender).to.equal(owner.address);
      expect(data).to.equal("测试数据1");
      expect(timestamp).to.be.gt(0);
    });

    it("应该正确返回用户的数据条目", async function () {
      const ownerEntries = await dataStorage.getUserEntries(owner.address);
      const addr1Entries = await dataStorage.getUserEntries(addr1.address);
      
      expect(ownerEntries.length).to.equal(2); // 索引 0 和 2
      expect(addr1Entries.length).to.equal(1); // 索引 1
      
      expect(ownerEntries[0]).to.equal(0);
      expect(ownerEntries[1]).to.equal(2);
      expect(addr1Entries[0]).to.equal(1);
    });

    it("查询不存在的索引应该失败", async function () {
      await expect(dataStorage.getDataEntry(999))
        .to.be.revertedWith("Index out of bounds");
    });
  });

  describe("事件测试", function () {
    it("应该正确触发 DataStored 事件", async function () {
      const testData = "事件测试数据";
      
      await expect(dataStorage.storeData(testData))
        .to.emit(dataStorage, "DataStored")
        .withArgs(owner.address, testData, anyValue, 0);
    });
  });

  describe("边界条件测试", function () {
    it("应该能处理很长的数据", async function () {
      const longData = "A".repeat(1000);
      
      await expect(dataStorage.storeData(longData))
        .to.emit(dataStorage, "DataStored")
        .withArgs(owner.address, longData, anyValue, 0);
      
      const [sender, data, timestamp] = await dataStorage.getDataEntry(0);
      expect(data).to.equal(longData);
    });

    it("应该能处理特殊字符", async function () {
      const specialData = "🔗 特殊字符测试 & symbols @#$%";
      
      await dataStorage.storeData(specialData);
      const [sender, data, timestamp] = await dataStorage.getDataEntry(0);
      expect(data).to.equal(specialData);
    });
  });
});