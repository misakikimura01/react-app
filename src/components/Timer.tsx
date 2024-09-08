// インポート
import React, {useState, useRef} from "react";
import { Howl } from 'howler';

// タイマーコンポーネント作成
const Timer: React.FC = () => {
  // 分
  const [minutes, setMinutes] = useState<string>('');
  // 秒
  const [seconds, setSeconds] = useState<string>('');
  // タイマーの残り時間
  const [timeLeft, setTimeLeft] = useState<number>(0);
  // タイマーが動作中か
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // エラーメッセージの保持
  const [error, setError] = useState<string>('');
  // タイマーIDをuseRefで保持して停止から再開する時に使用
  const timerId = useRef<NodeJS.Timeout | null>(null);

// 音の設定
  const sound = new Howl({
        src: ['path_to_your_sound_file.mp3']
      });

  // タイマーが時間内の状態か、出なければエラー出す
  const validateTime = (min: number, sec: number): boolean => {
  // マイナスの数値、60以上の数値、数字ではない文字だとfalseを返す
  if (min < 0 || sec < 0 || min > 59 || sec > 59 || isNaN(min) || isNaN(sec)) {
          setError('無効な時間です。0〜59の範囲で分と秒を設定してください。');
          return false;
        }
        setError('');
        return true;
  };

  // タイマーの開始 startTimer
  const startTimer = () => {
    // 文字列を整数に変換
    const min = parseInt(minutes, 10);
    const sec = parseInt(seconds, 10);
    // バリデーション判定
    if (!validateTime(min, sec)) return;
    // 残り時間の更新
    setTimeLeft(min * 60 + sec);
    // タイマー動作中に更新
    setIsRunning(true);
    // setIntervalで残り時間を1秒ずつ減らしていく
    timerId.current = setInterval(() => {
      setTimeLeft(prevTime => {
        // 1秒未満なら時間をクリアしてタイマーを鳴らす
        if (prevTime <= 1) {
          clearInterval(timerId.current as NodeJS.Timeout);
          sound.play();
          setIsRunning(false);
          return 0;
        }
        // 1秒より多ければ-1して時間を減らしていく
        return prevTime - 1;
      });
    }, 1000);
  }

  // タイマーの一時停止 pauseTimer
  const pauseTimer = () => {
    // タイマーIDが存在していたら停止中にする
        if (timerId.current) {
          clearInterval(timerId.current);
        }
        setIsRunning(false);
      };
  
  // タイマーの再開 resumeTimer
  // 残り時間を取得して1秒ずつ減らしてく
  const resumeTimer = () => {
        setIsRunning(true);
        timerId.current = setInterval(() => {
          setTimeLeft(prevTime => {
            if (prevTime <= 1) {
              clearInterval(timerId.current as NodeJS.Timeout);
              sound.play();
              setIsRunning(false);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
      };

// タイマーのリセット resetTimer
const resetTimer = () => {
  // タイマーIDが存在していなければ残り時間を0にする
      if (timerId.current) {
        clearInterval(timerId.current);
      }
      setIsRunning(false);
      setTimeLeft(0);
      setMinutes('');
      setSeconds('');
    };
  
  // 時間のフォーマット、分:秒
  const formatTime = (time: number): string => {
        const min = Math.floor(time / 60);
        const sec = time % 60;
        return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
      };
  

    return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <h1>タイマー</h1>
            <div>
              <input
                type="text"
                value={minutes}
                // 分の更新
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="分"
                style={{ margin: '5px', padding: '10px', fontSize: '16px', width: '60px', textAlign: 'center' }}
              />
              <span>:</span>
              <input
                type="text"
                value={seconds}
                // 秒の更新
                onChange={(e) => setSeconds(e.target.value)}
                placeholder="秒"
                style={{ margin: '5px', padding: '10px', fontSize: '16px', width: '60px', textAlign: 'center' }}
              />
            </div>
            <div>
              <button onClick={startTimer} style={{ margin: '5px', padding: '10px 20px', fontSize: '16px' }} disabled={isRunning}>スタート</button>
              <button onClick={pauseTimer} style={{ margin: '5px', padding: '10px 20px', fontSize: '16px' }} disabled={!isRunning}>一時停止</button>
              <button onClick={resumeTimer} style={{ margin: '5px', padding: '10px 20px', fontSize: '16px' }} disabled={isRunning || timeLeft === 0}>再開</button>
              <button onClick={resetTimer} style={{ margin: '5px', padding: '10px 20px', fontSize: '16px' }}>リセット</button>
            </div>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            <h2>{formatTime(timeLeft)}</h2>
          </div>
        );
      };
export default Timer;


