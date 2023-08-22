"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type SettingsContextType = {
  pomodoroDuration: number;
  setPomodoroDuration: React.Dispatch<React.SetStateAction<number>>;
  shortBreakDuration: number;
  setShortBreakDuration: React.Dispatch<React.SetStateAction<number>>;
  longBreakDuration: number;
  setLongBreakDuration: React.Dispatch<React.SetStateAction<number>>;
};

const SettingsContext = createContext<SettingsContextType>({
  pomodoroDuration: 25,
  setPomodoroDuration: () => {},
  shortBreakDuration: 5,
  setShortBreakDuration: () => {},
  longBreakDuration: 30,
  setLongBreakDuration: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(30);

  useEffect(() => {
    const storedPomodoroDuration = Number(
      localStorage.getItem("pomodoroDuration")
    );
    const storedShortBreakDuration = Number(
      localStorage.getItem("shortBreakDuration")
    );
    const storedLongBreakDuration = Number(
      localStorage.getItem("longBreakDuration")
    );

    if (!isNaN(storedPomodoroDuration)) {
      storedPomodoroDuration && setPomodoroDuration(storedPomodoroDuration);
    }
    if (!isNaN(storedShortBreakDuration)) {
      storedShortBreakDuration &&
        setShortBreakDuration(storedShortBreakDuration);
    }
    if (!isNaN(storedLongBreakDuration)) {
      storedLongBreakDuration && setLongBreakDuration(storedLongBreakDuration);
    }
  }, []);

  const contextValue = {
    pomodoroDuration,
    setPomodoroDuration,
    shortBreakDuration,
    setShortBreakDuration,
    longBreakDuration,
    setLongBreakDuration,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
