/**
 * 灵魂回响相关类型定义
 */

export interface BottleMessage {
  id: string;
  content: string;
  timestamp: string;
  echoes: string[];
  isAnonymous: boolean;
  userId?: string;
}

export interface Echo {
  id: string;
  text: string;
  icon: string;
  color: string;
}