/**
 * 灵魂回响页面 - 匿名的共鸣与慰藉
 */
import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonTextarea,
  IonChip,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import { 
  send, 
  heart, 
  sparkles, 
  happy, 
  rocket,
  flower,
  sunny,
  moon,
  star
} from 'ionicons/icons';
import './EchoesOfSoul.css';
import { BottleMessage, Echo } from '../types/echo';
import { 
  getBottleMessages, 
  sendBottleMessage, 
  sendEcho,
  getRandomBottle 
} from '../services/echoService';

const echoOptions: Echo[] = [
  { id: 'heard', text: '我听到了', icon: heart, color: 'primary' },
  { id: 'love', text: '世界与我爱着你', icon: sparkles, color: 'danger' },
  { id: 'gentle', text: '愿你被温柔以待', icon: flower, color: 'success' },
  { id: 'together', text: '你不是一个人', icon: happy, color: 'warning' },
  { id: 'hope', text: '明天会更好', icon: sunny, color: 'tertiary' },
  { id: 'dream', text: '愿你好梦', icon: moon, color: 'medium' },
  { id: 'star', text: '你是最亮的星', icon: star, color: 'secondary' },
  { id: 'fly', text: '愿你自由飞翔', icon: rocket, color: 'primary' },
];

const EchoesOfSoul: React.FC = () => {
  const [receivedBottle, setReceivedBottle] = useState<BottleMessage | null>(null);
  const [sentBottles, setSentBottles] = useState<BottleMessage[]>([]);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceivedModal, setShowReceivedModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [selectedEcho, setSelectedEcho] = useState<string>('');

  useEffect(() => {
    loadSentBottles();
    checkForNewBottle();
  }, []);

  /**
   * 加载已发送的瓶子
   */
  const loadSentBottles = async () => {
    const bottles = await getBottleMessages();
    setSentBottles(bottles);
  };

  /**
   * 检查是否有新的瓶子
   */
  const checkForNewBottle = async () => {
    const bottle = await getRandomBottle();
    if (bottle) {
      setReceivedBottle(bottle);
      setShowReceivedModal(true);
    }
  };

  /**
   * 发送瓶中信
   */
  const handleSendBottle = async () => {
    if (!newMessage.trim()) return;

    const bottle: BottleMessage = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toISOString(),
      echoes: [],
      isAnonymous: true,
    };

    await sendBottleMessage(bottle);
    await loadSentBottles();
    setNewMessage('');
    setShowSendModal(false);
  };

  /**
   * 发送回响
   */
  const handleSendEcho = async () => {
    if (!receivedBottle || !selectedEcho) return;

    await sendEcho(receivedBottle.id, selectedEcho);
    setShowReceivedModal(false);
    setSelectedEcho('');
    setReceivedBottle(null);
  };

  /**
   * 下拉刷新
   */
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await checkForNewBottle();
    await loadSentBottles();
    event.detail.complete();
  };

  /**
   * 获取回响信息
   */
  const getEchoInfo = (echoId: string) => {
    return echoOptions.find(e => e.id === echoId) || echoOptions[0];
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>灵魂回响</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">灵魂回响</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="intro-card">
          <IonCard>
            <IonCardContent>
              <h2>漂流瓶广场</h2>
              <p>将你的心事装进瓶子，让它漂向远方</p>
              <p>或许某个灵魂，会给你温暖的回响</p>
              <IonButton 
                expand="block" 
                onClick={() => checkForNewBottle()}
                color="primary"
              >
                <IonIcon icon={sparkles} slot="start" />
                捡一个漂流瓶
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        <div className="bottles-section">
          <h3>我的漂流瓶</h3>
          <IonList>
            {sentBottles.map((bottle) => (
              <IonCard key={bottle.id}>
                <IonCardContent>
                  <p className="bottle-content">{bottle.content}</p>
                  <div className="bottle-meta">
                    <span className="bottle-time">
                      {new Date(bottle.timestamp).toLocaleDateString('zh-CN')}
                    </span>
                    {bottle.echoes.length > 0 && (
                      <div className="echoes-received">
                        <IonBadge color="primary">
                          {bottle.echoes.length} 个回响
                        </IonBadge>
                        <div className="echo-chips">
                          {bottle.echoes.map((echo, index) => {
                            const echoInfo = getEchoInfo(echo);
                            return (
                              <IonChip key={index} color={echoInfo.color}>
                                <IonIcon icon={echoInfo.icon} />
                                <IonLabel>{echoInfo.text}</IonLabel>
                              </IonChip>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        </div>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowSendModal(true)}>
            <IonIcon icon={send} />
          </IonFabButton>
        </IonFab>

        {/* 发送漂流瓶模态框 */}
        <IonModal isOpen={showSendModal} onDidDismiss={() => setShowSendModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>投递漂流瓶</IonTitle>
              <IonButton
                slot="end"
                fill="clear"
                onClick={() => setShowSendModal(false)}
              >
                取消
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="modal-content">
              <div className="bottle-intro">
                <p>将你的心事装进瓶子</p>
                <p>让陌生的灵魂给你温暖</p>
              </div>
              <IonTextarea
                value={newMessage}
                onIonInput={(e) => setNewMessage(e.detail.value!)}
                placeholder="写下你想说的话..."
                autoGrow
                rows={10}
              />
              <IonButton
                expand="block"
                onClick={handleSendBottle}
                disabled={!newMessage.trim()}
              >
                <IonIcon icon={send} slot="start" />
                投递到大海
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* 收到漂流瓶模态框 */}
        <IonModal isOpen={showReceivedModal} onDidDismiss={() => setShowReceivedModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>收到一个漂流瓶</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="modal-content">
              {receivedBottle && (
                <>
                  <div className="received-bottle">
                    <IonCard>
                      <IonCardContent>
                        <p className="bottle-message">{receivedBottle.content}</p>
                      </IonCardContent>
                    </IonCard>
                  </div>
                  
                  <div className="echo-selection">
                    <h3>选择一个回响</h3>
                    <div className="echo-options">
                      {echoOptions.map((echo) => (
                        <IonButton
                          key={echo.id}
                          expand="block"
                          fill={selectedEcho === echo.id ? 'solid' : 'outline'}
                          color={echo.color}
                          onClick={() => setSelectedEcho(echo.id)}
                        >
                          <IonIcon icon={echo.icon} slot="start" />
                          {echo.text}
                        </IonButton>
                      ))}
                    </div>
                  </div>

                  <div className="action-buttons">
                    <IonButton
                      expand="block"
                      onClick={handleSendEcho}
                      disabled={!selectedEcho}
                    >
                      发送回响
                    </IonButton>
                    <IonButton
                      expand="block"
                      fill="clear"
                      onClick={() => setShowReceivedModal(false)}
                    >
                      放回大海
                    </IonButton>
                  </div>
                </>
              )}
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default EchoesOfSoul;