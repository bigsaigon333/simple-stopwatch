import { AudioHTMLAttributes, HTMLAttributes, useEffect, useRef } from "react";
import { AUDIO_MP3, AUDIO_OGG } from "../assets/beep";

export default function Audio({
  play = false,
  ...rest
}: {
  play?: boolean;
} & AudioHTMLAttributes<HTMLAudioElement>): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current == null) {
      return;
    }

    if (play) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [play]);

  return (
    <audio ref={audioRef} loop={true} {...rest}>
      <source type="audio/ogg" src={AUDIO_OGG} />
      <source type="audio/mp3" src={AUDIO_MP3} />
    </audio>
  );
}
