import { AudioHTMLAttributes, useEffect, useRef } from "react";
import { AUDIO_MP3, AUDIO_OGG } from "../assets/beep";

interface AudioProperties extends AudioHTMLAttributes<HTMLAudioElement> {
  play?: boolean;
}

export default function Audio({
  play = false,
  ...rest
}: AudioProperties): JSX.Element {
  const audioReference = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioReference.current == undefined) {
      return;
    }

    if (play) {
      audioReference.current.play();
    } else {
      audioReference.current.pause();
    }
  }, [play]);

  return (
    <audio ref={audioReference} loop={true} {...rest}>
      <source type="audio/ogg" src={AUDIO_OGG} />
      <source type="audio/mp3" src={AUDIO_MP3} />
    </audio>
  );
}
