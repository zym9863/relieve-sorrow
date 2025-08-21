/**
 * 时光酒杯页面 - 情绪日记与自我对话
 */
import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonModal,
  IonTextarea,
  IonSegment,
  IonSegmentButton,
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
} from '@ionic/react';
import { add, wine, sunny, time, home, heart, sparkles } from 'ionicons/icons';
import './GobletOfTime.css';
import { DiaryEntry, ToastType } from '../types/diary';
import { getDiaryEntries, saveDiaryEntry, deleteDiaryEntry } from '../services/storage';

const toastOptions: ToastType[] = [
  { id: 'sunrise', label: '敬朝阳', icon: sunny, color: 'warning' },
  { id: 'past', label: '敬过往', icon: time, color: 'medium' },
  { id: 'hometown', label: '敬故乡', icon: home, color: 'success' },
  { id: 'freedom', label: '敬自由', icon: sparkles, color: 'primary' },
  { id: 'love', label: '敬爱情', icon: heart, color: 'danger' },
  { id: 'self', label: '敬自己', icon: wine, color: 'tertiary' },
];

const GobletOfTime: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEntry, setNewEntry] = useState('');
  const [selectedToast, setSelectedToast] = useState<string>('sunrise');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadEntries();
  }, []);

  /**
   * 加载日记条目
   */
  const loadEntries = async () => {
    const data = await getDiaryEntries();
    setEntries(data);
  };

  /**
   * 保存新的日记条目
   */
  const handleSave = async () => {
    if (!newEntry.trim()) return;

    const entry: DiaryEntry = {
      id: Date.now().toString(),
      content: newEntry,
      toastType: selectedToast,
      timestamp: new Date().toISOString(),
      mood: 'neutral',
    };

    await saveDiaryEntry(entry);
    await loadEntries();
    setNewEntry('');
    setShowModal(false);
  };

  /**
   * 删除日记条目
   */
  const handleDelete = async (id: string) => {
    await deleteDiaryEntry(id);
    await loadEntries();
  };

  /**
   * 过滤日记条目
   */
  const filteredEntries = entries.filter(entry => {
    const matchesFilter = filterType === 'all' || entry.toastType === filterType;
    const matchesSearch = entry.content.toLowerCase().includes(searchText.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  /**
   * 格式化时间显示
   */
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  /**
   * 获取敬酒类型信息
   */
  const getToastInfo = (toastType: string) => {
    return toastOptions.find(t => t.id === toastType) || toastOptions[0];
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>时光酒杯</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            placeholder="搜索你的记忆..."
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">时光酒杯</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSegment value={filterType} onIonChange={e => setFilterType(e.detail.value!)}>
          <IonSegmentButton value="all">
            <IonLabel>全部</IonLabel>
          </IonSegmentButton>
          {toastOptions.map(option => (
            <IonSegmentButton key={option.id} value={option.id}>
              <IonLabel>{option.label}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>

        <IonList>
          {filteredEntries.map((entry) => {
            const toastInfo = getToastInfo(entry.toastType);
            return (
              <IonCard key={entry.id}>
                <IonCardHeader>
                  <IonCardTitle>
                    <IonChip color={toastInfo.color}>
                      <IonIcon icon={toastInfo.icon} />
                      <IonLabel>{toastInfo.label}</IonLabel>
                    </IonChip>
                    <span className="timestamp">{formatDate(entry.timestamp)}</span>
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p className="entry-content">{entry.content}</p>
                  <IonButton
                    fill="clear"
                    size="small"
                    color="danger"
                    onClick={() => handleDelete(entry.id)}
                  >
                    删除
                  </IonButton>
                </IonCardContent>
              </IonCard>
            );
          })}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>举杯记录</IonTitle>
              <IonButton
                slot="end"
                fill="clear"
                onClick={() => setShowModal(false)}
              >
                取消
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="modal-content">
              <IonTextarea
                value={newEntry}
                onIonInput={(e) => setNewEntry(e.detail.value!)}
                placeholder="记录这一刻的心情..."
                autoGrow
                rows={8}
              />
              
              <div className="toast-selection">
                <h3>这一杯，敬给...</h3>
                <IonGrid>
                  <IonRow>
                    {toastOptions.map(option => (
                      <IonCol size="4" key={option.id}>
                        <IonButton
                          expand="block"
                          fill={selectedToast === option.id ? 'solid' : 'outline'}
                          color={option.color}
                          onClick={() => setSelectedToast(option.id)}
                        >
                          <IonIcon icon={option.icon} slot="start" />
                          {option.label}
                        </IonButton>
                      </IonCol>
                    ))}
                  </IonRow>
                </IonGrid>
              </div>

              <IonButton
                expand="block"
                onClick={handleSave}
                disabled={!newEntry.trim()}
              >
                <IonIcon icon={wine} slot="start" />
                举杯
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default GobletOfTime;