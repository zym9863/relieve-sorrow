/**
 * 灵魂回响服务 - 处理漂流瓶和回响的逻辑
 */
import { Storage } from '@ionic/storage';
import { BottleMessage } from '../types/echo';

const BOTTLES_KEY = 'bottle_messages';
const RECEIVED_KEY = 'received_bottles';

// 创建存储实例并确保初始化
let storage: Storage | null = null;

/**
 * 初始化存储（如果还未初始化）
 */
const initStorage = async (): Promise<Storage> => {
  if (!storage) {
    storage = new Storage();
    await storage.create();
  }
  return storage;
};

/**
 * 获取我的漂流瓶
 */
export const getBottleMessages = async (): Promise<BottleMessage[]> => {
  const storage = await initStorage();
  const bottles = await storage.get(BOTTLES_KEY);
  return bottles || [];
};

/**
 * 发送漂流瓶
 */
export const sendBottleMessage = async (bottle: BottleMessage): Promise<void> => {
  const storage = await initStorage();
  const bottles = await getBottleMessages();
  bottles.unshift(bottle);
  await storage.set(BOTTLES_KEY, bottles);
  
  // 模拟添加到公共池
  await addToPublicPool(bottle);
};

/**
 * 添加到公共池（模拟）
 */
const addToPublicPool = async (bottle: BottleMessage): Promise<void> => {
  const storage = await initStorage();
  // 在实际应用中，这里会发送到服务器
  // 现在我们使用本地存储模拟
  const publicPool = await storage.get('public_pool') || [];
  publicPool.push(bottle);
  await storage.set('public_pool', publicPool);
};

/**
 * 获取随机漂流瓶
 */
export const getRandomBottle = async (): Promise<BottleMessage | null> => {
  const storage = await initStorage();
  // 模拟从公共池获取
  const publicPool: BottleMessage[] = await storage.get('public_pool') || [];
  
  // 过滤掉自己的瓶子（在实际应用中应该在服务器端处理）
  const myBottles = await getBottleMessages();
  const myBottleIds = new Set(myBottles.map(b => b.id));
  const availableBottles = publicPool.filter(b => !myBottleIds.has(b.id));
  
  if (availableBottles.length === 0) {
    // 如果没有其他人的瓶子，创建一些示例瓶子
    const sampleBottles = await createSampleBottles();
    return sampleBottles.length > 0 ? sampleBottles[0] : null;
  }
  
  // 随机选择一个
  const randomIndex = Math.floor(Math.random() * availableBottles.length);
  return availableBottles[randomIndex];
};

/**
 * 发送回响
 */
export const sendEcho = async (bottleId: string, echoType: string): Promise<void> => {
  const storage = await initStorage();
  // 更新公共池中的瓶子
  const publicPool: BottleMessage[] = await storage.get('public_pool') || [];
  const bottleIndex = publicPool.findIndex(b => b.id === bottleId);
  
  if (bottleIndex !== -1) {
    publicPool[bottleIndex].echoes.push(echoType);
    await storage.set('public_pool', publicPool);
  }
  
  // 同时更新发送者的瓶子（如果是自己的）
  const myBottles = await getBottleMessages();
  const myBottleIndex = myBottles.findIndex(b => b.id === bottleId);
  
  if (myBottleIndex !== -1) {
    myBottles[myBottleIndex].echoes.push(echoType);
    await storage.set(BOTTLES_KEY, myBottles);
  }
};

/**
 * 创建示例漂流瓶
 */
const createSampleBottles = async (): Promise<BottleMessage[]> => {
  const samples: BottleMessage[] = [
    {
      id: 'sample-1',
      content: '今天的月亮很美，突然想起了远方的朋友。希望你也能看到这轮明月，知道有人在想你。',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      echoes: ['love', 'heard'],
      isAnonymous: true,
    },
    {
      id: 'sample-2',
      content: '生活很难，但我还在坚持。如果你也在经历困难，请相信一切都会好起来的。',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      echoes: ['together', 'hope'],
      isAnonymous: true,
    },
    {
      id: 'sample-3',
      content: '今天终于完成了一直想做的事，虽然很小，但还是想和陌生的你分享这份喜悦。',
      timestamp: new Date(Date.now() - 259200000).toISOString(),
      echoes: ['star', 'fly'],
      isAnonymous: true,
    },
    {
      id: 'sample-4',
      content: '有时候觉得很孤独，像是在人海中漂流。但我知道，总有人和我一样，在寻找同类。',
      timestamp: new Date(Date.now() - 345600000).toISOString(),
      echoes: ['heard', 'together'],
      isAnonymous: true,
    },
    {
      id: 'sample-5',
      content: '晚安，陌生人。愿你今夜好梦，明天醒来充满力量。',
      timestamp: new Date(Date.now() - 432000000).toISOString(),
      echoes: ['dream', 'gentle'],
      isAnonymous: true,
    },
  ];
  
  // 随机返回1-2个示例
  const count = Math.floor(Math.random() * 2) + 1;
  return samples.slice(0, count);
};

/**
 * 获取收到的瓶子历史
 */
export const getReceivedBottles = async (): Promise<BottleMessage[]> => {
  const storage = await initStorage();
  const received = await storage.get(RECEIVED_KEY);
  return received || [];
};

/**
 * 保存收到的瓶子
 */
export const saveReceivedBottle = async (bottle: BottleMessage): Promise<void> => {
  const storage = await initStorage();
  const received = await getReceivedBottles();
  received.unshift(bottle);
  await storage.set(RECEIVED_KEY, received);
};