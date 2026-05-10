import { developers } from "../data";
import ProfileCard from "./profile_card";

export default function DevelopersSection() {
  return (
    <div className="py-10 grid grid-cols-[repeat(auto-fill,320px)] gap-6 max-sm:justify-center">
      {developers.map((d) => (
        <ProfileCard key={d.name} c={d} />
      ))}
    </div>
  );
}
