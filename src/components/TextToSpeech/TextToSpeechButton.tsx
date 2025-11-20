import { Volume2, VolumeX, Settings } from 'lucide-react';
import { useState } from 'react';
import { useTextToSpeech } from '../../hooks/use-text-to-speech';
import { cn } from '../../lib/classname';

interface TextToSpeechButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TextToSpeechButton({ 
  text, 
  className = '', 
  size = 'sm' 
}: TextToSpeechButtonProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [rate, setRate] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  
  const { 
    isPlaying, 
    isPaused, 
    isSupported, 
    voices,
    speak, 
    toggle, 
    stop 
  } = useTextToSpeech({ 
    rate, 
    voice: selectedVoice 
  });

  if (!isSupported) {
    return null;
  }

  // Extract text content from HTML
  const getTextContent = (htmlString: string): string => {
    if (typeof window === 'undefined') return htmlString;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const handlePlay = () => {
    if (isPlaying) {
      if (isPaused) {
        toggle();
      } else {
        stop();
      }
    } else {
      const textContent = getTextContent(text);
      speak(textContent);
    }
  };

  // Function to restart speech with new settings (for real-time changes)
  const restartWithNewSettings = () => {
    if (isPlaying) {
      const textContent = getTextContent(text);
      speak(textContent);
    }
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10', 
    lg: 'h-12 w-12'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        <button
          onClick={handlePlay}
          className={cn(
            'flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors hover:bg-blue-200 hover:text-blue-800 shadow-sm',
            sizeClasses[size],
            className
          )}
          title={isPlaying && !isPaused ? 'Stop reading' : 'Read aloud'}
        >
          {isPlaying && !isPaused ? (
            <VolumeX className={iconSizes[size]} />
          ) : (
            <Volume2 className={iconSizes[size]} />
          )}
        </button>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className={cn(
            'flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800 shadow-sm',
            sizeClasses[size]
          )}
          title="Speech settings"
        >
          <Settings className={iconSizes[size]} />
        </button>
      </div>

      {showSettings && (
        <div className="absolute right-0 top-full z-10 mt-1 w-64 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Speed: {rate}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => {
                  setRate(parseFloat(e.target.value));
                  restartWithNewSettings();
                }}
                className="w-full"
              />
            </div>

            {voices.length > 0 && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Voice
                </label>
                <select
                  value={selectedVoice?.name || ''}
                  onChange={(e) => {
                    const voice = voices.find(v => v.name === e.target.value);
                    setSelectedVoice(voice || null);
                    restartWithNewSettings();
                  }}
                  className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                >
                  <option value="">Default</option>
                  {voices
                    .filter(voice => 
                      voice.lang.startsWith('en') && 
                      voice.name.toLowerCase().includes('natural')
                    )
                    .sort((a, b) => {
                      // Prefer local voices first
                      if (a.localService && !b.localService) return -1;
                      if (!a.localService && b.localService) return 1;
                      return a.name.localeCompare(b.name);
                    })
                    .map((voice) => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name} {voice.localService ? '⭐' : ''} ({voice.lang})
                      </option>
                    ))}
                </select>
              </div>
            )}

            <button
              onClick={() => setShowSettings(false)}
              className="w-full rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}