// MusicPlayer — HTML5 audio: play/pause, prev/next rotate through MP3s in /public/audio/
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";
import { useTheme } from "../context/ThemeContext";

/** Add or replace files in public/audio/ (served as /audio/… on the site). */
const TRACKS = [
  { title: " ", src: "/audio/track-1.mp3" },
  { title: " ", src: "/audio/track-2.mp3" },
] as const;

const MusicPlayer = () => {
  const { dark } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const skipInitialSourceSync = useRef(true);

  useEffect(() => {
    const a = new Audio();
    a.preload = "metadata";
    a.src = TRACKS[0].src;
    audioRef.current = a;

    const onTime = () => setCurrentTime(a.currentTime);
    const onMeta = () => {
      if (Number.isFinite(a.duration) && a.duration > 0) {
        setDuration(a.duration);
      }
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const onErr = () => {
      setLoadError("Could not load audio file.");
      setIsPlaying(false);
    };

    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("durationchange", onMeta);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);
    a.addEventListener("error", onErr);
    a.load();

    return () => {
      a.pause();
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("durationchange", onMeta);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
      a.removeEventListener("error", onErr);
      a.src = "";
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    if (skipInitialSourceSync.current) {
      skipInitialSourceSync.current = false;
      if (trackIndex === 0) {
        return;
      }
    }

    setLoadError(null);
    const wasPlaying = !a.paused;
    a.pause();
    a.src = TRACKS[trackIndex].src;
    a.load();
    setCurrentTime(0);

    if (wasPlaying) {
      a.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
          setLoadError("Could not play this track.");
        });
    }
  }, [trackIndex]);

  const togglePlay = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    setLoadError(null);
    if (a.paused) {
      a.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setLoadError("Could not start playback (check /public/audio/ files).");
        });
    } else {
      a.pause();
    }
  }, []);

  const nextSong = useCallback(() => {
    setTrackIndex((i) => (i + 1) % TRACKS.length);
  }, []);

  const backSong = useCallback(() => {
    setTrackIndex((i) => (i - 1 + TRACKS.length) % TRACKS.length);
  }, []);

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const panelClass = dark
    ? "border-brand-gold/20 bg-black/10 text-stone-50"
    : "border-brand-gold/25 bg-white/25 text-stone-950";
  const buttonClass =
    "grid h-7 w-7 place-items-center rounded-full text-brand-gold/80 transition-colors hover:bg-brand-gold/10 hover:text-brand-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold";
  const progressTrackClass = dark ? "bg-stone-700/45" : "bg-stone-300/60";

  return (
    <div className="w-44 sm:w-52">
      {loadError && (
        <p className={`mb-1 text-center text-[10px] ${dark ? "text-red-300" : "text-red-700"}`}>
          {loadError}
        </p>
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`rounded-full border px-2 py-1.5 text-center backdrop-blur-[2px] ${panelClass}`}
      >
        <div className="flex items-center justify-center gap-1.5">
          <SpeakerWaveIcon className="hidden h-4 w-4 shrink-0 text-brand-gold/75 sm:block" aria-hidden />
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={backSong}
            aria-label="Previous track"
            className={buttonClass}
          >
            <BackwardIcon className="h-3.5 w-3.5" aria-hidden />
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className={`${buttonClass} h-8 w-8 bg-brand-gold/90 text-stone-950 hover:bg-brand-gold-light hover:text-stone-950`}
          >
            {isPlaying ? (
              <PauseIcon className="h-4 w-4" aria-hidden />
            ) : (
              <PlayIcon className="h-4 w-4 translate-x-px" aria-hidden />
            )}
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={nextSong}
            aria-label="Next track"
            className={buttonClass}
          >
            <ForwardIcon className="h-3.5 w-3.5" aria-hidden />
          </motion.button>
          <p className="hidden shrink-0 text-[10px] tabular-nums text-stone-400 lg:block">
            {formatTime(currentTime)} / {formatTime(duration || 0)}
          </p>
        </div>

        <div className={`mt-1 h-0.5 overflow-hidden rounded-full ${progressTrackClass}`}>
          <div
            className="h-full rounded-full bg-brand-gold transition-[width] duration-100"
            style={{ width: `${Math.min(100, progressPct)}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
};

function formatTime(s: number) {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default MusicPlayer;
