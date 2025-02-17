import gsap from "gsap";
import { Horse } from "@/utils/types";
import { HORSE_SPEED_FACTOR } from "@/constants";

export const moveHorse = (horse: Horse, distance: number) => {
    if (horse.position >= distance) return;

    const speedFactor = Math.random() * 0.4 + 0.8;
    const moveDistance = (horse.condition / HORSE_SPEED_FACTOR) * speedFactor;
    horse.position = Math.min(horse.position + moveDistance, distance);

    const trackWidth = 900;
    const newPosition = (horse.position / distance) * trackWidth;

    gsap.to(`#horse-${horse.id}`, {
        x: newPosition,
        duration: 0.5,
        ease: "power1.out"
    });
};