import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import type { Contributor } from "../data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProfileCardProps {
  c: Contributor;
}

export default function ProfileCard({ c }: ProfileCardProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language as "pt" | "en";
  const bio = c.bio[language] || c.bio.en;
  const imageFitClass = c.imageFit === "contain" ? "object-contain" : "object-cover";
  const avatarRadiusClass = c.radius === false ? "rounded-none" : "rounded-full";

  return (
    <Card key={c.name} className="max-w-[320px]">
      <CardContent>
        <div className="flex items-center flex-col justify-between gap-6">
          <Avatar
            className={cn("w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]", avatarRadiusClass)}
          >
            <AvatarImage src={c.avatar} className={imageFitClass} />
            <AvatarFallback className={cn("font-bold", avatarRadiusClass)}>
              {c.name.split(" ").at(0)?.charAt(0).toUpperCase()}
              {c.name.split(" ").at(-1)?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="mt-2 w-full space-y-2">
            <p className="font-bold">{c.name}</p>

            {bio && (
              <span>
                <p className="line-clamp-3 text-sm">{bio}</p>

                {bio.length > 90 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-primary text-sm underline">
                        {t("common.view_more")}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[400px] max-h-[90svh]">
                      <DialogHeader className="justify-start">
                        <Avatar
                          className={cn(
                            "w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] mx-auto",
                            avatarRadiusClass
                          )}
                        >
                          <AvatarImage src={c.avatar} className={imageFitClass} />
                          <AvatarFallback className={cn("font-bold", avatarRadiusClass)}>
                            {c.name.split(" ").at(0)?.charAt(0).toUpperCase()}
                            {c.name.split(" ").at(-1)?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <DialogTitle className="mt-6 text-left">{c.name}</DialogTitle>
                      </DialogHeader>
                      {bio}
                    </DialogContent>
                  </Dialog>
                )}
              </span>
            )}

            {c.links.length > 0 && (
              <div className="flex items-center gap-3 mt-6">
                {c.links.map((l, index) => (
                  <a
                    key={index}
                    title={l.title}
                    aria-label={l.title}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
