import { useState, useRef, useEffect } from 'react';
import { Box, Button, HStack, Image, Text, VStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';

// Hook para gravação de áudio
export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Timer para contar o tempo de gravação
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Erro ao acessar microfone:', error);
      alert('Não foi possível acessar o microfone. Verifique as permissões.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAudioBlob(null);
      setRecordingTime(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
  };

  return {
    isRecording,
    audioBlob,
    recordingTime,
    startRecording,
    stopRecording,
    cancelRecording,
    resetRecording
  };
};

// Componente de visualização durante gravação
export const AudioRecordingBar = ({
  recordingTime,
  onCancel,
  onStop
}: {
  recordingTime: number;
  onCancel: () => void;
  onStop: () => void;
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <HStack
      position="absolute"
      bottom="12px"
      right="0"
      w="full"
      maxW="866.3px"
      mx="12px"
      h="52px"
      bg="white"
      boxShadow="0 1px 6px #0000001f"
      borderRadius="full"
      justify={"flex-end"}
      spacing="12px"
      p="5px"
    >
      <HStack maxW="417px" w="full">
        <Button
          bg="transparent"
          _hover={{ bg: "#F6F5F4" }}
          borderRadius="full"
          boxSize="40px"
          onClick={onCancel}
        >
          <Text
            as="span"
            className="material-symbols-outlined"
            fontSize="24px"
            color="black"
          >
            delete
          </Text>
        </Button>

        <HStack flex="1" spacing="12px">
          <Box
            boxSize="10px"
            borderRadius="full"
            bg="#B80531"

          />
          <Text fontSize="20px" color="#0A0A0A" fontWeight={400}>
            {formatTime(recordingTime)}
          </Text>
        </HStack>

        <Button
          bg="#1DAA61"
          _hover={{ bg: "#1DAA61" }}
          borderRadius="full"
          boxSize="40px"
          onClick={onStop}
        >
          <Text
            as="span"
            className="material-symbols-rounded"
            fontSize="24px"
            color="white"
            sx={{
              '&': {
                fontVariationSettings: `'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24`
              }
            }}
          >
            send
          </Text>
        </Button>
      </HStack>
    </HStack>
  );
};

// Componente de player de áudio nas mensagens
export const AudioMessage = ({
  audioUrl,
  duration
}: {
  audioUrl: string;
  duration?: number;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(duration || 0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <HStack spacing="8px" h="62px" w="full" maxW="336px" px="6px">
      <audio ref={audioRef} src={audioUrl} />
      <Box position="relative" boxSize="55px">
        <Image
          borderRadius="full"
          src="/img/profile-pic.png"
          alt="profile-picture"
          boxSize="55px"
          objectFit="cover"
        />
        <Box
          position="absolute"
          bottom="-1"
          right="0"
          bg="transparent"
          boxSize="27px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p="0"
        >
          <Text
            as="span"
            className="material-symbols-rounded"
            fontSize="25px"
            color="#6F8171"
            sx={{
              '&': {
                fontVariationSettings: `'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
                textShadow: `1.7px 0 #D9FDD3, -1.7px 0 #D9FDD3, 0 1.7px #D9FDD3, 0 -1.7px #D9FDD3`
              }
            }}
          >
            mic
          </Text>
        </Box>
      </Box>
      <Button
        bg="transparent"
        _hover={{ bg: "transparent" }}
        borderRadius="full"
        minH="40px"
        minW="40px"
        onClick={togglePlayPause}
        p={0}
      >
        <Text
          as="span"
          className="material-symbols-rounded"
          fontSize="40px"
          color="#6F8171"
          sx={{
            '&': {
              fontVariationSettings: `'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24`
            }
          }}
        >
          {isPlaying ? 'pause' : 'play_arrow'}
        </Text>
      </Button>

      <VStack flex="1" spacing="8px" align="stretch" w="200px" h="full" justify="flex-end">
        <Slider
          value={currentTime}
          min={0}
          max={audioDuration || 100}
          onChange={handleSliderChange}
          focusThumbOnChange={false}
        >
          <SliderTrack bg="#D9D9D9" h="4px" borderRadius="full">
            <SliderFilledTrack bg="#6F8171" />
          </SliderTrack>
          <SliderThumb boxSize="12px" bg="#4FC3F7" />
        </Slider>
        <HStack w="full">
          <Text fontSize="11px" color="#8696a0" alignSelf="flex-start">
            {formatTime(audioDuration - currentTime)}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};
