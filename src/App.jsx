import { useState } from "react";
import Landing from "./components/Landing/Landing";
import Celebrate from "./components/Celebrate/Celebrate";
import Timeline from "./components/Timeline/Timeline";
import Stats from "./components/Stats/Stats";
import BirthdaySurprise from "./components/BirthdaySurprise/BirthdaySurprise";

function App() {
  const [stage, setStage] = useState("landing");

  return (
    <div className="w-screen h-screen overflow-hidden">
      {stage === "landing" && <Landing onYes={() => setStage("celebrate")} />}
      {stage === "celebrate" && (
        <Celebrate
          onTimeline={() => setStage("timeline")}
          onBirthday={() => setStage("birthday")}
          onStats={() => setStage("stats")}
        />
      )}
      {stage === "timeline" && <Timeline onBack={() => setStage("celebrate")} />}
      {stage === "stats" && <Stats onBack={() => setStage("celebrate")} />}
      {stage === "birthday" && <BirthdaySurprise onBack={() => setStage("celebrate")} />}
    </div>
  );
}

export default App;