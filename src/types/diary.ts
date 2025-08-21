/**
 * 日记相关类型定义
 */

export interface DiaryEntry {
  id: string;
  content: string;
  toastType: string;
  timestamp: string;
  mood?: string;
  images?: string[];
  voiceNote?: string;
}

export interface ToastType {
  id: string;
  label: string;
  icon: string;
  color: string;
}