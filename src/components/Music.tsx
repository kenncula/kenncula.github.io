// MusicPlayer — HTML5 audio: play/pause, prev/next rotate through MP3s in /public/audio/
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

/** Add or replace files in public/audio/ (served as /audio/… on the site). */
const TRACKS = [
  { title: "Track 1", src: "/audio/track-1.mp3" },
  { title: "Track 2", src: "/audio/track-2.mp3" },
  { title: "Track 3", src: "/audio/track-3.mp3" },
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

  const current = TRACKS[trackIndex];

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

  const panel = dark
    ? { backgroundColor: "#292524", color: "#fafaf9" }
    : { backgroundColor: "#d6d3d1", color: "#0c0a09" };

  return (
    <div style={{ width: "200px", margin: "0 auto", textAlign: "center" }}>
      <p
        className="truncate text-xs mb-1 px-1"
        style={{ color: panel.color, opacity: 0.9 }}
        title={current.title}
      >
        {current.title}
      </p>
      {loadError && (
        <p
          className="text-xs mb-1"
          style={{ color: dark ? "#fca5a5" : "#b91c1c" }}
        >
          {loadError}
        </p>
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          ...panel,
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={backSong}
          whileHover={{ color: "black", backgroundColor: "#e8dfa5" }}
          aria-label="Previous track"
          style={{
            backgroundColor: "transparent",
            border: "none",
            borderRadius: "100%",
            color: panel.color,
            width: "30px",
            height: "30px",
            fontSize: "16px",
            cursor: "pointer",
            marginRight: "20px",
          }}
        >
          {"\u23EE"}
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          whileHover={{ color: "black", backgroundColor: "#e8dfa5" }}
          aria-label={isPlaying ? "Pause" : "Play"}
          style={{
            backgroundColor: "transparent",
            border: "none",
            borderRadius: "50%",
            color: panel.color,
            width: "30px",
            height: "30px",
            fontSize: "16px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          {isPlaying ? "\u23F8" : "\u25B6"}
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={nextSong}
          whileHover={{ color: "black", backgroundColor: "#e8dfa5" }}
          aria-label="Next track"
          style={{
            backgroundColor: "transparent",
            border: "none",
            borderRadius: "50%",
            color: panel.color,
            width: "30px",
            height: "30px",
            fontSize: "16px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          {"\u23ED"}
        </motion.button>

        <div
          className="progress-bar"
          style={{
            marginTop: "12px",
            marginRight: "4px",
            marginLeft: "4px",
            height: "8px",
            backgroundColor: dark ? "#57534e" : "#a8a29e",
            borderRadius: "3px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.min(100, progressPct)}%`,
              height: "8px",
              backgroundColor: dark ? "#fafaf9" : "#0c0a09",
              transition: "width 0.1s linear",
            }}
          />
        </div>
        <p className="text-[10px] mt-1 opacity-80" style={{ color: panel.color }}>
          {formatTime(currentTime)} / {formatTime(duration || 0)}
        </p>
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
