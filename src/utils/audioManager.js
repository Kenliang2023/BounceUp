// 音频管理器
class AudioManager {
  constructor() {
    this.audioCache = new Map();
    this.currentAudio = null;
    this.basePath = '/audio/';
  }

  // 预加载音频文件
  async preloadAudio(audioName) {
    if (this.audioCache.has(audioName)) {
      return this.audioCache.get(audioName);
    }

    try {
      const audio = new Audio(`${this.basePath}${audioName}.mp3`);
      await audio.load();
      this.audioCache.set(audioName, audio);
      return audio;
    } catch (error) {
      console.error(`Failed to preload audio: ${audioName}`, error);
      return null;
    }
  }

  // 播放音频
  async play(audioName, options = {}) {
    try {
      // 检查全局音频开关
      const userData = localStorage.getItem('bounceup_user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          if (user.preferences && user.preferences.soundEnabled === false) {
            console.log('音频已被用户禁用');
            return null;
          }
        } catch (error) {
          console.error('解析用户数据失败:', error);
        }
      }

      // 如果有正在播放的音频且不允许重叠，先停止
      if (this.currentAudio && !options.allowOverlap) {
        this.stop();
      }

      // 获取或加载音频
      let audio = this.audioCache.get(audioName);
      if (!audio) {
        audio = await this.preloadAudio(audioName);
      }

      if (!audio) {
        console.error(`Audio not found: ${audioName}`);
        return;
      }

      // 克隆音频以支持同时播放多个实例
      const audioClone = audio.cloneNode();

      // 设置音量
      if (options.volume !== undefined) {
        audioClone.volume = Math.max(0, Math.min(1, options.volume));
      }

      // 设置播放速率
      if (options.playbackRate !== undefined) {
        audioClone.playbackRate = options.playbackRate;
      }

      // 播放音频
      await audioClone.play();

      if (!options.allowOverlap) {
        this.currentAudio = audioClone;
      }

      // 播放结束后的回调
      if (options.onEnd) {
        audioClone.addEventListener('ended', options.onEnd, { once: true });
      }

      return audioClone;
    } catch (error) {
      console.error(`Failed to play audio: ${audioName}`, error);
    }
  }

  // 停止当前播放的音频
  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  // 暂停当前播放的音频
  pause() {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
    }
  }

  // 恢复播放
  resume() {
    if (this.currentAudio && this.currentAudio.paused) {
      this.currentAudio.play();
    }
  }

  // 设置音量
  setVolume(volume) {
    const normalizedVolume = Math.max(0, Math.min(1, volume));
    if (this.currentAudio) {
      this.currentAudio.volume = normalizedVolume;
    }
  }

  // 预加载所有训练相关音频
  async preloadAllTrainingAudio() {
    const audioFiles = [
      'welcome',
      'dribbling_start',
      'encouragement',
      'shooting_tips',
      'rest_reminder',
      'training_complete',
    ];

    const promises = audioFiles.map(file => this.preloadAudio(file));
    await Promise.all(promises);
  }
}

// 创建单例实例
const audioManager = new AudioManager();

// 导出音频类型常量
export const AUDIO_TYPES = {
  WELCOME: 'welcome',
  DRIBBLING_START: 'dribbling_start',
  ENCOURAGEMENT: 'encouragement',
  SHOOTING_TIPS: 'shooting_tips',
  REST_REMINDER: 'rest_reminder',
  TRAINING_COMPLETE: 'training_complete',
};

export default audioManager;
