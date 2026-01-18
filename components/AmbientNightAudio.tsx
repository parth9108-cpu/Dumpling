"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type AudioNodes = {
  ctx: AudioContext;
  master: GainNode;
  osc1: OscillatorNode;
  osc2: OscillatorNode;
  noise: AudioBufferSourceNode;
  noiseGain: GainNode;
};

function createNoiseBuffer(ctx: AudioContext) {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * 2;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.25;
  }
  return buffer;
}

export default function AmbientNightAudio() {
  const nodesRef = useRef<AudioNodes | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);

  const canRemember = useMemo(() => {
    try {
      return typeof window !== "undefined";
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    if (!canRemember) return;
    try {
      setEnabled(localStorage.getItem("night_audio") === "1");
    } catch {
      setEnabled(false);
    }
  }, [canRemember]);

  useEffect(() => {
    if (!canRemember) return;
    try {
      localStorage.setItem("night_audio", enabled ? "1" : "0");
    } catch {
    }
  }, [enabled, canRemember]);

  useEffect(() => {
    return () => {
      const n = nodesRef.current;
      if (!n) return;
      try {
        n.osc1.stop();
      } catch {
      }
      try {
        n.osc2.stop();
      } catch {
      }
      try {
        n.noise.stop();
      } catch {
      }
      try {
        n.ctx.close();
      } catch {
      }
      nodesRef.current = null;
    };
  }, []);

  const ensureAudioStarted = useCallback(async () => {
    if (nodesRef.current) {
      if (nodesRef.current.ctx.state === "suspended") {
        await nodesRef.current.ctx.resume();
      }
      return;
    }

    const ctx = new AudioContext();

    const master = ctx.createGain();
    master.gain.value = 0.0;
    master.connect(ctx.destination);

    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 110;

    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 220;

    const oscGain1 = ctx.createGain();
    oscGain1.gain.value = 0.08;

    const oscGain2 = ctx.createGain();
    oscGain2.gain.value = 0.05;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.035;

    const noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx);
    noise.loop = true;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 520;
    lowpass.Q.value = 0.7;

    osc1.connect(oscGain1);
    osc2.connect(oscGain2);
    noise.connect(noiseGain);

    oscGain1.connect(lowpass);
    oscGain2.connect(lowpass);
    noiseGain.connect(lowpass);
    lowpass.connect(master);

    osc1.start();
    osc2.start();
    noise.start();

    nodesRef.current = { ctx, master, osc1, osc2, noise, noiseGain };
    await ctx.resume();
  }, []);

  const applyGain = useCallback((value: number) => {
    const n = nodesRef.current;
    if (!n) return;
    n.master.gain.cancelScheduledValues(n.ctx.currentTime);
    n.master.gain.setTargetAtTime(value, n.ctx.currentTime, 0.18);
  }, []);

  const start = useCallback(async () => {
    await ensureAudioStarted();
    applyGain(0.12);
    setPlaying(true);
  }, [applyGain, ensureAudioStarted]);

  const stop = useCallback(() => {
    applyGain(0.0);
    setPlaying(false);
  }, [applyGain]);

  const toggle = useCallback(() => {
    void (async () => {
      if (playing) {
        stop();
        setEnabled(false);
        return;
      }

      setEnabled(true);
      await start();
    })();
  }, [playing, start, stop]);

  const label = playing ? "Music: On" : enabled ? "Music: Tap to start" : "Music: Off";

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-5 right-5 z-50 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-[var(--font-inter)] text-xs text-white/80 backdrop-blur hover:bg-white/10"
    >
      {label}
    </button>
  );
}
