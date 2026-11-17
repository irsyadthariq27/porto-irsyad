import { Backdrop } from "@/components/game/Backdrop";
import { BootScreen } from "@/components/game/BootScreen";
import { GameProvider } from "@/components/game/GameProvider";
import { Hotbar } from "@/components/game/Hotbar";
import { Hud } from "@/components/game/Hud";
import { SettingsDialog } from "@/components/game/SettingsDialog";
import { SkipLink } from "@/components/game/SkipLink";
import { Toasts } from "@/components/game/Toasts";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Page() {
  return (
    <GameProvider>
      <Backdrop />
      <BootScreen />
      <div id="app-root">
        <SkipLink />
        <Hud />
        <main id="main" tabIndex={-1}>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Contact />
        </main>
        <Footer />
        <Hotbar />
      </div>
      <Toasts />
      <SettingsDialog />
    </GameProvider>
  );
}
