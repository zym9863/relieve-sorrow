/**
 * 首页 - 应用欢迎页面
 */
import React, { useEffect, useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText
} from '@ionic/react';
import { wine, sparkles, heart, sunny } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Home.css';
import { getDiaryStats } from '../services/storage';
import { getBottleMessages } from '../services/echoService';

const Home: React.FC = () => {
  const history = useHistory();
  const [stats, setStats] = useState({ diaryCount: 0, bottleCount: 0 });
  const [dailyQuote, setDailyQuote] = useState('');

  useEffect(() => {
    loadStats();
    setRandomQuote();
  }, []);

  /**
   * 加载统计数据
   */
  const loadStats = async () => {
    const diaryStats = await getDiaryStats();
    const bottles = await getBottleMessages();
    setStats({
      diaryCount: diaryStats.total,
      bottleCount: bottles.length
    });
  };

  /**
   * 设置每日名言
   */
  const setRandomQuote = () => {
    const quotes = [
      '一杯敬朝阳，一杯敬月光',
      '愿你被这世界温柔以待',
      '山高路远，但见风光无限',
      '生活明朗，万物可爱',
      '保持热爱，奔赴山海',
      '凡是过往，皆为序章',
      '心中有光，慢食三餐',
      '人间烟火，山河远阔'
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setDailyQuote(quotes[randomIndex]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>解忧</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">解忧</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <div className="home-container">
          <div className="welcome-section">
            <IonCard className="quote-card">
              <IonCardContent>
                <IonIcon icon={sunny} className="quote-icon" />
                <h2 className="daily-quote">{dailyQuote}</h2>
                <p className="quote-subtitle">今日寄语</p>
              </IonCardContent>
            </IonCard>
          </div>

          <div className="stats-section">
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonCard className="stat-card">
                    <IonCardContent>
                      <IonIcon icon={wine} className="stat-icon" />
                      <h3>{stats.diaryCount}</h3>
                      <p>时光记忆</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol size="6">
                  <IonCard className="stat-card">
                    <IonCardContent>
                      <IonIcon icon={sparkles} className="stat-icon" />
                      <h3>{stats.bottleCount}</h3>
                      <p>漂流瓶</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>

          <div className="features-section">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={wine} /> 时光酒杯
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>记录每日心情，举杯敬过往</p>
                <p className="feature-description">
                  在这里，你可以用文字记录生活的点滴，
                  每一次记录都是对生活的致敬。
                </p>
                <IonButton 
                  expand="block" 
                  onClick={() => history.push('/goblet')}
                >
                  开始记录
                </IonButton>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={sparkles} /> 灵魂回响
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>让心事漂流，收获温暖回响</p>
                <p className="feature-description">
                  将心事装进漂流瓶，投向未知的远方，
                  或许会收到来自陌生灵魂的温暖回应。
                </p>
                <IonButton 
                  expand="block" 
                  onClick={() => history.push('/echoes')}
                >
                  去漂流
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>

          <div className="footer-section">
            <IonText color="medium">
              <p>愿你的每一天都充满阳光</p>
              <p>
                <IonIcon icon={heart} color="danger" /> 解忧 v1.0
              </p>
            </IonText>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;