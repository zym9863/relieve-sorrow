/**
 * 本地存储服务 - 使用Ionic Storage处理数据持久化
 */
import { Storage } from '@ionic/storage';
import { DiaryEntry } from '../types/diary';

const DIARY_KEY = 'diary_entries';

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
 * 获取所有日记条目
 */
export const getDiaryEntries = async (): Promise<DiaryEntry[]> => {
  const storage = await initStorage();
  const entries = await storage.get(DIARY_KEY);
  return entries || [];
};

/**
 * 保存日记条目
 */
export const saveDiaryEntry = async (entry: DiaryEntry): Promise<void> => {
  const storage = await initStorage();
  const entries = await getDiaryEntries();
  entries.unshift(entry); // 新条目放在前面
  await storage.set(DIARY_KEY, entries);
};

/**
 * 删除日记条目
 */
export const deleteDiaryEntry = async (id: string): Promise<void> => {
  const storage = await initStorage();
  const entries = await getDiaryEntries();
  const filtered = entries.filter(e => e.id !== id);
  await storage.set(DIARY_KEY, filtered);
};

/**
 * 更新日记条目
 */
export const updateDiaryEntry = async (id: string, updates: Partial<DiaryEntry>): Promise<void> => {
  const storage = await initStorage();
  const entries = await getDiaryEntries();
  const index = entries.findIndex(e => e.id === id);
  if (index !== -1) {
    entries[index] = { ...entries[index], ...updates };
    await storage.set(DIARY_KEY, entries);
  }
};

/**
 * 搜索日记条目
 */
export const searchDiaryEntries = async (query: string): Promise<DiaryEntry[]> => {
  const entries = await getDiaryEntries();
  return entries.filter(entry => 
    entry.content.toLowerCase().includes(query.toLowerCase())
  );
};

/**
 * 按敬酒类型获取日记条目
 */
export const getDiaryEntriesByToast = async (toastType: string): Promise<DiaryEntry[]> => {
  const entries = await getDiaryEntries();
  return entries.filter(entry => entry.toastType === toastType);
};

/**
 * 获取日记统计信息
 */
export const getDiaryStats = async () => {
  const entries = await getDiaryEntries();
  const stats: Record<string, number> = {};
  
  entries.forEach(entry => {
    if (!stats[entry.toastType]) {
      stats[entry.toastType] = 0;
    }
    stats[entry.toastType]++;
  });
  
  return {
    total: entries.length,
    byType: stats,
    lastEntry: entries[0] || null
  };
};